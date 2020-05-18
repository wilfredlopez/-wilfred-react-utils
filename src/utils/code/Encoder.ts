/**
 * @deprecated THIS CAN BE HACKED TO I'TS NOT CORRECT TO USE IT. please use Cipher instead
 * Provides functionality to encode a string and decoded with a secret and a variant.
 * both the secret and the variant should be equal in order to decode.
 * The encoder class requires a unique password to be initialized. this will serve as a validation on top of the secret for each encoded text.
 * @param password Share this password only with others that may need to create an encoder class to decode yours, but preferrably it is exported as a singleton and the password is never shared. 
 * @example
 * const encoder = new Encoder("MY_PASSWORD")
  const text = "IM THE BEST 101"
  const encodedText = encoder.encode(text, "imsecret", 10)
  const decodedText = encoder.decode(encodedText, "imsecret", 10)
  console.log(decodedText) // IM THE BEST 101
 */
export class Encoder {
  constructor(password: string) {
    this.separator = this.hashSecret(password, 84)
  }
  private secretize(str: string, secret: string) {
    const SEPARATOR = this.separator
    return str.concat(`${SEPARATOR}${secret}`)
  }

  private hashSecret(key: string, variant: number) {
    let total = 0
    const upperBound = variant === 0 ? 100 : variant * 3

    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i)
    }
    //a number from 0 to the total number of buckets
    return (
      "X" +
      (total % upperBound) +
      total * upperBound +
      "Z" +
      (total % upperBound)
    )
  }

  private hashVariant(secret: string, variant: number) {
    let total = 0

    for (let i = 0; i < secret.length; i++) {
      total += secret.charCodeAt(i)
    }
    //a number from 0 to the total number of buckets
    return total + variant
  }

  // private shuffleKeys(keys: string[]) {
  //   let array = keys
  //   for (let i = array.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1))
  //     ;[array[i], array[j]] = [array[j], array[i]]
  //   }
  //   return array
  // }
  private shuffle(dic: { [key: string]: string }, maxShuffle: number) {
    let i = 0 //84
    maxShuffle = maxShuffle > 0 ? maxShuffle : 35
    for (const key in dic) {
      const swapKey = dic[key]
      dic[key] = key
      dic[swapKey] = swapKey
      i++
      // shuffle the values up to the specified number in the variant.
      if (i < maxShuffle) {
        const swapKey = dic[key]
        dic[key] = key
        dic[swapKey] = swapKey
        i++
      } else {
        break
      }
    }
    return dic
  }

  private shuffleDictioraty(hashVariant: number) {
    let dic = { ...this.codeDictionary }
    const maxShuffle = hashVariant > 0 ? hashVariant : 52
    for (let i = 0; i < maxShuffle; i++) {
      dic = this.shuffle(dic, 52)
    }
    return dic
  }
  /**
   *
   * @param str string to encode.
   * @param variant a number between 0 and 84 that determines the output and should be use to decode the string.
   */
  public encode(str: string, secret: string, variant: number = 0) {
    const dic = this.shuffleDictioraty(this.hashVariant(secret, variant))
    str = this.secretize(str, this.hashSecret(secret, variant))

    const chars = str.split("")
    let translated = ""

    for (const word of chars) {
      if (dic[word]) translated += dic[word]
      else translated += word
    }
    return translated.split("@").reverse().join("@")
  }

  /**
   *
   * @param str string to decode.
   * @param variant a number between 0 and 84 that was used to encode the string with.
   */
  decode(str: string, secret: string, variant: number = 0) {
    return this.desecretize(
      this.encode(str.split("@").reverse().join("@"), secret, variant),
      this.hashSecret(secret, variant),
    )
  }
  private desecretize(str: string, secret: string) {
    const SEPARATOR = this.separator
    const regex = new RegExp(`${SEPARATOR}${secret}`)
    const desec = str.match(regex)
    if (desec === null) {
      throw new Error("Decoding Failure")
    }
    const diff = new RegExp(`${SEPARATOR}${secret}.+`)
    //   console.log(desec === null)
    return str.replace(diff, "")
  }

  // need to find a way to make the separator a secret code that others cant see.
  //maybe require it as an input for the constructor
  private separator: string = "║"
  private codeDictionary: { [key: string]: string } = {
    "0": "c",
    "1": "b",
    b: "1",
    "2": "a",
    a: "2",
    "3": "d",
    d: "3",
    "4": "e",
    e: "4",
    W: "T",
    g: "5",
    "6": "f",
    f: "6",
    "7": "h",
    M: "J",
    j: ":",
    _: "8",
    i: "-",
    " ": "@",
    "@": " ",
    "5": "g",
    h: "7",
    "'": ".",
    ".": "'",
    y: "&",
    "&": "y",
    K: "K",
    I: "I",
    o: "u",
    u: "o",
    t: "z",
    G: "A",
    z: "t",
    N: "V",
    w: "!",
    "!": "w",
    c: "0",
    $: "l",
    v: "s",
    s: "v",
    m: "%",
    A: "G",
    n: "q",
    q: "n",
    ñ: "p",
    p: "ñ",
    T: "W",
    H: "U",
    B: "D",
    l: "$",
    E: "Z",
    D: "B",
    Z: "E",
    x: "=",
    J: "M",
    "=": "x",
    O: "Ñ",
    Ñ: "O",
    C: "?",
    "?": "C",
    F: "L",
    L: "F",
    X: "<",
    "<": "X",
    P: ">",
    ">": "P",
    r: "~",
    "~": "r",
    k: "+",
    "+": "k",
    S: "₧",
    "₧": "S",
    R: "»",
    Q: "|",
    V: "N",
    ":": "j",
    "9": "*",
    "*": "9",
    "-": "i",
    "»": "R",
    U: "H",
    "|": "Q",
    "8": "_",
    "║": "╚",
    "╚": "║",
    "%": "m",
  }
}

// const encoder = new Encoder("WILFRED")
// const text = "IM THE BEST 101"
// const encodedText = encoder.encode(text, "imsecret", 10)
// const decodedText = encoder.decode(encodedText, "imsecret", 10)
// console.log(decodedText === text)
// console.log(hackEncode(encodedText))

// // If i have access to the encoder i will be able to hack it. even if its a new encoder.
// // THIS NEEDS TO BE FIXED since using the encoder.shuffle function i can guess the variant
// function hackEncode(str: string, variant: number = 0) {
//   const encoder = new Encoder("OTHER_PASS")
//   //@ts-ignore
//   let dic = { ...encoder.codeDictionary }
//   //@ts-ignore
//   dic = encoder.shuffle(dic, 42)
//   let i = 0 //84
//   const maxShuffle = variant > 84 ? 84 : variant

//   if (maxShuffle > 0) {
//     for (const key in dic) {
//       //shuffle the values up to the specified number in the variant.
//       if (i < maxShuffle) {
//         const swapKey = dic[key]
//         dic[key] = key
//         dic[swapKey] = swapKey
//         i++
//       } else {
//         break
//       }
//     }
//   }
//   const chars = str.split("")
//   let translated = ""

//   for (const word of chars) {
//     if (dic[word]) translated += dic[word]
//     else translated += word
//   }
//   return translated
// }
