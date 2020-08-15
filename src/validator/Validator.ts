import isUrl from "./isUrl";
import isIP from "./isIP";
import isPostalCode from "./isPostalCode";
import { ArrayHelper } from "../utils";
import { isSerializable } from "./isSerializable";

declare const $NestedValue: unique symbol;

export type IsFlatObject<T extends object> = Extract<
  Exclude<T[keyof T], NestedValue | Date | FileList>,
  any[] | object
> extends never ? true
  : false;
export type NestedValue<TValue extends any[] | object = any[] | object> = {
  [$NestedValue]: never;
} & TValue;

export type EmptyObject = { [K in string | number]: never };
export type Primitive = string | boolean | number | symbol | null | undefined;
export type FieldElement<TFieldValues extends FieldValues = FieldValues> =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | CustomElement<TFieldValues>;
export type FieldValues = Record<string, any>;
export type FieldName<TFieldValues extends FieldValues> = IsFlatObject<
  TFieldValues
> extends true ? Extract<keyof TFieldValues, string>
  : string;

export type CustomElement<TFieldValues extends FieldValues> = {
  name: FieldName<TFieldValues>;
  type?: string;
  value?: any;
  checked?: boolean;
  options?: HTMLOptionsCollection;
  files?: FileList | null;
  focus?: VoidFunction;
};

export function merge<T extends {}>(obj: Partial<T> = {}, defaults: T): T {
  for (const key in defaults)
  {
    if (typeof obj[key] === "undefined")
    {
      obj[key] = defaults[key];
    }
  }
  return obj as T;
}

