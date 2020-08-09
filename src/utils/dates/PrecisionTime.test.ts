

import {PrecisionTime} from './PrecisionTime'
describe.skip('PrecisionTime', function() {

  describe("Auto TESTS", function() {
    // YYYY (eg 1997)
    runTest("1997", "1997-01-01T00:00:00.000Z");

    // YYYY-MM (eg 1997-07)
    runTest("1997-07", "1997-07-01T00:00:00.000Z");

    // YYYY-MM-DD (eg 1997-07-16)
    runTest("1997-07-16", "1997-07-16T00:00:00.000Z");

    // YYYY-MM-DDThh:mmTZD (eg 1997-07-16T19:20+01:00)
    runTest("1997-07-16T19:20+01:00", "1997-07-16T18:20:00.000Z");

    // YYYY-MM-DDThh:mm:ssTZD (eg 1997-07-16T19:20:30+01:00)
    runTest("1997-07-16T19:20:30+01:00", "1997-07-16T18:20:30.000Z");

    // YYYY-MM-DDThh:mm:ss.sTZD (eg 1997-07-16T19:20:30.45+01:00)
    runTest("1997-07-16T19:20:30.45+01:00", "1997-07-16T18:20:30.450Z");

    function runTest(src, exp) {
      it(src, function() {
        var ts = PrecisionTime.fromString(src);
        expect(ts.toJSON()).toStrictEqual(exp);
      });
    }
  });
  describe('PUBLIC PROPERTIES', () => {
    const T = new PrecisionTime(1596920759032)
    it('Returns the valid properties of the date', () => {
        expect(T.year).toBe(2020)
        expect(T.getYear()).toBe(2020)
        expect(T.minute).toBe('05')
        expect(T.seconds).toBe('59')
        expect(T.day).toBe('08')
        expect(T.dayStr).toBe('Sat')
        expect(T.month).toBe('08')
        expect(T.monthStr).toBe('Aug')
        expect(T.seconds).toBe('59')
        expect(T.seconds).toBe('59')
       
    })
    it('toDate returns a date object', () => {
            expect(T.toDate()).toEqual(new Date('2020-08-08T21:05:59.032Z'))
    })
    it("toJSON return string", () => {
         expect(T.toJSON()).toBe('2020-08-08T21:05:59.032Z')
    })
    it('toString convers to string and formats as requested', () => {
        expect(T.toString()).toBe('2020-08-08T21:05:59.032000000Z')
        expect(T.toString('%a, %F %T %Z')).toBe('Sat, 2020-08-08 21:05:59 GMT')
        expect(T.toString('%F')).toBe('2020-08-08')
    })
  })

  describe("STATIC METHODS", () => {
          // Static Methods
          expect(PrecisionTime
            .fromDate(new Date('2020-08-26T13:36:10.213Z')).toString('%F %T')).toBe('2020-08-26 13:36:10')
    expect(
        PrecisionTime
        .fromDate(new Date('2017-11-26T13:36:22.213Z'))
        .toJSON()).toBe("2017-11-26T13:36:22.213Z")
    
    // expect(PrecisionTime
    //     .fromInt64LE([86,195,26,90,0,0,0,0])
    //     .addNano(123456789).toJSON()).toBe("2017-11-26T13:36:22.123456789Z");
    
    expect(PrecisionTime.fromString("2017-11-26T13:36:22.213Z").getTimeT()).toBe(1511703382);
    
    //64-bit time_t
    expect(PrecisionTime.fromTimeT(1511703382).writeInt64BE()).toEqual([0,0,0,0,90,26,195,86]) 
    
    expect(PrecisionTime.fromInt64BE([0,0,0,0,90,26,195,86]).toDate().getUTCHours()).toBe(13);
    expect(PrecisionTime.fromString("2017-11-26T13:36:22.123456789Z").getNano()).toBe(123456789);
  })
});