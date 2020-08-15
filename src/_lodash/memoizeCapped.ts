import { memoize } from "./memoize";
// import { ParametersOf } from "../utils/multyuse/memoize";

/** Used as the maximum memoize cache size. */
const MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
export function memoizeCapped<
  T extends (...args: any[]) => ReturnType<T>,
> // A extends ParametersOf<T>,
(func: T) {
  const result = memoize(func, (key: any) => {
    const { cache } = result;

    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  return result;
}
