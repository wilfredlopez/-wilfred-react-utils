import { mostDigits, getDigit } from "./util";

/**
 * Sorts a number array
 * @param arr number array
 * @complexity O(nk)
 */
export function radixSort(arr: number[]) {
  const maxDigit = mostDigits(arr);
  for (let k = 0; k < maxDigit; k++) {
    const buckets = Array.from({ length: 10 }, () => [] as number[]);
    for (let i = 0; i < arr.length; i++) {
      const digit = getDigit(arr[i], k);
      buckets[digit].push(arr[i]);
    }
    arr = ([] as number[]).concat(...buckets);
  }
  return arr;
}
