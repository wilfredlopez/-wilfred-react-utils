export class NumberHelper {
  /**
   * Formats seconds into duration. eg. formatDuration(60000) => '00:06:00'
   * @param seconds total seconds
   */
  static formatDuration(seconds: number) {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
  }

  /**
   * @param {number} number
   * @return {boolean}
   */
  static isEven(number: number) {
    return (number & 1) === 0
  }

  /**
   * @param {number} number - 32-bit integer.
   * @return {boolean}
   */
  static isPositive(number: number) {
    // Zero is neither a positive nor a negative number.
    if (number === 0) {
      return false
    }

    // The most significant 32nd bit can be used to determine whether the number is positive.
    return ((number >> 31) & 1) === 0
  }

  /**
   * Switch the sign of the number using "Twos Complement" approach.
   * @param {number} number
   * @return {number}
   */
  static switchSign(number: number) {
    return ~number + 1
  }

  /**
   * Returns the digit in number at the given place value.
   * Always returns a positive number and returns 0 if the place doesnt exist.
   * @param number the number to get the digit from.
   * @param place the place in the number where 0 is the last number. to get the last number(5) in 12345 the place would be 0.
   *
   * Example:
   * For 1835 to get the 5 you can pass the 0 place.
   * @example
   * getDigit(1835, 0) // 5
   * getDigit(12345, 0) // 5
   * getDigit(12345, 1) // 4
   * getDigit(12345, 2) // 3
   * getDigit(12345, 3) // 2
   * getDigit(12345, 4) // 1
   * getDigit(1, 4) // 0 (there's no fourth place in this case returns 0)
   */
  static getDigit(number: number, place: number): number {
    return Math.floor(Math.abs(number) / Math.pow(10, place)) % 10
  }

  /**
   * calculate fibonacci numbers.
   * Uses Memoization for speed improvemnts.
   * @complexity O(n)
   */
  static fibonacci(n: number) {
    if (n <= 2) return 1
    let fivNums = [0, 1, 1]
    for (let i = 3; i <= n; i++) {
      fivNums[i] = fivNums[i - 1] + fivNums[i - 2]
    }
    return fivNums[n]
  }

  /**
   * Calculate fibonacci number at specific position using closed form function (Binet's formula).
   * @see: https://en.wikipedia.org/wiki/Fibonacci_number#Closed-form_expression
   *
   * @param {number} position - Position number of fibonacci sequence (must be number from 1 to 75).
   * @return {number}
   */
  static fibonacciClosedForm(position: number) {
    const topMaxValidPosition = 70

    // Check that position is valid.
    if (position < 1 || position > topMaxValidPosition) {
      throw new Error(
        `Can't handle position smaller than 1 or greater than ${topMaxValidPosition}`,
      )
    }

    // Calculate √5 to re-use it in further formulas. (≈ 2.23606)
    const sqrt5 = Math.sqrt(5)
    // Calculate φ constant (≈ 1.618033).
    const phi = (1 + sqrt5) / 2

    // Calculate fibonacci number using Binet's formula.
    return Math.floor(phi ** position / sqrt5 + 0.5)
  }
  /**
   * Return a fibonacci sequence as an array.
   *
   * @param n
   * @return {number[]}
   */
  static fibonacciSequence(n: number) {
    if (n <= 1) return [1]
    let fivNums = [0, 1, 1]
    for (let i = 3; i <= n; i++) {
      fivNums[i] = fivNums[i - 1] + fivNums[i - 2]
    }

    return fivNums.slice(1)
  }

  static addUpTo(n: number) {
    return (n * (n + 1)) / 2
    // return (n / 2) * (1 + n); //the same
  }

  /**
   * @param {number} number
   * @return {number}
   */
  static factorial(number: number) {
    let result = 1

    for (let i = 2; i <= number; i += 1) {
      result *= i
    }

    return result
  }

  static fibRecursive(
    n: number,
    memo: { [key: string]: number } = { "0": 1, "1": 1, "2": 1 },
  ): number {
    if (memo[n] !== undefined) return memo[n]
    //base case. alredy included in memo but leaving here anyways
    if (n <= 2) return 1
    let res =
      NumberHelper.fibRecursive(n - 1, memo) +
      NumberHelper.fibRecursive(n - 2, memo)
    memo[n] = res
    return res
  }
}
