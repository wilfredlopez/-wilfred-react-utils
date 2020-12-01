import { binaryToText, textToBinary } from './binaryDecode'
import { PatternGenerator } from '.'
export const StringHelper = {
  binaryToText,
  textToBinary,
  /**
   * Returns the string with proper case.
   * @param str string to add proper case
   * @example StringHelper.toProperCase(" hello world") // " Hello World"
   */
  toProperCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  },
  isString(arg: any): arg is string {
    return typeof arg === 'string'
  },
  isPalindrome(text: string) {
    text = text.toLowerCase()
    return text.split('').reduce((acc, current) => current + acc, '') === text
    // return text.split("").reverse().join("") === text;
  },
  /**
   * Creates a Pattern Generator that returns random strings with the especified pattern.
   * If you would like to use reserved characters in you pattern you can quote it with single quotes, for example:
   * @example
   * const xmasCodes = StringHelper.patternGenerator("'XMAS'-XXXXX")
   * console.log(xmasCodes.next) //XMAS-4K9LN
   * const codes = [];
      while (codes.length < 1000) {
      codes.push(xmasCodes.next);
      }
   *
   * //You could also use the patter generator directly.
   * @example
   * const pg = new PatternGenerator("AAA-99999")
    console.log(pg.next) // UAD-28986 
    console.log(pg.next) //FQH-78470 
    console.log(pg.next) // LWR-88988 
   */
  patternGenerator(pattern: string) {
    return new PatternGenerator(pattern)
  },
  reverseString(text: string) {
    return text.split('').reduce((acc, current) => current + acc, '')
  },
  reverseWords(str: string) {
    const revWords = str.split(' ')
    let output: string[] = []
    for (let letter of revWords) {
      // output.push(letter.split("").reverse().join(""))
      output.push(StringHelper.reverseString(letter))
    }
    return output.join(' ')
  },
  /**
   * returns the string as it was if its not greater than the max Length. otherwise it will return three dots at the end keeping the specified length.
   * @param value the string value you need to make sure doesnt go over the maxlenght
   * @param maxLength the max length that the string should have. @default 20.
   */
  reduceLongString(value: string, maxLength: number = 20): string {
    if (value.length > maxLength) {
      return value.substr(0, maxLength - 3) + '...'
    } else {
      return value
    }
  },

  /**
   * Returns true if character is alpha-numeric a-z | A-Z | 0-9
   * @param char single character. if more than one character is passed it will only evaluate the char at position 0.
   */
  isAlphaNumeric(char: string) {
    //Handle called with bad arguments
    if (!char || typeof char !== 'string') {
      return false
    }
    //would also do it but works slowe
    // return /[A-Za-z0-9]/gi.test(char);
    const code = char.charCodeAt(0)
    const isNumeric = code > 47 && code < 58 //numeric (0-9)
    const isUpperCase = code > 64 && code < 91 //alpha upper (A-Z)
    const isLowerCase = code > 96 && code < 126 //alpha lower (a-z)
    if (!isNumeric && !isUpperCase && !isLowerCase) {
      return false
    }
    return true
  },
  /**
     *  Determines is two words are anagrams.
     *  Returns true or false
     * @param str1 word 1
     * @param str2 word 2
     * @example
     * console.log(StringHelper.isAnagram("rail Safety", "fairy tales")) //true
       console.log(StringHelper.isAnagram("Rail Safety!!!!", "fairy tales")) // true
       console.log(StringHelper.isAnagram("bad credit", "debit card")) // true
       console.log(StringHelper.isAnagram("conversation", "voice rants on")) // true
       console.log(StringHelper.isAnagram("Hi There", "Bye There")) // false
     */
  isAnagram(str1: string, str2: string) {
    str1 = str1.replace(/[^\w]/g, '').toLowerCase()
    str2 = str2.replace(/[^\w]/g, '').toLowerCase()
    if (str1.length !== str2.length) {
      return false
    }
    const charMap: { [key: string]: number } = {}
    for (const c of str1) {
      if (charMap[c] !== undefined) charMap[c]++
      else charMap[c] = 1
    }

    for (const d of str2) {
      if (!charMap[d]) {
        return false
      } else {
        if (charMap[d] === 0) {
          delete charMap[d]
        } else charMap[d]--
      }
    }
    return true
  },
  joinWith(letter: string) {
    return (s: string[]) => s.join(letter)
  },
  split(regexOrString: string | RegExp, str: string) {
    return str.split(regexOrString)
  },
  splitWith(withString: string | RegExp) {
    return (s: string) => s.split(withString)
  },
  lowerCase(s: string) {
    return s.toLowerCase()
  },
  /**
   * returns the slogified version. ex. my house => my-house
   * @param a string.
   */
  slogify(a: string): string {
    const map = <T, U>(cb: (value: T, index: number, array: T[]) => U) => (
      arr: Array<T>
    ) => arr.map(cb)
    const compose = (fn1: (a: any) => any, ...fns: Array<(a: any) => any>) =>
      fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn1)

    // const lowercase = (s: string) => s.toLowerCase();
    const splitJoin = compose(
      map(StringHelper.joinWith('-')),
      map(StringHelper.splitWith(' '))
    )

    return compose(
      StringHelper.joinWith('-'),
      map(StringHelper.lowerCase),
      splitJoin,
      StringHelper.splitWith(' ')
    )(a.replace(/[^\s\w]/gi, ''))
  },
  slogifyFromArray(a: string[]): string {
    const map = <T, U>(cb: (value: T, index: number, array: T[]) => U) => (
      arr: Array<T>
    ) => arr.map(cb)

    const compose = (fn1: (a: any) => any, ...fns: Array<(a: any) => any>) =>
      fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn1)

    const splitJoin = compose(
      map(StringHelper.joinWith('-')),
      map(StringHelper.splitWith(' '))
    )

    return compose(
      StringHelper.joinWith('-'),
      map(StringHelper.lowerCase),
      splitJoin
    )(a.map(a => a.replace(/[\W]/gi, '')).filter(v => v !== ''))
  },
  /**
   * Turns the values separated with "-" into camelCase.
   * @param {TemplateStringsArray}  template 
   * @example
   * console.log(StringHelper.camelCase`
      background-color: red;
      position: absolute;
      flex-direction: column;
      `); 
      //backgroundColor: red; position: absolute; flexDirection: column;
   */
  camelCase(template: TemplateStringsArray, ...values: any[]) {
    function convert(string: string) {
      return string
        .split('-')
        .map((v, i) => {
          if (i === 0) {
            return v
          }
          return v[0].toUpperCase() + v.slice(1)
        })
        .join('')
    }
    let ret = ''
    for (let i = 0; i < template.length; i++) {
      if (i > 0) {
        if (values[i - 1]) {
          ret += convert(`${String(values[i - 1])}`) //I COULD MODIFY THE DINAMIC VALUES HERE. ex. ${dynamic}
        }
      }
      if (template[i]) {
        ret += convert(template[i]) //Modifies only the non dynamic values on the template string. ex.`im not dynamic. ${imDynamic}`
      }
    }
    return ret
  },
  /**
   * Turns regular css into a javascript css object.
   * @param {TemplateStringsArray}  template
   * @example
   * const clasOb = StringHelper.objectFromCSS`
   *   background-color: red;
   *   position: absolute;
   *   flex-direction: column;
   *   `
   * console.log(clasOb) //{ backgroundColor: 'red', position: 'absolute',flexDirection: 'column' }
   * console.log(clasOb.backgroundColor) //red
   *
   */
  objectFromCSS(template: TemplateStringsArray, ...values: any[]) {
    let ret = ''
    for (let i = 0; i < template.length; i++) {
      if (i > 0) {
        if (values[i - 1]) {
          ret += `$${String(values[i - 1])}` //I COULD MODIFY THE DINAMIC VALUES HERE. ex. ${dynamic}
        }
      }
      ret += template[i]
        .split('-')
        .map(v => v[0].toUpperCase() + v.slice(1))
        .join('') //Modifies only the non dynamic values on the template string. ex.`im not dynamic. ${imDynamic}`
    }
    const data = ret.split(/[\n?]/).reduce((acc, current) => {
      current.trim()
      if (current.trim() !== '') {
        return {
          ...acc,
          [current.split(':')[0].trim()]: current
            .split(':')[1]
            .trim()
            .replace(';', ''),
        }
      } else {
        return {
          ...acc,
        }
      }
    }, {})
    return JSON.parse(JSON.stringify(data))
  },
}

