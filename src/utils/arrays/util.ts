//ES5
// export function swap(arr: Array<any>, idx1: number, idx2: number) {
//   let temp = arr[idx1];
//   arr[idx1] = arr[idx2];
//   arr[idx2] = temp;
// }

/**
 * Swaps values in the array determined by the indexes passed to the function.
 * doesnt return a new array. just makes changes to the array that was passed.
 * @param arr array be be swapped.
 * @param idx1 target index
 * @param idx2 index to be swapped with target index
 */
export function swap(arr: Array<any>, idx1: number, idx2: number): void {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

export function splitArray<T extends any>(array: Array<T>): [T[], T[]] {
  return [
    array.splice(0, array.length / 2),
    array.splice(array.length / 2 - 1),
  ];
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
export function getDigit(number: number, place: number): number {
  return Math.floor(Math.abs(number) / Math.pow(10, place)) % 10;
}

export function arraysEqual(a: any[], b: any[]): boolean {
  /******This would do it too*******/
  //   if (!Array.isArray(a) || !Array.isArray(b)) return false;
  //   if (JSON.stringify(a) === JSON.stringify(b)) return true;
  //   else return false;
  /*************/

  /*
          Array-aware equality checker:
          Returns whether arguments a and b are == to each other;
          however if they are equal-lengthed arrays, returns whether their 
          elements are pairwise == to each other recursively under this
          definition.
      */
  if (a instanceof Array && b instanceof Array) {
    if (a.length !== b.length) { // assert same length
      return false;
    }
    for (var i = 0; i < a.length; i++) { // assert each element equal
      if (!arraysEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  } else {
    return a === b; // if not both arrays, should be the same
  }
}

/**
 * gets the count of digits that a number has.
 * @param num number
 * @example 
 * digitCount(1234) // 4
 * digitCount(1) // 1
 */
export function digitCount(num: number) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

/**
 * Finds the max digit count in the array of numbers. 
 * @param arr array of numbers
 * @example
 *  mostDigits([22, 403, 12345678]); // 8
 */
export function mostDigits(arr: number[]) {
  let maxDigits = 0;

  for (const n of arr) {
    maxDigits = Math.max(digitCount(n), maxDigits);
  }
  return maxDigits;
  //this would do it but we iterate twice on the array. one for the map and another one spreading the array into Math.max
  //the one on top only goes one time by the array
  //   return Math.max(...arr.map((d) => digitCount(d)));
}
