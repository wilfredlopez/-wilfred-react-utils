import { ArrayHelper } from "./ArrayHelper"
import { NumberHelper } from "../numbers/NumberHelper"
/**
 * Sorts a number array
 * @param arr number array
 * @complexity O(nk)
 */
export function radixSort(arr: number[]) {
  const maxDigit = ArrayHelper.mostDigits(arr)
  for (let k = 0; k < maxDigit; k++) {
    const buckets = Array.from({ length: 10 }, () => [] as number[])
    for (let i = 0; i < arr.length; i++) {
      const digit = NumberHelper.getDigit(arr[i], k)
      buckets[digit].push(arr[i])
    }
    arr = ([] as number[]).concat(...buckets)
  }
  return arr
}