// console.log(StringHelper.slogifyFromArray(["simple", "param", ",", "are"]));
// console.log(StringHelper.slogify("wilfred lopez castillo"));

// /**
//  * Returns the string with proper case and also *trims the white space.
//  * @param str string to add proper case
//  * @example toProperCase(" hello world") // "Hello World"
//  */
// function toProperCaseOld(str: string) {
//   // str = str.trim()
//   const words = str.match(/\w+(.)?/gim)

//   //base case. one single word
//   let proper = str.replace(/^\w/g, str[0].toUpperCase())

//   //if there is an array of words
//   if (words) {
//     proper = ""
//     for (const w of words) {
//       proper += ` ${w.trim().replace(/^\w/g, w[0].toUpperCase())}`
//     }
//   }
//   return proper.trim()
// }

// function isAnagram2(str1: string, str2: string) {
//   //not the best solution even tho looks easier.
//   //sort iterrates over the entire string, so we have to go over both twice no matter what.
//   // in the other solution we only iterrate over both strings if it is a match. overwise we return before doing so.
//   str1 = str1.replace(/[^\w]/g, "").toLowerCase().split("").sort().join("")
//   str2 = str2.replace(/[^\w]/g, "").toLowerCase().split("").sort().join("")
//   return str1 === str2
// }

// console.log(StringHelper.isAnagram("rail Safety", "fairy tales")) //true
// console.log(StringHelper.isAnagram("Rail Safety!!!!", "fairy tales")) // true
// console.log(StringHelper.isAnagram("bad credit", "debit card")) // true
// console.log(StringHelper.isAnagram("conversation", "voice rants on")) // true
// console.log(StringHelper.isAnagram("Hi There", "Bye There")) // false
// console.log(StringHelper.isAnagram("Hi There", "ni There")) // false
// console.log(StringHelper.isAnagram("Wilfred &*(*)_()", "wcxckj 82fs d")) // false
