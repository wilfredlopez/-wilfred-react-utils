import { dropRightWhile } from "./dropRightWhile";
import { deepCopy } from '../multiuse'
// import { NumberHelper } from "../numbers";
import { Validator } from "../../";

export function map<T extends any>(
  array: T[],
  iteratee: (value: T, index: number, array: T[]) => void,
) {
  let index = -1;
  const length = array == null ? 0 : array.length;
  const result: any[] = new Array<T>(length);

  while (++index < length)
  {
    result[index] = iteratee(array[index], index, array);
  }
  return result as T[];
}

function last<T extends any>(array: T[]) {
  const length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}
export type ReadOnlyArray = readonly any[];


export class ArrayHelper {
  /**
   * Returns a shuffle version of the array
   * @param array
   * @complexity O(n)
   */
  static shuffle<T>(array: T[]): T[] {
    array = array.slice();

    function getRandomInt(from = 0, upTo = 100): number {
      return from + Math.floor(Math.random() * (upTo - from));
    }
    for (let i = 0; i < array.length; i++)
    {
      const randomIndex = getRandomInt(i, array.length) as number;
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }

    return array;
  }

  /**
   * Returns a new array with all data in reverse. [1,2] => [2,1]
   * @param arr array to reverse
   */
  static reverseArray<T extends any>(arr: T[]) {
    const unmutated = ArrayHelper.deepCopy(arr);
    const output = [];
    while (unmutated.length)
    {
      output.push(unmutated.pop());
    }

    return output;
  }

  //return type [...T, ...U] only supported in TS v.4.0.0 BETA. need to add once stable version is out.
  // static concat<T extends ReadOnlyArray, U extends ReadOnlyArray>(arr1: T, arr2: U): [...T, ...U] {
  static concat<T extends ReadOnlyArray, U extends ReadOnlyArray>(arr1: T, arr2: U) {
    return [...arr1, ...arr2];
  }

  /**
   * Returns a new array without mutating the original
   * @param arr array to copy
   */
  static deepCopy<T extends ReadOnlyArray>(arr: T): T {
    return deepCopy(arr)
  }

  /**
   * Gets the last element of array.
   * @param array 
   */
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
   * Creates a function to map an array with a determined callback
   * @param cb callback function to map the array.
   * @example
   * const toUpper = (s:string) => s.toUpperCase()
   * const mapToUpper = ArrayHelper.createMap(toUpper)
   * console.log(mapToUpper(["i", "Love", "js"])) // [ 'I', 'LOVE', 'JS' ]
   */
  static createMap<T, U>(cb: (value: T, index: number, array: T[]) => U) {
    return (arr: Array<T>) => arr.map(cb);
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
    const unmutated = ArrayHelper.deepCopy(array);
    return [
      unmutated.splice(0, unmutated.length / 2),
      unmutated.splice(unmutated.length / 2 - 1),
    ];
  }

  /**
 * Sorts the array from least to greatest.
 * [uses recursion]
 * @param inputArr T array
 * @param  comparefn?: function to decide how to sort. Example: (v1,v2) => v1 < v2.
 * https://www.toptal.com/developers/sorting-algorithms
 * @example
    const testData = [4, 8, -5, -6, 2, 1, 5, 3000, 1000, 200, 7, 6, 3];
    const p = quickSort(testData);
    console.log(p); // [ -6, -5, 1, 2, 3, 4, 5, 6, 7, 8, 200, 1000, 3000 ]
 */
  static quickSort<T>(
    inputArr: T[],
    {
      left = 0,
      right = inputArr.length - 1,
      compare = (v1: T, v2: T) => v1 < v2,
    } = {
        left: 0,
        right: inputArr.length - 1,
        compare: (v1: T, v2: T) => v1 < v2,
      },
  ): T[] {
    if (left < right)
    {
      let pivotIndex = ArrayHelper._pivot(inputArr, left, compare);
      ArrayHelper.quickSort(inputArr, { left, right: pivotIndex - 1, compare });
      ArrayHelper.quickSort(inputArr, { left: pivotIndex + 1, right, compare });
    }
    return inputArr;

    /*****************************
      ALTERNATIVE IMPLEMENTATION.
    *************************** */
    // if (inputArr.length < 2) return inputArr;
    // const pivotIndex = inputArr.length -1
    // const pivot = inputArr[pivotIndex];
    // const leftArr = [];
    // const rightArr = [];
    // let compare = comparefn || function (v1: T, v2: T) {
    //   return v1 < v2;
    // };

    // for (let i = 0; i < pivotIndex; i++) {
    //   const current = inputArr[i];
    //   if (compare(current, pivot)) {
    //     leftArr.push(current);
    //   } else {
    //     rightArr.push(current);
    //   }
    // }
    // return [...ArrayHelper.quickSort(leftArr, compare), pivot, ...ArrayHelper.quickSort(rightArr, compare)];
  }

