export class StringHelper {
  /**
   * Returns the string with proper case.
   * @param str string to add proper case
   * @example toProperCase(" hello world") // " Hello World"
   */
  static toProperCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  static isPalindrome(text: string) {
    text = text.toLowerCase()
    return text.split("").reduce((acc, current) => current + acc, "") === text
    // return text.split("").reverse().join("") === text;
  }

  /**
 * Creates a Pattern Generator that returns random strings with the especified pattern.
 * If you would like to use reserved characters in you pattern you can quote it with single quotes, for example:
 * @example
 * const xmasCodes = NumberHelper.patternGenerator("'XMAS'-XXXXX")
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
  static patternGenerator(pattern: string) {
    return new PatternGenerator(pattern)
  }

  static reverseString(text: string) {
    return text.split("").reduce((acc, current) => current + acc, "")
  }

  static reverseWords(str: string) {
    const revWords = str.split(" ")
    let output: string[] = []
    for (let letter of revWords) {
      // output.push(letter.split("").reverse().join(""))
      output.push(StringHelper.reverseString(letter))
    }
    return output.join(" ")
  }

  /**
   * returns the string as it was if its not greater than the max Length. otherwise it will return three dots at the end keeping the specified length.
   * @param value the string value you need to make sure doesnt go over the maxlenght
   * @param maxLength the max length that the string should have. @default 20.
   */
  static reduceLongString(value: string, maxLength: number = 20): string {
    if (value.length > maxLength) {
      return value.substr(0, maxLength - 3) + "..."
    } else {
      return value
    }
  }

  /**
   *  Determines is two words are anagrams.
   *  Returns true or false
   * @param str1 word 1
   * @param str2 word 2
   * @example
   * console.log(isAnagram("rail Safety", "fairy tales")) //true
     console.log(isAnagram("Rail Safety!!!!", "fairy tales")) // true
     console.log(isAnagram("bad credit", "debit card")) // true
     console.log(isAnagram("conversation", "voice rants on")) // true
     console.log(isAnagram("Hi There", "Bye There")) // false
   */
  static isAnagram(str1: string, str2: string) {
    str1 = str1.replace(/[^\w]/g, "").toLowerCase()
    str2 = str2.replace(/[^\w]/g, "").toLowerCase()
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
  }
}

type PatternGroup = "A" | "a" | 9 | "X" | "x" | "#"
/**
 * Creates a Pattern Generator that returns random strings with the especified pattern.
 * If you would like to use reserved characters in you pattern you can quote it with single quotes, for example:
 * @example
 * const xmasCodes = new PatternGenerator("'XMAS'-XXXXX")
 * console.log(xmasCodes.next) //XMAS-4K9LN
 * const codes = [];
    while (codes.length < 1000) {
    codes.push(xmasCodes.next);
    }
 * @example
 * const pg = new PatternGenerator("AAA-99999")
  console.log(pg.next) // UAD-28986 
  console.log(pg.next) //FQH-78470 
  console.log(pg.next) // LWR-88988 
 */
export class PatternGenerator {
  pattern: string
  #combinations: number
  #placeholders = {
    A: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    a: "abcdefghijklmnopqrstuvwxyz",
    "9": "0123456789",
    X: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    x: "abcdefghijklmnopqrstuvwxyz0123456789",
    "#": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  } as const
  #cache: { [key: string]: boolean } = {}
  #maxAttempts = 0xbad
  /**
   *
   * @param pattern a string containing the accepted patterns. for exampe AAA-99999. this would generate something like EGX-78797
   * @A	for uppercase letters
   * @a	for lowercase letters
   * @9	for digits
   * @X	for uppercase letters + digits
   * @x	for lowercase letters + digits
   * @#	for uppercase and lowercase letters + digits
   */
  constructor(pattern: string) {
    this.pattern = pattern
    this.#combinations = this.countCombinations(this.pattern)
  }

  get maxAttempts() {
    return this.#maxAttempts
  }

  get next() {
    let attempt = 0
    let code: string
    do {
      code = this.randomCode(this.pattern)
    } while (this.#cache[code] && ++attempt < this.#maxAttempts)

    this.#cache[code] = true

    if (attempt === this.#maxAttempts) {
      throw new Error("PatternGenerator: cannot generate next unique code.")
    }

    return code
  }
  reset() {
    this.#cache = {}
  }
  get combinations() {
    return this.#combinations
  }

  private randomInt(max: number) {
    return Math.floor(Math.random() * max)
  }

  private randomElem(array: string) {
    return array[this.randomInt(array.length)]
  }

  private randomCode(pattern: string) {
    var code = ""
    var quote = "'"
    var quoteOpen = false
    pattern.split("").forEach((c) => {
      if (!quoteOpen) {
        if (this.#placeholders[c as PatternGroup]) {
          code += this.randomElem(this.#placeholders[c as PatternGroup])
        } else if (c === quote) {
          quoteOpen = true
        } else {
          code += c
        }
      } else {
        if (c === quote) {
          quoteOpen = false
        } else {
          code += c
        }
      }
    })
    return code
  }

  private countCombinations(pattern: string) {
    var combinations = 1
    var quote = "'"
    var quoteOpen = false
    pattern.split("").forEach((c) => {
      if (!quoteOpen) {
        if (this.#placeholders[c as PatternGroup]) {
          combinations *= this.#placeholders[c as PatternGroup].length
        } else if (c === quote) {
          quoteOpen = true
        }
      } else if (c === quote) {
        quoteOpen = false
      }
    })
    return combinations
  }
}

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

// const pg = new PatternGenerator("'WL'-XXXXX")

// const codes = []
// while (codes.length < 50) {
//   codes.push(pg.next)
// }
// console.log(codes) // UAD-28986 (something with this pattern but not exactly)
// console.log(pg.next) //FQH-78470 (something with this pattern but not exactly)
// console.log(pg.next) // LWR-88988 (something with this pattern but not exactly)
