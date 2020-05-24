import { isIndex } from "./isIndex";
import { baseUnset } from "./baseUnset";
/**
 * The base implementation of `pullAt` without support for individual
 * indexes or capturing the removed elements.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {number[]} indexes The indexes of elements to remove.
 * @returns {Array} Returns `array`.
 */
export function basePullAt<T extends any>(array: T[], indexes: number[]) {
  let length = array ? indexes.length : 0;
  const lastIndex = length - 1;

  while (length--) {
    let previous;
    const index = indexes[length];
    if (length === lastIndex || index !== previous) {
      previous = index;
      if (isIndex(index)) {
        array.splice(index, 1);
      } else {
        baseUnset(array, index as any);
      }
    }
  }
  return array;
}
