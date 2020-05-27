export type ParametersOf<T> = T extends (...args: infer T) => any ? T : never

/**
 * Takes a function an returns a memoized version of it.
 * It would cache the results and make it faster if its called repeatedly.
 * @param fn function to memoize.
 * @example
 * 
let fib = (n: number): number => {
  if (n <= 2) return 1
  return fib(n - 1) + fib(n - 2)
}
fib = memoizeSimple(fib)
console.log(fib(20)) //6765
console.log(fib(50)) //12586269025
//Depending on the parameters, 
//without the memoized version this would crash 
//the browser or the program.
 */
export function memoizeSimple<
  T extends (...args: any[]) => ReturnType<T>,
  A extends ParametersOf<T>
>(fn: T): (...args: A) => ReturnType<T> {
  const cache: any = {}

  return function (this: T, ...args: A) {
    if (cache[args]) {
      return cache[args]
    }

    const results: ReturnType<T> = fn.apply<T, A, ReturnType<T>>(this, args)
    cache[args] = results
    return results
  }
}

// let fib = (n: number): number => {
//   if (n <= 2) return 1
//   return fib(n - 1) + fib(n - 2)
// }

// fib = memoizeSimple(fib)

// console.log(fib(20))
// console.log(fib(50))

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *let fib = (n: number): number => {
 *if (n <= 2) return 1;
 *  return fib(n - 1) + fib(n - 2);
 * };
 *
 * fib = memoize(fib);
 *
 * console.log(fib(20)); //6765
 * console.log(fib(30)); //832040
 * console.log(fib.cache); // Map { 2 => 1, 1 => 1, ...}
 *
 * @example
 * function add(a: number, b: number) {
 *   return a + b;
 * }
 * const adder = memoize(
 *   add,
 *   (...args: number[]) => args.map((arg) => arg + "_").join(),
 * );
 * console.log(adder(12, 13)); //25
 * console.log(adder(12, 12)); // 24
 * console.log(adder(12, 12)); // 24
 * console.log(adder(1, 2)); // 3
 * console.log(adder.cache); //Map { '12_,13_' => 25, '12_,12_' => 24, '1_,2_' => 3 }
 */
export function memoize<
  T extends (...args: any[]) => ReturnType<T>,
  A extends ParametersOf<T>
>(
  func: T,
  resolver?: (...args: A) => any,
): { (...args: A): ReturnType<T>; cache: Map<A, ReturnType<T>> } {
  if (
    typeof func !== "function" ||
    (resolver != null && typeof resolver !== "function")
  ) {
    throw new TypeError("Expected a function")
  }
  const memoized = function (...args: A) {
    const key: A = resolver ? resolver.apply(memoize, args) : args[0]
    const cache = memoized.cache

    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = func.apply(memoize, args)
    memoized.cache = cache.set(key, result) || cache
    return result
  }
  memoized.cache = new (memoize.Cache || Map)()
  return memoized
}

memoize.Cache = Map

// function add(a: number, b: number) {
//   return a + b
// }
// const adder = memoize(add, (...args: number[]) =>
//   args.map((arg) => arg + "_").join(),
// )
// console.log(adder(12, 13)) //25
// console.log(adder(12, 12)) // 24
// console.log(adder(12, 12)) // 24
// console.log(adder(1, 2)) // 3
// console.log(adder.cache) //Map { '12_,13_' => 25, '12_,12_' => 24, '1_,2_' => 3 }

// let fib = (n: number): number => {
//   if (n <= 2) return 1;
//   return fib(n - 1) + fib(n - 2);
// };

// fib = memoize(fib);

// console.log(fib(20));
// console.log(fib(30));
// console.log(fib.cache);
