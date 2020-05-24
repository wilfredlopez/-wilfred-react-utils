import { dropRightWhile } from "../../lodash/dropRightWhile";
import { map } from "../../lodash/map";
import last from "../../lodash/last";

export class ArrayHelper {
  static reverseArray<T extends any>(arr: T[]) {
    const unmutated = [...arr];
    const output = [];
    while (unmutated.length) {
      output.push(unmutated.pop());
    }

    return output;
  }

  static last<T extends any>(array: T[]) {
    return last(array);
  }

  /**
   * Creates an array of values by running each element of array thru iteratee. The iteratee is invoked with three arguments: (value, index, array).
   * @param {Array} array The array to iterate over. 
   * @param {Function} iteratee The function invoked per iteration. 
   * @returns {Array} Returns the new mapped array.
   */
  static map<T extends any>(
    array: T[],
    iteratee: (value: T, index: number, array: T[]) => void,
  ): Array<T> {
    return map(array, iteratee);
  }

  /**
   * Creates a slice of array excluding elements dropped from the end. Elements are dropped until predicate returns falsey. The predicate is invoked with three arguments: (value, index, array).
   * @param array 
   * @param predicate The function invoked per iteration. 
   * @returns a new array
   */
  static dropRightWhile<T extends any>(
    array: T[],
    predicate: (value: T) => boolean,
  ) {
    return dropRightWhile(array, predicate);
  }
  static splitArray<T extends any>(array: Array<T>): [T[], T[]] {
    const unmutated = [...array];
    return [
      unmutated.splice(0, unmutated.length / 2),
      unmutated.splice(unmutated.length / 2 - 1),
    ];
  }

  /**
 * Sorts the array from least to greatest
 * @param inputArr any array
 * @param left left Index of the Array. Defaults to 0. Do not pass this argument unless you know what you are doing. 
 * @param right Last index of the array Defaults to the length of the inputArry - 1. Do not pass this argument unless you know what you are doing. 
 * @example
    const testData = [4, 8, -5, -6, 2, 1, 5, 3000, 1000, 200, 7, 6, 3];
    const p = quickSort(testData);
    console.log(p); // [ -6, -5, 1, 2, 3, 4, 5, 6, 7, 8, 200, 1000, 3000 ]
 */
  static quickSort(inputArr: any[], left = 0, right = inputArr.length - 1) {
    if (left < right) {
      let pivotIndex = ArrayHelper._pivot(inputArr, left);
      ArrayHelper.quickSort(inputArr, left, pivotIndex - 1);
      ArrayHelper.quickSort(inputArr, pivotIndex + 1, right);
    }
    return inputArr;
  }

  private static _pivot(arr: any[], startI: number = 0) {
    let pivot = arr[startI];
    let swapIdx = startI;
    //   for (let i = startI + 1; i < endI +1; i++) {
    for (let i = startI + 1; i < arr.length; i++) {
      if (pivot > arr[i]) {
        swapIdx++;
        ArrayHelper.swap(arr, swapIdx, i);
      }
    }
    ArrayHelper.swap(arr, startI, swapIdx);
    return swapIdx;
  }

  /**
   * Returns an array with the input array splitted by the specified size.
   * @param arr any array
   * @param size max size of arrays inside the array to return.
   * @example
   * console.log(chunkArr([1, 2, 3, 4, 5], 2)) //[ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]
   */
  static chunkArr(arr: any[], size: number) {
    const unmutated = [...arr];
    const chunked: any[][] = [];
    let index = 0;

    while (index < unmutated.length) {
      chunked.push(unmutated.slice(index, index + size));
      index += size;
    }

    return chunked;
  }

  /**
   * Swaps values in the array determined by the indexes passed to the function.
   * doesnt return a new array. just makes changes to the array that was passed.
   * @param arr array be be swapped.
   * @param idx1 target index
   * @param idx2 index to be swapped with target index
   */
  static swap(arr: Array<any>, idx1: number, idx2: number): void {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    //ES5
    //   let temp = arr[idx1];
    //   arr[idx1] = arr[idx2];
    //   arr[idx2] = temp;
  }

  static arraysEqual(a: any[], b: any[]): boolean {
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
      if (a.length !== b.length) {
        // assert same length
        return false;
      }
      for (var i = 0; i < a.length; i++) {
        // assert each element equal
        if (!ArrayHelper.arraysEqual(a[i], b[i])) {
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
  static digitCount(num: number) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
  }

  /**
   * Finds the max digit count in the array of numbers.
   * @param arr array of numbers
   * @example
   *  mostDigits([22, 403, 12345678]); // 8
   */
  static mostDigits(arr: number[]) {
    let maxDigits = 0;

    for (const n of arr) {
      maxDigits = Math.max(ArrayHelper.digitCount(n), maxDigits);
    }
    return maxDigits;
    //this would do it but we iterate twice on the array. one for the map and another one spreading the array into Math.max
    //the one on top only goes one time by the array
    //   return Math.max(...arr.map((d) => digitCount(d)));
  }
}

// const { reverseArray, splitArray, chunkArr } = ArrayHelper
// const testArr = [1, 2, 3, "data", null]
// console.log(splitArray(testArr))
// console.log(reverseArray(testArr))
// console.log(chunkArr(testArr, 2))
