import { swap } from "./util";

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
export function quickSort(
  inputArr: any[],
  left = 0,
  right = inputArr.length - 1,
) {
  if (left < right) {
    let pivotIndex = pivot(inputArr, left, right);
    quickSort(inputArr, left, pivotIndex - 1);
    quickSort(inputArr, pivotIndex + 1, right);
  }
  return inputArr;
}

function pivot(arr: any[], startI: number = 0, endI: number = arr.length + 1) {
  let pivot = arr[startI];
  let swapIdx = startI;
  //   for (let i = startI + 1; i < endI +1; i++) {
  for (let i = startI + 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }
  swap(arr, startI, swapIdx);
  return swapIdx;
}