export const alpha = {
  "en-US": /^[A-Z]+$/i,
  "bg-BG": /^[А-Я]+$/i,
  "cs-CZ": /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
  "da-DK": /^[A-ZÆØÅ]+$/i,
  "de-DE": /^[A-ZÄÖÜß]+$/i,
  "el-GR": /^[Α-ώ]+$/i,
  "es-ES": /^[A-ZÁÉÍÑÓÚÜ]+$/i,
  "fr-FR": /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
  "it-IT": /^[A-ZÀÉÈÌÎÓÒÙ]+$/i,
  "nb-NO": /^[A-ZÆØÅ]+$/i,
  "nl-NL": /^[A-ZÁÉËÏÓÖÜÚ]+$/i,
  "nn-NO": /^[A-ZÆØÅ]+$/i,
  "hu-HU": /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
  "pl-PL": /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
  "pt-PT": /^[A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
  "ru-RU": /^[А-ЯЁ]+$/i,
  "sl-SI": /^[A-ZČĆĐŠŽ]+$/i,
  "sk-SK": /^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
  "sr-RS@latin": /^[A-ZČĆŽŠĐ]+$/i,
  "sr-RS": /^[А-ЯЂЈЉЊЋЏ]+$/i,
  "sv-SE": /^[A-ZÅÄÖ]+$/i,
  "tr-TR": /^[A-ZÇĞİıÖŞÜ]+$/i,
  "uk-UA": /^[А-ЩЬЮЯЄIЇҐі]+$/i,
  "vi-VN":
    /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
  "ku-IQ": /^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
  ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
  he: /^[א-ת]+$/,
  "fa-IR": /^['آابپتثجچهخدذرزژسشصضطظعغفقکگلمنوهی']+$/i,
};

export const alphanumeric = {
  "en-US": /^[0-9A-Z]+$/i,
  "bg-BG": /^[0-9А-Я]+$/i,
  "cs-CZ": /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
  "da-DK": /^[0-9A-ZÆØÅ]+$/i,
  "de-DE": /^[0-9A-ZÄÖÜß]+$/i,
  "el-GR": /^[0-9Α-ω]+$/i,
  "es-ES": /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
  "fr-FR": /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
  "it-IT": /^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,
  "hu-HU": /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
  "nb-NO": /^[0-9A-ZÆØÅ]+$/i,
  "nl-NL": /^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,
  "nn-NO": /^[0-9A-ZÆØÅ]+$/i,
  "pl-PL": /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
  "pt-PT": /^[0-9A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
  "ru-RU": /^[0-9А-ЯЁ]+$/i,
  "sl-SI": /^[0-9A-ZČĆĐŠŽ]+$/i,
  "sk-SK": /^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
  "sr-RS@latin": /^[0-9A-ZČĆŽŠĐ]+$/i,
  "sr-RS": /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
  "sv-SE": /^[0-9A-ZÅÄÖ]+$/i,
  "tr-TR": /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
  "uk-UA": /^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,
  "ku-IQ": /^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
  "vi-VN":
    /^[0-9A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
  ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
  he: /^[0-9א-ת]+$/,
  "fa-IR": /^['0-9آابپتثجچهخدذرزژسشصضطظعغفقکگلمنوهی۱۲۳۴۵۶۷۸۹۰']+$/i,
};

export const decimal = {
  "en-US": ".",
  ar: "٫",
};

// export const locales = Object.keys(alphanumeric);
function zip(date: string[], format: string[]) {
  const zippedArr = [],
    len = Math.min(date.length, format.length);

  for (let i = 0; i < len; i++)
  {
    zippedArr.push([date[i], format[i]]);
  }

  return zippedArr;
}

const includes = (arr: any[], val: any) => arr.some((arrVal) => val === arrVal);

/**
 * Validator
 */
export class Validator {
  /**
     *  Verify if its a valid email address. works with domain names up to 11 digits long. 
     * @note the largest domain name i could find was .accountants
     * @param email email to validate
     * @param domainLimit limit the domain to certain characters long. Defaults to 11. 
     * 
```const email = 'test@email.info'```
     * @example 
     *  Validator.isEmail('notAnEmail') //false;
     *  Validator.isEmail(email) //true;
     * 
     *  //using custom domainLimit
     *  Validator.isEmail(email,3) //false because domain limit is 3 and .info has 4 digits;
     * 
     * 
     */
  static isEmail(email: any, domainLimit = 11) {
    //Edge cases
    if (typeof email === "symbol") return false;
    if (String(email)[String(email).length - 1] === ".") return false;

    const regex = new RegExp(
      "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2," + domainLimit +
      "})+$",
    );
    // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(email)) {
    if (regex.test(email))
    {
      return true;
    }
    return false;
  }

  static isHTMLElement = (value: any): value is HTMLElement =>
    value instanceof HTMLElement;

  static isPostalCode = isPostalCode;

  static isPrimitive(value: unknown): value is Primitive {
    return Validator.isNullOrUndefined(value) || !(typeof value === "object");
  }
  static isString(val: any): val is string {
    return (typeof val === "string" || val instanceof String);
  }

  static isNotEmptyString(arg: any): arg is string {
    return typeof arg === "string" && arg.trim() !== "";
  }

  /**
   * Returns true if the length of the argument as string is greater than or equal to the min_lenght parameter.
   * @param arg string
   * @param min_length min lenght of the argument for it to be consirered valid.
   * @example
   * Validator.isLenghtGreaterThan("wilfred", 4) //return true
   * Validator.isLenghtGreaterThan("hi", 4) //return false
   * 
   */
  static minLength(arg: any, min_length: number) {
    return (typeof arg === "string" ||
      typeof arg === "number") && String(arg).length >= min_length;
  }
  /**
   * Returns true if the length of the argument as string is less than or equal to the max_lenght parameter.
   * @param arg string
   * @param max_length max lenght of the argument for it to be consirered valid.
   * @example
   * Validator.isLenghtLessThan("wilfred", 4) //return false
   * Validator.isLenghtLessThan("hi", 4) //return true
   * 
   */
  static maxLength(arg: any, max_length: number) {
    return (typeof arg === "string" ||
      typeof arg === "number") && String(arg).length <= max_length;
  }

  /**
   * check if the string's length falls in a range.
   * @param arg  string to verify
   * @param options  ({min:0, max: 100000})
   */
  static isLength(arg: any, options = { min: 0, max: 100000 }) {
    return (typeof arg === "string" ||
      typeof arg === "number") &&
      String(arg).length >= options.min && String(arg).length <= options.max;
  }

  static isRegex = (value: unknown): value is RegExp => value instanceof RegExp;

  static isSameRegex(reg1: RegExp, reg2: RegExp) {
    return reg1.source === reg2.source && reg1.flags === reg2.flags;
  }

  static isArray<T extends any>(arg: any): arg is Array<T> {
    return arg instanceof Array;
  }
  /**
   * check if the string has a length of zero.
   * @param str string
   * @param {{ignore_whitespace?:boolean }} options 
   */
  static isEmpty(str: any, options: { ignore_whitespace?: boolean } = {}) {
    if (!Validator.isString(str))
    {
      return false;
    }
    const default_is_empty_options = {
      ignore_whitespace: false,
    };
    options = merge(options, default_is_empty_options);

    return (options.ignore_whitespace ? str.trim().length : str.length) === 0;
  }

  /**
   * Check if the string is valid JSON (if it can be parsed to json)
   * @param str 
   * @param options 
   */
  static isJSON(str: string, options: { allow_primitives?: boolean } = {}) {
    if (!Validator.isString(str))
    {
      return false;
    }
    try
    {
      const default_json_options = {
        allow_primitives: false,
      };
      options = merge(options, default_json_options);
      let primitives: any[] = [];
      if (options.allow_primitives)
      {
        primitives = [null, false, true];
      }

      const obj = JSON.parse(str);
      return primitives.includes(obj) || (!!obj && typeof obj === "object");
    } catch (e) { /* ignore */ }
    return false;
  }
  /**
   *  Check if the string contains only letters (a-zA-Z).
   * @param str 
   * @param locale 
   */
  static isAlpha(str: string, locale: keyof typeof alpha = "en-US") {
    if (!Validator.isString(str))
    {
      return false;
    }

    if (locale in alpha)
    {
      return alpha[locale].test(str);
    }
    throw new Error(`Invalid locale '${locale}'`);
  }

  static toDate(date: string | number) {
    if (!Validator.isString(date)) return null;
    date = Date.parse(date);
    return !isNaN(date) ? new Date(date) : null;
  }
  /**
   * check if the string is a date that's after the specified date (defaults to now).
   * @param value value to evaluate
   * @param date  specified date (defaults to now).
   * @example
   * const before = "10/20/2020";
   * const after = "11/20/2020";
   * expect(Validator.isAfter(before, after)).toBe(false);
   * expect(Validator.isAfter(after, before)).toBe(true);
   * expect(Validator.isAfter("1/1/9000")).toBe(true);
   */
  static isAfter(value: string, date = String(new Date())) {
    if (!Validator.isString(value)) return false;
    const comparison = Validator.toDate(date);
    const original = Validator.toDate(value);
    return !!(original && comparison && original > comparison);
  }
  /**
   * check if the string is a date that's before the specified date.
   * @param value value to evaluate
   * @param date specified date (defaults to now).
   */
  static isBefore(value: string, date = String(new Date())) {
    if (!Validator.isString(value)) return false;
    const comparison = Validator.toDate(date);
    const original = Validator.toDate(value);
    return !!(original && comparison && original < comparison);
  }
  /**
   * check if the fullString contains the value. 
   * @param fullString entire string to evaluate if contains the value.
   * @param value seed
   * @param options options is an object that defaults to { ignoreCase: false}.  ignoreCase specified whether the case of the substring be same or not.
   */
  static contains(
    fullString: string,
    value: string,
    options: { ignoreCase?: boolean } = {},
  ) {
    if (!Validator.isString(fullString)) return false;
    if (!Validator.isString(value)) return false;
    const defaulContainsOptions = {
      ignoreCase: false,
    };
    options = merge(options, defaulContainsOptions);
    return options.ignoreCase
      ? fullString.toLowerCase().indexOf(value.toLowerCase()) >= 0
      : fullString.indexOf(value) >= 0;
  }
  /**
   * check if the string matches the comparison.
   * @param str 
   * @param comparison 
   */
  static equals(str: string, comparison: string) {
    if (!Validator.isString(str)) return false;
    if (!Validator.isString(comparison)) return false;
    return str === comparison;
  }
  static isValidDateFormat(format: string) {
    return /(^(y{4}|y{2})[\/-](m{1,2})[\/-](d{1,2})$)|(^(m{1,2})[\/-](d{1,2})[\/-]((y{4}|y{2})$))|(^(d{1,2})[\/-](m{1,2})[\/-]((y{4}|y{2})$))/gi
      .test(format);
  }
  /**
   *  Check if the input is a valid date.
   * @param input 
   * @param format  date format Defatuls to YYYY/MM/DD
   * @example
   * expect(Validator.isDate("wilfred lopez", "wilfred")).toBe(false);
   * expect(Validator.isDate("invalid")).toBe(false);
   * expect(Validator.isDate("1/20/20")).toBe(false);
   * expect(Validator.isDate("10/20/2020", "MM/DD/YYYY")).toBe(true);
   * expect(Validator.isDate("2020/01/01")).toBe(true);
   * expect(Validator.isDate("2020/1/1", "YYYY/M/D")).toBe(true);
   */
  static isDate(input: string, format: string = "YYYY/MM/DD") {
    if (typeof input === "string" && Validator.isValidDateFormat(format))
    {
      const splitter = /[-/]/,
        dateAndFormat = zip(
          input.split(splitter),
          format.toLowerCase().split(splitter),
        ),
        dateObj: { [key: string]: string } = {};
      for (const [dateWord, formatWord] of dateAndFormat)
      {
        if (dateWord.length !== formatWord.length)
        {
          return false;
        }

        dateObj[formatWord.charAt(0)] = dateWord;
      }

      return new Date(`${dateObj.m}/${dateObj.d}/${dateObj.y}`).getDate() ===
        +dateObj.d;
    }

    return Object.prototype.toString.call(input) === "[object Date]" &&
      isFinite(input as any);
  }

  /**
   * check if the string represents a decimal number, such as 0.1, .3, 1.1, 1.00003, 4.0, etc.
   * @param str 
   * @param options 
   */
  static isDecimal(str: string, options: {
    force_decimal?: boolean;
    decimal_digits?: string;
    locale?: keyof typeof decimal;
  } = {}) {
    if (!Validator.isString(str)) return false;
    const default_decimal_options = {
      force_decimal: false,
      decimal_digits: "1,",
      locale: "en-US" as keyof typeof decimal,
    };
    const blacklist = ["", "-", "+"];
    const updatedOptions = merge<typeof default_decimal_options>(
      options,
      default_decimal_options,
    );
    function decimalRegExp(options: typeof default_decimal_options) {
      const regExp = new RegExp(
        `^[-+]?([0-9]+)?(\\${decimal[options.locale]
        }[0-9]{${options.decimal_digits}})${options.force_decimal ? "" : "?"}$`,
      );
      return regExp;
    }

    if (updatedOptions.locale in decimal)
    {
      return !includes(blacklist, str.replace(/ /g, "")) &&
        decimalRegExp(updatedOptions).test(str);
    }
    throw new Error(`Invalid locale '${updatedOptions.locale}'`);
  }

  /**
 *  
 * Check if the string is an URL.
 * @param url 
 * @param options options is an object which defaults 
 * to { protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false, disallow_auth: false }
 * 
 */
  static isURL(
    url: string,
    options: {
      protocols?: string[];
      require_tld?: boolean;
      require_protocol?: boolean;
      require_host?: boolean;
      require_valid_protocol?: boolean;
      allow_underscores?: boolean;
      host_whitelist?: boolean;
      host_blacklist?: boolean;
      allow_trailing_dot?: boolean;
      allow_protocol_relative_urls?: boolean;
      disallow_auth?: boolean;
    } = {
        protocols: ["http", "https", "ftp"],
        require_tld: true,
        require_protocol: false,
        require_host: true,
        require_valid_protocol: true,
        allow_underscores: false,
        host_whitelist: false,
        host_blacklist: false,
        allow_trailing_dot: false,
        allow_protocol_relative_urls: false,
        disallow_auth: false,
      },
  ) {
    return isUrl.bind(this, url, options).call(this);
  }

  /**
   * check if the string is an IP (version 4 or 6).
   * @param str
   * @param version 4 or 6
   */
  static isIP(str: string, version: string | number = "") {
    return isIP.apply(this, [str, version]);
  }

  /**
   * check if string matches the pattern.
   * @param str 
   * @param pattern Either matches('foo', /foo/i) or matches('foo', 'foo', 'i')
   * @param flags 
   * @example
   * Validator.matches("123abc", /[abc]/)) // true
   * Validator.matches("something", /[0-9]/) //false
   */
  static matches(str: string, pattern: string | RegExp, flags?: string) {
    if (!Validator.isString(str)) return false;
    let regex: RegExp;

    if (Object.prototype.toString.call(pattern) !== "[object RegExp]")
    {
      pattern = new RegExp(pattern, flags);
    }
    if (pattern instanceof RegExp)
    {
      regex = pattern;
    } else
    {
      regex = new RegExp(pattern, flags);
    }
    return regex.test(str);
  }

  /**
   * check if the string is a hexadecimal number.
   * @param str 
   */
  static isHexadecimal(str: string) {
    const hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;
    return hexadecimal.test(str);
  }
  /**
   * 	check if the string is a valid hex-encoded representation of a MongoDB ObjectId.
   * @param str 
   */
  static isMongoId(str: string) {
    return Validator.isHexadecimal(str) && str.length === 24;
  }

  static isBoolean(val: any): val is boolean {
    return (
      val instanceof Boolean ||
      val === true ||
      val === false ||
      typeof val === "boolean"
    );
  }

  static isNumber(arg: any): arg is number {
    return typeof arg === "number";
  }

  static isKey(value: [] | string) {
    return !Validator.isArray(value) &&
      (/^\w*$/.test(value) ||
        !/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/.test(value));
  }

  static isFunction<T extends Function>(arg: any): arg is T {
    return typeof arg === "function";
  }

  static isUndefined(arg: any): arg is undefined {
    return typeof arg === "undefined";
  }

  static isNullOrUndefined(arg: any): arg is undefined {
    return typeof arg === "undefined" || arg === null;
  }
  static isObject(arg: any): arg is object {
    return !Validator.isNullOrUndefined(arg) && !Validator.isArray(arg) &&
      typeof arg === "object";
  }

  static isEmptyObject(value: unknown): value is EmptyObject {
    return Validator.isObject(value) && !Object.keys(value).length;
  }

  /**
   * Returns true of all the characters in the string are in uppercase.
   * Returns false if an empty string is passed or the string has any characters in lowercase.
   * @param {String} string string to verify
   */
  static isUppercase(string: any) {
    if (!string || typeof string !== "string")
    {
      return false;
    }
    return string === string.toUpperCase();
  }

  static isFileInput = (
    element: FieldElement,
  ): element is HTMLInputElement => element.type === "file";
  /**
   * Check if string or number is integer
   * @param str 
   * @param options 
   */
  static isInt(str: number | string, options: {
    min?: number;
    max?: number;
    lt?: number;
    gt?: number;
    allow_leading_zeroes?: boolean;
  } = {}) {
    if (typeof str !== "string" && typeof str !== "number") return false;
    options = options || {};
    const int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
    const intLeadingZeroes = /^[-+]?[0-9]+$/;

    // Get the regex to use for testing, based on whether
    // leading zeroes are allowed or not.
    let regex = (
      options.hasOwnProperty("allow_leading_zeroes") &&
        !options.allow_leading_zeroes
        ? int
        : intLeadingZeroes
    );

    // Check min/max/lt/gt
    let minCheckPassed = (!options.min || str >= options.min);
    let maxCheckPassed = (!options.max || str <= options.max);
    let ltCheckPassed = (!options.lt || str < options.lt);
    let gtCheckPassed = (!options.gt || str > options.gt);
    return regex.test(str as any) && minCheckPassed && maxCheckPassed &&
      ltCheckPassed && gtCheckPassed;
  }

  /**
   * Check if is a valid port number. should be a integer less than 65535
   * @param port 
   */
  static isPort(port: string | number) {
    return Validator.isInt(port, { min: 0, max: 65535 });
  }



  static isDeepEqual(val1: any, val2: any): boolean {
    if (Validator.isRegex(val1) && Validator.isRegex(val2))
    {
      return Validator.isSameRegex(val1, val2)
    }
    //JSON Doenst work for deep Regex
    // return JSON.stringify(val1) === JSON.stringify(val2)
    //   if regular equality.
    if (val1 === val2)
    {
      return true
    }

    if (Validator.isPrimitive(val1) && Validator.isPrimitive(val2))
    {
      return val1 === val2
    }

    if (Validator.isArray(val1) && Validator.isArray(val2))
    {
      return ArrayHelper.arraysEqual(val1, val2)
    }

    //handle object
    if (Validator.isObject(val1) && Validator.isObject(val2))
    {
      const keys1 = Object.keys(val1)
      const keys2 = Object.keys(val2)
      if (keys1.length !== keys2.length)
      {
        return false
      }
      if (keys1.length === 0)
      {
        // console.log('both are empty')
        return true
      }
      //handle object equality
      let equal: boolean = true
      while (keys1.length && keys2.length && equal)
      {

        let k1 = keys1.pop()
        let k2 = keys2.pop()
        equal = Validator.isDeepEqual(val1[k1 as keyof object], val2[k2 as keyof object])
        if (!equal)
        {
          return false
        }
      }
      return equal
    }

    return false
  }

  /**
   * Check if the string is of type slug. Options allow a single hyphen between string. 
   * e.g. [cn-cn, cn-c-c]
   * @param str 
   */
  static isSlug(str: string) {
    if (!Validator.isString(str)) return false;
    let charsetRegex = /^[^\s-_](?!.*?[-_]{2,})([a-z0-9-\\]{1,})[^\s]*[^-_\s]$/;
    return (charsetRegex.test(str));
  }
  /**
   * Returns true of all the characters in the string are in lowercase.
   * Returns false if an empty string is passed or the string has any characters in uppercase.
   * @param {String} string string to verify
   */
  static isLowerCase(string: any) {
    if (!string || typeof string !== "string")
    {
      return false;
    }
    return string === string.toLowerCase();
  }
  /**
     * Returns true if character is alpha-numeric a-z | A-Z | 0-9
     * @param str single character. if more than one character is passed it will only evaluate the char at position 0.
     */
  static isAlphaNumeric(
    str: string,
    locale: keyof typeof alphanumeric = "en-US",
  ) {
    //Handle called with bad arguments
    if (!str || typeof str !== "string")
    {
      return false;
    }
    if (locale in alphanumeric)
    {
      return alphanumeric[locale].test(str);
    }
    throw new Error(`Invalid locale '${locale}'`);
  }

  /**
   * @param {number} number
   * @return {boolean}
   */
  static isEven(number: number) {
    //could also be (number % 2) === 0
    //Using & bitwise operator.
    return (number & 1) === 0;
  }

  static isSerializable = isSerializable

  static isOdd(number: number) {
    //but could also be (number % 2) !== 0
    //Using & instead of % here. & represents a bitwise operation.
    return (number & 1) !== 0;
  }

  /**
   * Check if number is positive
   * @param {number} number - 32-bit integer.
   * @return {boolean}
   */
  static isPositive(number: number) {
    if (!Validator.isNumber(number)) return false;
    // Zero is neither a positive nor a negative number.
    if (number === 0)
    {
      return false;
    }
    // The most significant 32nd bit can be used to determine whether the number is positive.
    return ((number >> 31) & 1) === 0;
  }
  /**
   * Returns true or false if the number is prime or not.
   * @param n number to verify
   * @complexity O(log n) :)
   */
  static isPrime(n: number) {
    //base cases
    if (n < 2) return false;
    if (n === 2) return true;

    for (let i = 2; i < n; i++)
    {
      if (n % i === 0)
      {
        return false;
      }
    }
    return true;
  }
  /**
   * Determines if number is power of 2
   * @param number 
   * @complexity O(1) Constant time.
   * @example
   * console.log(NumberHelper.isPowerOfTwo(16)) //true
   */
  static isPowerOfTwo(number: number): boolean {
    if (number < 1) return false;
    return (number & (number - 1)) === 0;
  }
}
