/**
 * Creates an array of values by running each element of `array` thru `iteratee`.
 * The iteratee is invoked with three arguments: (value, index, array).
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * map([4, 8], square)
 * // => [16, 64]
 */
export function map<T extends any>(
  array: T[],
  iteratee: (value: T, index: number, array: T[]) => void,
) {
  let index = -1;
  const length = array == null ? 0 : array.length;
  const result: any[] = new Array<T>(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result as T[];
}
