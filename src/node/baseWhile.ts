function slice<T>(array: T[], start: number, end: number): T[] {
  let length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  start = start == null ? 0 : start
  end = end === undefined ? length : end

  if (start < 0) {
    start = -start > length ? 0 : length + start
  }
  end = end > length ? length : end
  if (end < 0) {
    end += length
  }
  length = start > end ? 0 : (end - start) >>> 0
  start >>>= 0

  let index = -1
  const result = new Array<T>(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}
/**
 * The base implementation of methods like `dropWhile` and `takeWhile`.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the slice of `array`.
 */
export function baseWhile<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => void,
  isDrop: boolean,
  fromRight: boolean
): T[] {
  const { length } = array
  let index = fromRight ? length : -1

  while (
    (fromRight ? index-- : ++index < length) &&
    predicate(array[index], index, array)
  ) {}

  return isDrop
    ? slice(array, fromRight ? 0 : index, fromRight ? index + 1 : length)
    : slice(array, fromRight ? index + 1 : 0, fromRight ? length : index)
}
