export type AnyTypes =
  | any[]
  | Omit<Primitive, "null" | "undefined">
  | Record<string, any>
  | { [key: string]: any }
  | object

export type Primitive =
  | string
  | boolean
  | number
  | bigint
  | symbol
  | null
  | undefined

/**
 * Offers functionality Encode a value with a password/salt and decode it as long as you use the correct password.
 * 
 * the value can be an array/object/boolean/string or number
 * @example
 * 
    const password = "5555555"
    const coder = Cipher.GenerateEncoder(password)
    const decoder = Cipher.GenerateDecoder(password)
    const secret = coder([{name: "Wilfred"},{ name: "Austria" }]) // 7c15795a4350156c5a4014
    const decodedSecret = decoder<{ name: string }[]>(secret)
    console.log(decodedSecret[0].name) // Wilfred
 */
export class Cipher {
  /**
     * Returns a function able to encode numbers, strings or any array or object.
     * @param salt String value to be used as a password/salt
     * @example
     *  const password = "mysecuresalt"    
        const coder = Cipher.GenerateEncoder(password)
        const message = coder("The lotery numbers will be 12-25-22") // 7c15795a4350156c5a4014
     */
  static get GenerateEncoder() {
    return (salt: string) => {
      return <T extends AnyTypes>(value: T) => {
        if (!salt) {
          //should never be the case
          throw new Error("Password Should Not Be Undefined or an empty string")
        }
        let text: string
        if (typeof value === "string") {
          text = value
        } else {
          text = JSON.stringify(value)
        }

        const salted = text
          .split("")
          .map(Cipher.textToChars)
          .map((value) => {
            return Cipher.applySaltToChar(salt, Number(value))
          })
        return salted.map((n) => Cipher.byteHex(n)).join("")
      }
    }
  }
  /**
   * Returns a function able to decode the value that was encoded.
   * @param salt password/salt used to encode the value.
   * @example
   *  const decoder = Cipher.GenerateDecoder('password')
      const decodedSecret = decoder<{ name: string }[]>('secret')
   */
  static get GenerateDecoder() {
    return (salt: string) => {
      return <E = any>(encoded: string): E => {
        //@ts-ignore
        // const fallback: E = ""

        if (typeof encoded === "undefined") {
          throw new Error(
            "Encoded String Should Not Be Undefined or an empty string",
          )
        }
        if (typeof salt === "undefined") {
          throw new Error("Password Should Not Be Undefined or an empty string")
        }
        const match = encoded.match(/.{1,2}/g)

        if (match === null) {
          throw new Error("Encoded String Should Not Be or an empty string")
          // return fallback
        }
        const value = match
          .map((hex) => parseInt(hex, 16))
          .map(Cipher.applySaltToChar.bind(this, salt))
          .map((charCode) => String.fromCharCode(charCode))
          .join("")
        let parseObjOrS: any = ""
        try {
          parseObjOrS = JSON.parse(value)
        } catch (error) {
          parseObjOrS = value
        }

        // const parsed = JSON.parse(value)
        return parseObjOrS as E
      }
    }
  }

  /**********************************
   * Private Methods
   **********************************/

  /**
   * Returns a number a string. for example "20"
   * @param n number to be turned into bytes
   */
  private static get byteHex() {
    return (n: number): string => {
      return ("0" + Number(n).toString(16)).substr(-2)
    }
  }
  private static get textToChars() {
    return (text: string): number[] => {
      return text.split("").map((c) => c.charCodeAt(0))
    }
  }
  private static get applySaltToChar() {
    return (salt: string, code: number): number => {
      return Cipher.textToChars(salt).reduce((a, b) => a ^ b, code)
    }
  }

  /**
   * Access to Generate encoder returned function directly to get an encoded string.
   * @returns String
   * @param password password to decode with Decoder.
   * @param dataToEncode could be any data you want to encode.
   * @example
   * const mycode = Cipher.Encoder('password', ['secret array item1','secret array item2']) //somerandomstring
   */
  static Encoder<T extends AnyTypes>(password: string, dataToEncode: T) {
    return Cipher.GenerateEncoder(password)<T>(dataToEncode)
  }

  /**
   * Access to GenerateDecoder returned function directly.
   * returns the value of the encoded string if the password is correct.
   * if the password is incorrect it would return a random string.
   * @param password password of the encoded string.
   * @param encodedString encoded string that was previously generated with encoder.
   */
  static Decoder<T>(password: string, encodedString: string) {
    return Cipher.GenerateDecoder(password)<T>(encodedString)
  }
}

const password = "5555555"

const secret = Cipher.Encoder(password, [
  {
    name: "Wilfred",
  },
  { name: "Austria" },
])

const decodedSecret = Cipher.Decoder<{ name: string }[]>(password, secret)
console.log(decodedSecret[0]) // 7c15795a4350156c5a4014
console.log(decodedSecret[0].name) // Wilfred

const secret2 = Cipher.Encoder("wilfredlopez", { me: "loco" })
const wrongPassword = "wilfredl"
//I Have to make it better because this wrong password get's it.
const decodedSecret2 = Cipher.Decoder<string>(wrongPassword, secret2)

console.log(decodedSecret2)
