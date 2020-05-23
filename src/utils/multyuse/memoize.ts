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

fib = memoize(fib)
console.log(fib(20)) //6765
console.log(fib(50)) //12586269025
//Depending on the parameters, 
//without the memoized version this would crash 
//the browser or the program.
 */
export const memoize = <
  T extends (...args: any[]) => ReturnType<T>,
  A extends ParametersOf<T>
>(
  fn: T,
): ((...args: A) => ReturnType<T>) => {
  const cache: any = {}

  return (...args: A) => {
    if (cache[args]) {
      return cache[args]
    }
    const results: ReturnType<T> = fn.apply(this, args)
    cache[args] = results
    return results
  }
}
