/***********************************
 * CONSTANTS
 * *********************************/

const FMT_JSON = "%Y-%m-%dT%H:%M:%S.%NZ";
const FMT_MONTH = [
"Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
 
const FMT_DAY = [
"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];
 
const FMT_STRING = {
"%": "%",
F: "%Y-%m-%d",
n: "\n",
R: "%H:%M",
T: "%H:%M:%S",
t: "\t",
X: "%T",
Z: "GMT",
z: "+0000"
 };

const SEC_DAY = 24 * 3600; // seconds per day
const YEAR_SLOT = 3200; // years per slot
const DAY_SLOT = (365 * 400 + 97) * YEAR_SLOT / 400; // days per slot
const SEC_SLOT = SEC_DAY * DAY_SLOT; // seconds per slot
const MSEC_SLOT = SEC_SLOT * 1000; // mseconds per slot

 // 15.9.1.1 Time Values and Time Range
 // The actual range of times supported by ECMAScript Date objects is
 // exactly –100,000,000 days to 100,000,000 days measured relative to
 // midnight at the beginning of 01 January, 1970 UTC.
const MAX_MSEC = 1000 * 10000 * 10000 * SEC_DAY;
const BIT24 = 0x1000000;
const BIT32 = 0x10000 * 0x10000;
const DEC6 = 1000 * 1000;
const DEC9 = 1000 * 1000 * 1000;
const ZERO9 = "000000000";

/*______________________________________
            UTILITY FUNCTIONS
 ______________________________________*/

function checkRange(buffer:any, offset:number) {
    let last = buffer && buffer.length;
    if (last == null) throw new TypeError("Invalid Buffer");
    if (last < offset + 8) throw new RangeError("Out of range");
  }

 function buildFromInt64(pos0:number, pos1:number, pos2:number, pos3:number, posH:number, posL:number) {
    const fromInt64 = (buffer?:any, offset = 0)=> {
        checkRange(buffer, offset |= 0);
        let high = readUint32(buffer, offset + posH);
        let low = readUint32(buffer, offset + posL);
        return PrecisionTime.fromTime(low, high);
    }
    
    const readUint32 = (buffer:Buffer, offset:number)=> {
        return (buffer[offset + pos0] * BIT24) +
        ((buffer[offset + pos1] << 16) |
        (buffer[offset + pos2] << 8) |
        buffer[offset + pos3]);
    }
    return fromInt64;
}

/**
 * Removes leading 0 from numbers if less than 10.
 * @param v number
 */
function padS(v:number) {
    return (v > 9 ? "" : " ") + (v | 0);
  }
/**
 * Returns the number with a leading 0 if less than 10.
 * @param v number
 */
function  pad2(v:number) {
    return (v > 9 ? "" : "0") + (v | 0);
  }

/**
 * Returns the number with as much leading zeros as specified by the len param.
 * @param v number
 * @param len number
 */
function  pad(v:number, len:number) {
    return (ZERO9 + (v | 0)).substr(-len);
  }

function newDate(time:number) {
    const dt = new Date(0);
    dt.setTime(time);
    return dt;
  }

function Math_trunc(x:number) {
    let n = x - x % 1;
    return n === 0 && (x < 0 || (x === 0 && (1 / x !== 1 / 0))) ? -0 : n;
  }

/**
 * PrecisionTime is a timestamp with nanosecond precision and custom toString method that accepts formatting.
 */
export class PrecisionTime {
    static trunc = Math.trunc || Math_trunc;
  

    // private properties and methods
    #year = 0; // Offset number for year precision
    #time = 0; // Milliseconds from epoch
    #nano = 0; // Offset number for nanosecond precision
    #normalize = (ts:PrecisionTime) => {
      let year = ts.#year;
      let time = ts.#time;
      let nano = ts.#nano;
      let changed;
      let slot;
      // normalize nano
      if (nano < 0 || DEC6 <= nano) {
        let n = Math.floor(nano / DEC6);
        nano -= n * DEC6;
        time += n;
        changed = 1;
      }
  
      let y = year % YEAR_SLOT;
      if (time < -MAX_MSEC || MAX_MSEC < time || y) {
        // shrink time into the minimal slot
        slot = PrecisionTime.trunc(time / MSEC_SLOT);
        if (slot) {
          year += slot * YEAR_SLOT;
          time -= slot * MSEC_SLOT;
        }
  
        // add year offset smaller than a slot
        let dt = newDate(time);
        dt.setUTCFullYear(y + dt.getUTCFullYear());
        year -= y;
        time = +dt;
  
        // use full range of 100 million days.
        slot = PrecisionTime.trunc(year / YEAR_SLOT);
        let total = time + slot * MSEC_SLOT;
        if (slot && - MAX_MSEC <= total && total <=  MAX_MSEC) {
          year -= slot *  YEAR_SLOT;
          time = total;
        }
  
        changed = 1;
      }
  
      if (changed) {
        ts.#year = year;
        ts.#time = time;
        ts.#nano = nano;
      }
  
      return ts;
    }

    #buildWriteInt64 = (pos0:number, pos1:number, pos2:number, pos3:number, posH:number, posL:number) => {  
      const writeInt64 = (buffer?:Array<number>, offset = 0)=> {
        let ts = new PrecisionTime().#normalize(this);
        if (!buffer || typeof buffer === 'undefined') buffer = new Array(8);
        checkRange(buffer, offset |= 0);
  
        let second = Math.floor(ts.#time / 1000);
        let day = ts.#year * (DAY_SLOT * SEC_DAY / YEAR_SLOT);
        let high = PrecisionTime.trunc(day / BIT32) + PrecisionTime.trunc(second / BIT32);
        let low = (day % BIT32) + (second % BIT32);
  
        // slot offset
        let slot = Math.floor(low / BIT32);
        if (slot) {
          high += slot;
          low -= slot * BIT32;
        }
  
        writeUint32(buffer, offset + posH, high);
        writeUint32(buffer, offset + posL, low);
        return buffer;
      }
  
      function writeUint32(buffer:any, offset:any, value:any) {
        buffer[offset + pos0] = (value >> 24) & 255;
        buffer[offset + pos1] = (value >> 16) & 255;
        buffer[offset + pos2] = (value >> 8) & 255;
        buffer[offset + pos3] = value & 255;
      }
      return writeInt64;
    }
    
    private Y(){
      const year = this.getYear();
        if (year > 999999) {
          return "+" + year;
        } else if (year > 9999) {
          return "+" + pad(year, 6);
        } else if (year >= 0) {
          return pad(year, 4);
        } else if (year >= -999999) {
          return "-" + pad(-year, 6);
        } else {
          return year;
        }
    }
    /**
    * Gets month with 2 digits. ex. for month 8 return 08
    */
    private m() {      
      return pad2(this.toDate().getUTCMonth() + 1);
    }

    /**
    * Returns day of the month with 2 digits. ex. 08
    */
    private d(){
      return pad2(this.toDate().getUTCDate());
    }
    /**
    * Returns day of the month with only 1 digit (for 08 returns 8. for 10 return 10)
    */
    private e() {
      return padS(this.toDate().getUTCDate());
    }

    private H() {
      return pad2(this.toDate().getUTCHours());
    }
    private M() {
      return pad2(this.toDate().getUTCMinutes());
    }
    private S() {
    return pad2(this.toDate().getUTCSeconds());
    }


    private L() {
      return pad(this.toDate().getUTCMilliseconds(), 3);
    }


    private N() {
      return pad(this.getNano(), 9);
    }
    private a() {
      return FMT_DAY[this.toDate().getUTCDay()];
    }

    private b() {
      return FMT_MONTH[this.toDate().getUTCMonth()];
    }   

    constructor(time:Date | string|number = Date.now(), nano :string|number = 0, year:string|number  = 0) {
      this.#time = +time || 0;
      this.#nano = +nano || 0;
      this.#year = +year || 0;
      this.#normalize(this);
    }

    // static methods
    static fromInt64BE = buildFromInt64(0, 1, 2, 3, 0, 4);
    static fromInt64LE = buildFromInt64(3, 2, 1, 0, 4, 0);
    static fromString(string:string) {
      let time;
      let ts = new PrecisionTime();
      string += "";
  
      let array:any[] = string.replace(/^\s*[+\-]?\d+/, (match: string, ...args: any[]) => {
        let year = +match;
        // Use only years around 1970 to avoid Date's terrible behavior:
        // 15.9.4.3 Date.UTC
        // If y is not NaN and 0 <= y <= 99, then let yr be 1900+y
        let y = 1970 + ((year - 1970) % 400);
        ts.#year = year - y;
        return y as any
      }).replace(/(?:Z|([+\-]\d{2}):?(\d{2}))$/, function(match, hour, min) {
        // time zone
        if (hour < 0) min *= -1;
        time = ((+hour) * 60 + (+min)) * 60000;
        return "";
      }).replace(/\.\d+$/, function(match) {
        // nanoseconds
        ts.#nano = +((match + ZERO9).substr(1, 9));
        return "";
      }).split(/\D+/);
  
      if (array.length > 1) {
        array[1]--; // month starts from 0
      } else {
        array[1] = 0;
      }
  
      ts.#time = time = Date.UTC.apply(Date, array as any) - (time || 0);
  
      if (isNaN(time)) {
        throw new TypeError("Invalid Date");
      }
  
      return ts.#normalize(ts);
    }
  
    static fromDate(date:Date) {
      return new PrecisionTime(+date);
    }
  
    static fromTimeT(time:number) {
      return PrecisionTime.fromTime(time, 0);
    }
  
    static fromTime(low:number, high:number) {
      high |= 0;
      high *= BIT32;
      low = +low || 0;
  
      // slot count
      let slot = this.trunc(high / SEC_SLOT) + this.trunc(low / SEC_SLOT);
  
      // seconds within slot
      let second = (high % SEC_SLOT) + (low % SEC_SLOT);
  
      // slot offset
      let offset = this.trunc(second / SEC_SLOT);
      if (offset) {
        slot += offset;
        second -= offset * SEC_SLOT;
      }
  
      return new PrecisionTime(second * 1000, 0, slot * YEAR_SLOT);
    }
    //Public properties and methods
    writeInt64BE = this.#buildWriteInt64(0, 1, 2, 3, 0, 4);
    
    public get year (){
      return this.getYear()
    }
    get miliseconds(){
      return parseInt(this.L())
    }
    get nanoseconds(){
      return this.getNano()
    }
    public getYear() {
      const year = this.toDate().getUTCFullYear();
      return year + this.#year;
    }
  

    public toDate() {
      let ts = this.#normalize(this);
      return newDate(ts.#time);
    }

  
    // public addNano(nano:number) {
    //   this.#nano += +nano || 0;
    //   return this;
    // }
  
    public getNano() {
      let ts = this.#normalize(this);
      return ((ts.#time % 1000) * DEC6 + (+ts.#nano) + DEC9) % DEC9;
    }
  

  
    public getTimeT() {
      let ts = this.#normalize(this);
      let time = Math.floor(ts.#time / 1000);
  
      let year = ts.#year;
      if (year) time += year * DAY_SLOT * SEC_DAY / YEAR_SLOT;
  
      // this may loose some bits over than 53 bit precision
      return time;
    }
  
    public toJSON() {
      return this.toString().replace(/0{1,6}Z$/, "Z");
    }


    /**
     * Gets difference between 2 times. only goes till days of difference. Does not account for years.
     * @param end PrecisionTime object
     */
    timeDifference(end: PrecisionTime){
      const day = end.daySingle - this.daySingle
      const hour = end.hours - this.hours
      const min = end.minuteSingle - this.minuteSingle
      const sec = end.secondsSingle - this.secondsSingle
      const mili = end.miliseconds - this.miliseconds
      const str = `${day} days, ${pad2(hour)} hours, ${pad2(min)} min, ${pad2(sec)} sec, ${pad2(mili)} ms.`
      return str
    }

    get hours(){
      return this.toDate().getUTCHours()
    }

  /**
   * Gets month with 2 digits. ex. for month 8 return 08
   */
  get month(){
      return this.m()
  }

get monthSingle(){
  return parseInt(padS(this.toDate().getUTCMonth()))
}

  /**
   * Returns day of the month with 2 digits. ex. 08
   */
  get day(){
      return this.d()
  }

  /**
   * Returns day of the month with only 1 digit (for 08 returns 8. for 10 return 10)
   */
  get daySingle(){
        return parseInt(this.e())
    }


       /**
    * Gets the minute with 2 digits. ex. 01
    */
  get minute(){
        return this.M()
    }

    get minuteSingle(){
      return parseInt(padS(this.toDate().getUTCMinutes()));
  }

  /**
    * Gets seconds with 2 digits. ex. for month 8 return 08
    */
  get seconds(){
        return this.S()
    }

    get secondsSingle(){
      return parseInt(padS(this.toDate().getUTCSeconds()))
  }


  public get dayStr(){
        return this.a()
    }


  public get monthStr(){
        return this.b()
    }

  /**
   * 
   * @param format specifier characters as below or undefined.
  - `%%` - Literal `%` character.
  - `%a` - Abbreviated weekday name: `Sun` to `Sat`
  - `%b` - Abbreviated month name: `Jan` to `Dec`
  - `%d` - Day: `01` to `31` (padded with zero)
  - `%e` - Day: ` 1` to `31` (padded with space)
  - `%F` - Equivalent to `%Y-%m-%d`
  - `%H` - Hour: `00` to `23`
  - `%L` - Milliseconds: `000` to `999`
  - `%M` - Minute: `00` to `59`
  - `%m` - Month: `01` to `12`
  - `%N` - Nanoseconds: `000000000` to `999999999`
  - `%n` - Newline character
  - `%R` - Equivalent to `%H:%M`
  - `%S` - Second: `00` to `59`
  - `%T` - Equivalent to `%H:%M:%S`
  - `%t` - Tab character
  - `%X` - Equivalent to `%T`
  - `%Y` - Year: `0000` to `9999`, or `+275760`, `-271821`, etc.
  - `%Z` - Constant timezone name: `GMT`
  - `%z` - Constant timezone offset: `+0000`
    * @example
    PrecisionTime.fromDate(new Date('2020-08-26T13:36:10.213Z'))
    .toString('%F %T')) //returns 2020-08-26 13:36:10
    */
  public toString(format?:string) {
      //   let ts = this;
      //   let dt = ts.toDate();
        let map = {
          H: this.H.bind(this),
          L: this.L.bind(this),
          M: this.M.bind(this),
          N: this.N.bind(this),
          S: this.S.bind(this),
          Y: this.Y.bind(this),
          a: this.a.bind(this),
          b: this.b.bind(this),
          d: this.d.bind(this),
          e: this.e.bind(this),
          m: this.m.bind(this)
        };
      
        function strftime(format:string = '%'):string {
          return format.replace(/%./g, function(match) {
            let m = match[1] as 'H';
            let c = FMT_STRING[m as '%'];
            let f = map[m];
            return c ? strftime(c) : f ? f() : match;
          });
        }
    return strftime(format || FMT_JSON)
  }
}



// // const T = new PrecisionTime(Date.now())
// const T = new PrecisionTime(1596920759032)
// /***************
//  * PUBLIC PROPERTIES
//  * ************ */
// console.log(T.year)//2020
// console.log(T.minute)//05
// console.log(T.seconds)//59
// console.log(T.day)//08
// console.log(T.dayStr)//Sat
// console.log(T.month)//08
// console.log(T.monthStr)//Aug
// console.log(T.toDate()) //Sat Aug 08 2020 17:05:59 GMT-0400 (Eastern Daylight Time)
// console.log(T.getNano()) //32000000
// console.log(T.addNano(10).getNano()) //32000010
// console.log(T.getNano()) //32000010
// console.log(T.getTimeT()) //1596920759
// console.log(T.getYear()) //2020
// console.log(T.toJSON()) // 2020-08-08T21:05:59.03200001Z
// console.log(T.toString('%a, %F %T %Z')) // Sat, 2020-08-08 21:05:59 GMT

// // Static Methods
// console.log(PrecisionTime.fromTime(0,1).toDate())
// console.log(PrecisionTime
//     .fromDate(new Date('2020-08-26T13:36:10.213Z')).toString('%F %T')) //2020-08-26 13:36:10
// console.log(
//     PrecisionTime
//     .fromDate(new Date('2017-11-26T13:36:22.213Z'))
//     .toJSON()) // => "2017-11-26T13:36:22.213Z"

// // nanoseconds precision
// console.log(PrecisionTime
//     .fromInt64LE([86,195,26,90,0,0,0,0])
//     .addNano(123456789).toJSON()); // => "2017-11-26T13:36:22.123456789Z"

// console.log(PrecisionTime.fromString("2017-11-26T13:36:22.213Z").getTimeT());// => 1511703382

// // 64-bit time_t
// console.log(PrecisionTime.fromTimeT(1511703382).writeInt64BE()) // => [0,0,0,0,90,26,195,86]

// console.log(PrecisionTime.fromInt64BE([0,0,0,0,90,26,195,86]).toDate().getUTCHours()); // => 13
// console.log(PrecisionTime.fromString("2017-11-26T13:36:22.123456789Z").getNano()); // => 123456789

