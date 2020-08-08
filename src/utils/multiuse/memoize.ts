export type ParametersOf<T> = T extends (...args: infer T) => any ? T : never;

/**
 * Takes a function an returns a memoized version of it.
 * It would cache the results and make it faster if its called repeatedly.
 * @param fn function to memoize.
 * @example
 * 
 * let fib = (n: number): number => {
 *   if (n <= 2) return 1
 *   return fib(n - 1) + fib(n - 2)
 * }
 * fib = memoizeSimple(fib)
 * console.log(fib(20)) //6765
 * console.log(fib(50)) //12586269025
 * //Depending on the parameters, 
 * //without the memoized version this would crash 
 * //the browser or the program.
 */
export function memoizeSimple<
  T extends (...args: any[]) => ReturnType<T>,
  A extends ParametersOf<T>,
>(fn: T): (...args: A) => ReturnType<T> {
  const cache: { [key: string]: ReturnType<T> } = {};

  return function (this: T, ...args: A) {
    if (cache[args.toString()]) {
      return cache[args.toString()];
    }

    const results: ReturnType<T> = fn.apply<T, A, ReturnType<T>>(this, args);
    cache[args.toString()] = results;
    return results;
  };
}

// let fib = (n: number): number => {
//   if (n <= 2) return 1;
//   return fib(n - 1) + fib(n - 2);
// };

// fib = memoizeSimple(fib);

// console.log(fib(20));
// console.log(fib(50));

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * @param {Function} func The function to have its output memoized.
 * @param {{resolver?: Function, maxCacheSize?:number}} options optional object that takes: 
 * [resolver] The function to resolve the cache key and 
 * [maxCacheSize] cap for the size of the cache. 
 * cache will be cleared by half when max size is reached.
 * @default options {resolver:undefined, maxCacheSize:255}
 * @returns {Function} Returns the new memoized function.
 * @example
 * 
 * const adder = memoize(
 *   function add(a: number, b: number) {
 *     return a + b;
 *   },
 *   {
 *     resolver: (...args: number[]) => args.map((arg) => arg + "_").join(),
 *     maxCacheSize: 255,
 *   },
 * );
 * console.log(adder(12, 13)); //25
 * console.log(adder(12, 12)); // 24
 * console.log(adder(12, 12)); // 24
 * console.log(adder(1, 2)); // 3
 * console.log(adder.cache); //Map { '12_,13_' => 25, '12_,12_' => 24, '1_,2_' => 3 }
 * 
 * const fibMemo = memoize(function (n: number): number {
 *   if (n <= 2) return 1;
 *   return fibMemo(n - 1) + fibMemo(n - 2);
 * });
 * 
 * console.log(fibMemo(20)); //6765
 * console.log(fibMemo(30)); //832040
 * console.log(fibMemo(20)); //6765;
 * console.log(fibMemo(100)); //354224848179262000000
 * console.log(
 *   fibMemo.cache.size, //100
 * );
 */
export function memoize<
  T extends (...args: any[]) => ReturnType<T>,
  A extends ParametersOf<T>,
>(
  func: T,
  { resolver, maxCacheSize = 255 }: {
    resolver?: (...args: A) => any;
    maxCacheSize?: number;
  } = {},
): { (...args: A): ReturnType<T>; cache: Map<A, ReturnType<T>> } {
  if (
    typeof func !== "function"
  ) {
    throw new TypeError(
      `Expected a function but received ${typeof func}`,
    );
  }
  if (
    (typeof resolver !== "undefined" && typeof resolver !== "function")
  ) {
    throw new TypeError(
      `Expected a function as resolver but received ${typeof resolver}`,
    );
  }
  const memoized = function (...args: A) {
    // const key: A = resolver ? resolver.apply(memoize, args) : args[0]; //args 0? or args?
    let key: any = resolver ? resolver.apply(memoize, args) : args;
    key = key.toString() as A;
    const cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    if (cache.size > maxCacheSize) {
      //delete half cached when reached maxCacheSize.
      const half = Math.floor(cache.size / 2);
      for (let i = 0; i < half; i++) {
        cache.delete(cache.keys().next().value);
      }
    }
    const result = func.apply(memoize, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || Map)() as Map<A, ReturnType<T>>;
  return memoized;
}

memoize.Cache = Map;

// const adder = memoize(
//   function add(a: number, b: number) {
//     return a + b;
//   },
//   {
//     resolver: (...args: number[]) => args.map((arg) => arg + "_").join(),
//     maxCacheSize: 255,
//   },
// );
// console.log(adder(12, 13)); //25
// console.log(adder(12, 12)); // 24
// console.log(adder(12, 12)); // 24
// console.log(adder(1, 2)); // 3
// console.log(adder.cache); //Map { '12_,13_' => 25, '12_,12_' => 24, '1_,2_' => 3 }

// const fibMemo = memoize(function (n: number): number {
//   if (n <= 2) return 1;
//   return fibMemo(n - 1) + fibMemo(n - 2);
// });

// console.log(fibMemo(20)); //6765
// console.log(fibMemo(30)); //832040
// console.log(fibMemo(20)); //6765;
// console.log(fibMemo(100)); //354224848179262000000
// console.log(
//   fibMemo.cache.size, //100
// );
