import { ArrayHelper } from "./ArrayHelper"

/*******************************************
 * BASIC sort algorithims
 ****************************************/

/**
 * Sorts and array of numbers.
 * @param arr array of numbers.
 * @param type "ASC" | "DES" for assending or desending order
 * @param mutate boolean. determines if the array should be mutated or not. defaults to true
 * @complexity O(n)
 */
export function bubleSort(
  data: Array<number>,
  type: "ASC" | "DES" = "ASC",
  mutate: boolean = true,
) {
  //in order to not mutate the array. this is a performance issue but helps returning a new array
  const arr = mutate ? [...data] : data
  //this helps not go over the entire array if its already sorted should break the loop
  let noSwaps: boolean
  const compare = (j: number) => {
    if (type === "DES") {
      return arr[j] < arr[j + 1]
    } else {
      return arr[j] > arr[j + 1]
    }
  }
  for (let i = arr.length; i > 0; i--) {
    //assume sorted unless there's no swap in the next loop
    noSwaps = true
    for (let j = 0; j < i - 1; j++) {
      if (compare(j)) {
        //   swap(arr, j, j + 1);
        //same as swap function
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        //not sorted yet
        noSwaps = false
      }
    }
    if (noSwaps) break
  }
  return arr
}

// function bubbleSort2(arr: any[]) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < arr.length - 1 - i; j++) {
//       if (arr[j + 1] < arr[j]) {
//         let temp = arr[j + 1]
//         arr[j + 1] = arr[j]
//         arr[j] = temp
//       }
//     }
//   }
//   return arr
// }

/**
 * Sorts and array of numbers
 * Performs better with nearly sorted data and small datasets. not recommended for very unsorted data.
 * @param array
 * @complexity O(n2)
 */
export function insertionSort<T extends string | number>(
  array: T[],
  type: "ASC" | "DES" = "ASC",
): T[] {
  const data = [...array]
  const compare = (j: number, start: T) => {
    if (type === "ASC") {
      return data[j] > start
    } else {
      return data[j] < start
    }
  }
  for (let i = 1; i < data.length; i++) {
    let start = data[i] //second el in the array
    let j = i - 1
    for (j; j >= 0 && compare(j, start); j--) {
      data[j + 1] = data[j]
    }
    data[j + 1] = start
  }

  return [...data]
}

/*******************************************
 * Intermidiate sort algorithims
 * O(n log n) //better than O(n2)
 ****************************************/

export function mergeSort<T extends string | number>(data: T[]): T[] {
  if (data.length <= 1) return data
  //   let mid = Math.floor(data.length / 2);
  //   let left = mergeSort(data.slice(0, mid));
  //   let right = mergeSort(data.slice(mid));
  const [p1, p2] = ArrayHelper.splitArray(data)
  let left = mergeSort(p1)
  let right = mergeSort(p2)
  return mergeArr(left, right)
}

//only works with two sorted arrays
export function mergeArr<T extends any, D extends any>(two: T[], one: D[]) {
  let output = [] as T[] & D[]
  let i = 0
  let j = 0
  while (i < one.length && j < two.length) {
    if (two[j] > one[i]) {
      output.push(one[i])
      i++
    } else {
      output.push(two[j])
      j++
    }
  }

  // break;
  while (i < one.length) {
    output.push(one[i])
    i++
  }
  while (j < two.length) {
    output.push(two[j])
    j++
  }
  return output
}

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
//eslint-disable-next-line
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
