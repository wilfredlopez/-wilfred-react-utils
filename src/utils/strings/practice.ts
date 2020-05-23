function levels(num: number) {
  let output: string[] = []
  for (let i = 1; i <= num; i++) {
    output.push(genHash(i) + getSpace(num - i))
    console.log(genHash(i) + getSpace(num - i))
  }
  return output
}

function genHash(times: number) {
  return Array.from({ length: times }, () => "#").join("")
}
function getSpace(times: number) {
  return Array.from({ length: times }, () => " ").join("")
}

/**
 * Console logs a piramid shape with a # in the center and spaces on the sides.
 * @param num number of times.
 */
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

function isPalindrome(text: string) {
  text = text.toLowerCase()
  return text.split("").reduce((acc, current) => current + acc, "") === text
  // return text.split("").reverse().join("") === text;
}

/**
 * Returns an object with the key of the max char and the value is the number of times repeated.
 * If none are repeated it will return an empty object {}.
 * @param text string to get the max char from.
 * @param findFirst If several characters repeat the same amount of times. it will return the last one by default. To override this please pass true.
 */
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

/**
 * Acepts and integer N and returns an NxN spiral Matrix
 * @example
 * spiralMatrix(2)
 * // returns [
 * //          [1,2]
 * //         [4,3]
 * //              ]
 * spiralMatrix(3)
 * // returns [
 * //          [1,2,3]
 * //         [8,9,4]
 * //         [7.6,5]
 * //              ]
 */
function spiralMatrix(n: number) {
  const result: number[][] = []
  let counter = 1
  let start_column = 0
  let end_column = n - 1
  let start_row = 0
  let end_row = n - 1

  for (let i = 0; i < n; i++) {
    result.push([])
  }
  while (start_column <= end_column && start_row <= end_row) {
    //Top Row
    for (let i = start_column; i <= end_column; i++) {
      result[start_row][i] = counter
      counter++
    }

    start_row++

    //Right Colum
    for (let j = start_row; j <= end_row; j++) {
      result[j][end_column] = counter
      counter++
    }
    end_column--
    //End Column
    for (let i = end_column; i >= start_column; i--) {
      result[end_row][i] = counter
      counter++
    }
    end_row--
    //Start Column
    for (let i = end_row; i >= start_row; i--) {
      result[i][start_column] = counter
      counter++
    }
    start_column++
  }

  return result
}

// console.log(spiralMatrix(2)) //[ [ 1, 2 ], [ 4, 3 ] ]
// console.log(spiralMatrix(3))
/*  [[1,2,3]
      [8,9,4]
      [7.6,5]]
    */

export {}