  private static _pivot<T>(
    arr: T[],
    startI: number = 0,
    compare = (v1: T, v2: T) => v1 < v2,
  ) {
    let pivot = arr[startI];
    let swapIdx = startI;
    //   for (let i = startI + 1; i < endI +1; i++) {
    for (let i = startI + 1; i < arr.length; i++)
    {
      if (compare(pivot, arr[i]))
      {
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
    const unmutated = ArrayHelper.deepCopy(arr)

    const chunked: any[][] = [];
    let index = 0;

    while (index < unmutated.length)
    {
      chunked.push(unmutated.slice(index, index + size));
      index += size;
    }

    return chunked;
  }

  static fillEmptyArray = <T>(value: T | T[]): undefined[] | undefined =>
    Validator.isArray(value) ? Array(value.length).fill(undefined) : undefined;

  static insert<T>(data: T[], index: number): (T | undefined)[];
  static insert<T>(
    data: T[],
    index: number,
    value: T | T[],
  ): T[];
  static insert<T>(
    data: T[],
    index: number,
    value?: T | T[],
  ): (T | undefined)[] {
    return [
      ...data.slice(0, index),
      ...(Validator.isArray(value) ? value : [value || undefined]),
      ...data.slice(index),
    ];
  }

  /**
   * Sorts an array using insertion Sort. Only recommended for nearly sorted data.
   * use quickSort if the array is not randomly sorted.
   * https://www.toptal.com/developers/sorting-algorithms
   * @timeComplexity O(n^2)
   * @param arr Array
   */
  static insertionSort<T extends any>(
    arr: T[],
    compare = (n1: T, n2: T) => n1 > n2,
  ) {
    for (let i = 1; i < arr.length; i++)
    {
      const current = arr[i];
      for (let j = i - 1; j >= 0 && compare(arr[j], current); j--)
      {
        ArrayHelper.swap(arr, j + 1, j);
      }
    }

    return arr;
  }

  static prepend<T>(data: T[]): (T | undefined)[];
  static prepend<T>(data: T[], value: T | T[]): T[];
  static prepend<T>(
    data: T[],
    value?: T | T[],
  ): (T | undefined)[] {
    return [
      ...(Validator.isArray(value) ? value : [value || undefined]),
      ...data,
    ];
  }

  static unique = <T extends any>(value: T[]) => value.filter(Boolean);
  static removeAtIndexes<T>(data: T[], index: number[]): T[] {
    let k = -1;

    while (++k < data.length)
    {
      if (index.indexOf(k) >= 0)
      {
        delete data[k];
      }
    }

    return ArrayHelper.unique(data);
  }

  static moveArrayAt = <T>(
    data: T[],
    from: number,
    to: number,
  ): (T | undefined)[] => {
    if (Validator.isArray(data))
    {
      if (Validator.isUndefined(data[to]))
      {
        data[to] = undefined as any;
      }
      data.splice(to, 0, data.splice(from, 1)[0]);
      return data;
    }

    return [];
  };

  static removeArrayAt = <T>(data: T[], index?: number | number[]): T[] =>
    Validator.isUndefined(index)
      ? []
      : Validator.isArray(index)
        ? ArrayHelper.removeAtIndexes(data, index)
        : ArrayHelper.removeAt(data, index);

  static removeAt<T>(data: T[], index: number): T[] {
    return [
      ...data.slice(0, index),
      ...data.slice(index + 1),
    ];
  }

  static swapArrayAt = <T>(
    data: T[],
    indexA: number,
    indexB: number,
  ): void => {
    const temp = [data[indexB], data[indexA]];
    data[indexA] = temp[0];
    data[indexB] = temp[1];
  };
  /**
   * Swaps values in the array determined by the indexes passed to the function.
   * doesnt return a new array. just makes changes to the array that was passed.
   * if you want a new array to be returned please use ArrayHelper.move
   * @param arr array be be swapped.
   * @param idx1 target index
   * @param idx2 index to be swapped with target index
   */
  static swap<T>(arr: Array<T>, idx1: number, idx2: number): void {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    //ES5
    //   let temp = arr[idx1];
    //   arr[idx1] = arr[idx2];
    //   arr[idx2] = temp;
  }

  /**
   * Moves the item in the array from position 'from' to position 'to'.
   * @returns void and mutates the array in place.
   * @param array array to mutate
   * @param from index from 
   * @param to index to
   */
  static arrayMoveMutate<T extends Array<any>>(array: T, from: number, to: number) {
    const startIndex = to < 0 ? array.length + to : to;

    if (startIndex >= 0 && startIndex < array.length)
    {
      const item = array.splice(from, 1)[0];
      array.splice(startIndex, 0, item);
    }
  }

  /**
   * Swaps values in the array determined by the indexes passed to the function.
   * returns a new array with the values swapped and doesnt mutate the original array.
   * @param array array to move
   * @param from index from
   * @param to index to
   */
  static move<T>(array: T[], from: number, to: number) {
    array = ArrayHelper.deepCopy(array)
    ArrayHelper.arrayMoveMutate(array, from, to);
    return array;
  }

  static isArray<T extends any>(arg: any): arg is Array<T> {
    return Validator.isArray(arg)
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
    if (a instanceof Array && b instanceof Array)
    {
      if (a.length !== b.length)
      {
        // assert same length
        return false;
      }
      for (var i = 0; i < a.length; i++)
      {
        // assert each element equal
        if (!ArrayHelper.arraysEqual(a[i], b[i]))
        {
          return false;
        }
      }
      return true;
    } else
    {
      return JSON.stringify(a) === JSON.stringify(b); // if not both arrays, should be the same
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

    for (const n of arr)
    {
      maxDigits = Math.max(ArrayHelper.digitCount(n), maxDigits);
    }
    return maxDigits;
    //this would do it but we iterate twice on the array. one for the map and another one spreading the array into Math.max
    //the one on top only goes one time by the array
    //   return Math.max(...arr.map((d) => digitCount(d)));
  }

  private static merge<T>(
    leftArr: T[] = [],
    rightArr: T[] = [],
    compare = (value1: T, value2: T) => value1 > value2,
  ): T[] {
    let leftI = 0;
    let rightI = 0;
    let result = [];
    while (leftI < leftArr.length && rightI < rightArr.length)
    {
      if (
        compare(leftArr[leftI], rightArr[rightI])
      )
      {
        result.push(rightArr[rightI]);
        rightI++;
      } else
      {
        result.push(leftArr[leftI]);
        leftI++;
      }
    }
    while (leftI < leftArr.length)
    {
      result.push(leftArr[leftI]);
      leftI++;
    }
    while (rightI < rightArr.length)
    {
      result.push(rightArr[rightI]);
      rightI++;
    }
    return result;
  }

  /**
   * Sort array in asc order using merge-sort
   * @example
   *    ArrayHelper.mergeSort([3, 2, 1]) => [1, 2, 3]
   *    ArrayHelper.mergeSort([3]) => [3]
   *    ArrayHelper.mergeSort([3, 2]) => [2, 3]
   * @param {array} array
   * @param compareFn function to decide whether to change how the array is sorted.
   * @timecomplexity O(n log n)
   * @example
   * console.log(
   * ArrayHelper.mergeSort(
   * ["A", "Z", "B", "a", "b", "D", "H", "G"],
   *     function compare(value1, value2) {
   *     return value1.toLowerCase() >= value2.toLowerCase();
   *     },
   * ),
   * ) // ["a", "A", "b", "B", "D", "G", "H", "Z"]
   */
  static mergeSort<T extends any>(
    array: T[] = [],
    compare = (value1: T, value2: T) => value1 > value2,
  ): T[] {
    // base case
    if (array.length <= 1)
    {
      return array;
    }
    // slit and merge
    const mid = Math.floor(array.length / 2);
    const left = ArrayHelper.mergeSort(array.slice(0, mid), compare);
    const right = ArrayHelper.mergeSort(array.slice(mid), compare);
    return ArrayHelper.merge(left, right, compare);
  }

  /**
   * Creates an gererator that goes back and forth over the array returning a tupple.
   * @param array 
   * @example
   * const iter = ArrayHelper.getBackAndForthIterator([1, 2, 3, 4]);
   * for (let [front,back] of iter) {
   *    console.log(front, back); //1 4, 2 3, 3 2, 4 1
   *  }
   */
  static *getBackAndForthIterator<T>(array: T[]): Generator<[T, T]> {
    let i = array.length;
    let start = 0;
    while (i > 0)
    {
      yield [array[start++], array[--i]];
    }
  }

  /**
   *  Creates an iterator in reverse order of the array.
   * @param array array to turn into reverse iterator
   * @example
   * const iter = ArrayHelper.createReverseArrayIterator([1, 2, 3, 4]);
    for (let i of iter) {
      console.log(i);// 4,3,2,1
    }
   */
  static *createReverseArrayIterator<T>(array: T[]) {
    let i = array.length;
    while (i > 0)
    {
      yield array[--i];
    }
  }
  // static createReverseArrayIterator<T>(array: T[]) {
  //   let i = array.length;
  //   return {
  //     next: () => ({
  //       value: array[--i],
  //       done: i < 0,
  //     }),
  //     [Symbol.iterator]() {
  //       return {
  //         next: () => ({
  //           value: array[--i],
  //           done: i < 0,
  //         }),
  //       };
  //     },
  //   };
  // }
}

// const { reverseArray, splitArray, chunkArr } = ArrayHelper
// const testArr = [1, 2, 3, "data", null]
// console.log(splitArray(testArr))
// console.log(reverseArray(testArr))
// console.log(chunkArr(testArr, 2))

// console.log(
//   ArrayHelper.mergeSort(
//     [
//       { name: "A" },
//       { name: "B" },
//       { name: "Z" },
//       { name: "D" },
//       { name: "F" },
//       { name: "Y" },
//     ],
//     function compare(value1, value2) {
//       return value1.name.toLowerCase() < value2.name.toLowerCase();
//     },
//   ),
// ); // [ 'A', 'B', 'D', 'G', 'H', 'b', 'Z', 'a' ]
