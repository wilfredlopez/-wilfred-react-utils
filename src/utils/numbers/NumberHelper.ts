export class NumberHelper {
  /**
   * Formats seconds into duration. eg. formatDuration(60000) => '00:06:00'
   * @param seconds total seconds
   */
  static formatDuration(seconds: number) {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
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
  static fib(n: number) {
    if (n <= 2) return 1
    let fivNums = [0, 1, 1]
    for (let i = 3; i <= n; i++) {
      fivNums[i] = fivNums[i - 1] + fivNums[i - 2]
    }
    return fivNums[n]
  }

  static addUpTo(n: number) {
    return (n * (n + 1)) / 2
    // return (n / 2) * (1 + n); //the same
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
