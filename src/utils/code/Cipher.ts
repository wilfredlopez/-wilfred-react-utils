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
    const coder = Cipher.Encoder(password)
    const decoder = Cipher.Decoder(password)
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
        const coder = Cipher.Encoder(password)
        const message = coder("The lotery numbers will be 12-25-22") // 7c15795a4350156c5a4014
     */
  static Encoder(salt: string) {
    return <T extends AnyTypes>(value: T) => {
      const text: string = JSON.stringify(value)
      const salted = text
        .split("")
        .map(Cipher.textToChars)
        .map((value) => {
          return Cipher.applySaltToChar(salt, Number(value))
        })
      return salted.map((n) => Cipher.byteHex(n)).join("")
    }
  }

  /**
   * Returns a function able to decode the value that was encoded.
   * @param salt password/salt used to encode the value.
   */
  static Decoder(salt: string) {
    return <E = any>(encoded: string): E => {
      const value = encoded
        .match(/.{1,2}/g)!
        .map((hex) => parseInt(hex, 16))
        .map(Cipher.applySaltToChar.bind(this, salt))
        .map((charCode) => String.fromCharCode(charCode))
        .join("")
      const parsed = JSON.parse(value)
      return parsed
    }
  }

  /**********************************
   * Private Methods
   **********************************/

  /**
   * Returns a number a string. for example "20"
   * @param n number to be turned into bytes
   */
  private static byteHex(n: number): string {
    return ("0" + Number(n).toString(16)).substr(-2)
  }
  private static textToChars(text: string): number[] {
    return text.split("").map((c) => c.charCodeAt(0))
  }
  private static applySaltToChar(salt: string, code: number): number {
    return Cipher.textToChars(salt).reduce((a, b) => a ^ b, code)
  }
}

// const password = "5555555"
// const coder = Cipher.Encoder(password)
// const decoder = Cipher.Decoder(password)
// const secret = coder([
//   {
//     name: "Wilfred",
//   },
//   { name: "Austria" },
// ])
// const decodedSecret = decoder<{ name: string }[]>(secret)
// console.log(secret) // 7c15795a4350156c5a4014
// console.log(decodedSecret[0].name) // Wilfred
