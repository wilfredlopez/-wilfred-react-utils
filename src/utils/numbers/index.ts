export { idGenetaror } from './idGenerator'
export { NumberHelper } from './NumberHelper'
/**
 * Turns the seconds into formatted minutes to display.
 * This function only returns minutes. not hours. for hours please consirer using the formatDuration function.
 * @param s seconds
 * @example
 * const formatedMins = turnSecondsToFormatedMinutes(1000) //16:40
 *
 */
export function turnSecondsToFormatedMinutes(s: number) {
  const rountedMinutes = (s - (s %= 60)) / 60
  const isLessThan9 = 9 < Math.round(s)
  const roundedSeconds = Math.round(s)
  const spacer = isLessThan9 ? ':' : ':0'
  return rountedMinutes + spacer + roundedSeconds
}

/**
 * Formats seconds into duration. eg. formatDuration(60000) => '00:06:00'
 * @param seconds total seconds
 */
export function formatDuration(seconds: number) {
  return new Date(seconds * 1000).toISOString().substr(11, 8)
}

/**
 *
 * @param value Total cents.
 * @example formatCentsToDollars(50759) // 507.59
 */
export const formatCentsToDollars = function (value: string | number) {
  value = (value + '').replace(/[^\d.-]/g, '')
  value = parseFloat(value)
  return value ? value / 100 : 0
}

/**
 * calculate fibonacci numbers.
 * Uses Memoization for speed improvemnts.
 * @complexity O(n)
 */
export function fib(n: number) {
  if (n <= 2) return 1
  let fivNums = [0, 1, 1]
  for (let i = 3; i <= n; i++) {
    fivNums[i] = fivNums[i - 1] + fivNums[i - 2]
  }
  return fivNums[n]
}

export function addUpTo(n: number) {
  return (n * (n + 1)) / 2
  // return (n / 2) * (1 + n); //the same
}

// const sum10 = accumulator(10);

// console.log(sum10(20));

// export function sumNumbers(arr: number[]) {
//   if (arr.length < 50) {
//     let total = 0;
//     for (let num of arr) {
//       total += num;
//     }
//     return total;
//   } else {
//     return arr.reduce((acc, val) => acc + val, 0);
//   }
// }

// console.log(
//   sumNumbers(
//     [
//       5,
//       3,
//       7,
//       3,
//       69,
//       3,
//       3,
//       3,
//       3,
//       3,
//       3,
//       3,
//       4,
//       5,
//       43,
//       34,
//       1234,
//       46,
//       3,
//       34,
//       34,
//       2,
//       34,
//       5,
//       3,
//       21,
//       3,
//       10,
//       40,
//       40,
//       404,
//       2,
//       4,
//       5,
//       6,
//       77,
//       7,
//       7,
//       4,
//       3,
//       55,
//       5,
//       67,
//       678,
//       58,
//       567,
//       754,
//       4,
//       43,
//       34,
//       34,
//     ],
//   ),
// );
/**
 * calculate fibonacci numbers
 * Uses recursion and memoization
 * @deprecated Could five a RangeError: Maximum call stack size exceeded.
 * Recommended to use the regular fib function.
 * @complexity O(n)
 */
// function fibRecursive(
//   n: number,
//   memo: number[] = [undefined as any, 1, 1],
// ): number {
//   if (memo[n] !== undefined) return memo[n];
//   //base case. alredy included in memo but leaving here anyways
//   if (n <= 2) return 1;
//   let res = fibRecursive(n - 1, memo) + fibRecursive(n - 2, memo);
//   memo[n] = res;
//   return res;
// }

// function fib2(
//   n: number,
//   memo: { [key: string]: number } = { "0": 1, "1": 1, "2": 1 },
// ): number {
//   if (memo[n] !== undefined) return memo[n];
//   //base case. alredy included in memo but leaving here anyways
//   if (n <= 2) return 1;
//   let res = fib2(n - 1, memo) + fib2(n - 2, memo);
//   memo[n] = res;
//   return res;
// }
