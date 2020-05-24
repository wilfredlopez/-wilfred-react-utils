/**
 * Console logs a level shape with a # and spaces acording to the number of times..
 * @param num number of times.
 * @example
 * levels(2)
 * #
 * ##
 * ###
 * ####
 */
//eslint-disable-next-line
function levels(num: number) {
  let output: string[] = []
  for (let i = 1; i <= num; i++) {
    //repeat method!!!!
    output.push("#".repeat(i) + " ".repeat(num - i))
    console.log(genHash(i) + getSpace(num - i))
  }
  return output
}

/**
 * Generates a # string x number of times.
 * @param times
 */
function genHash(times: number) {
  return Array.from({ length: times }, () => "#").join("")
}

/**
 * Generates an empty space x number of times.
 * @param times
 */
function getSpace(times: number) {
  return Array.from({ length: times }, () => " ").join("")
}

/**
 * Console logs a piramid shape with a # in the center and spaces on the sides.
 * @param num number of times.
 */
//eslint-disable-next-line
function piramid(num: number) {
  let output: string[] = []
  for (let i = 1; i <= num; i++) {
    output.push(getSpace(num - i) + genHash(i) + getSpace(num - i))
    console.log(getSpace(num - i) + genHash(i) + getSpace(num - i) + "\r")
  }
  return output.join().replace(/,/g, "\n")
}

// console.log(piramid(5))

//  console log from 1 to n
//  if divisible by three logout FIZZ instead
// if divisible by five logout BUZZ instead
// if n is divisible by both 3 and five logout FIZZBUZZ instead
//eslint-disable-next-line
function fizzbuzz(num: number) {
  let result = ""
  for (let i = 1; i <= num; i++) {
    if (i % 15 === 0) result += "fizzbuzz\n"
    else if (i % 3 === 0) result += `fizz\n`
    else if (i % 5 === 0) result += `buzz\n`
    else result += `${i}\n`
  }
  console.log(result)
  return result
}
// console.log(fizzbuzz(50))

/**
 * Returns an object with the key of the max char and the value is the number of times repeated.
 * If none are repeated it will return an empty object {}.
 * @param text string to get the max char from.
 * @param findFirst If several characters repeat the same amount of times. it will return the last one by default. To override this please pass true.
 */
//eslint-disable-next-line
function maxChar(text: string, findFirst = false) {
  let chars: { [key: string]: number } = {}
  for (const s of text) {
    if (chars[s] !== undefined) {
      chars[s]++
    } else {
      chars[s] = 1
    }
  }
  let max = 1
  let char = ""
  for (const key in chars) {
    if (!findFirst && chars[key] >= max) {
      max = chars[key]
      char = key
    }
    if (findFirst && chars[key] > max) {
      max = chars[key]
      char = key
    }
  }
  return { [char]: max }
}

// console.log(maxChar("aaaabbccdddDDDD", false))

// console.log(isPalindrome("RaceCar")) //true

// console.log(reverseWords("Coding , Javascript")) //gnidoC tpircsavaJ

export {}
