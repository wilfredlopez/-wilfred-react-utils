export { memoize, memoizeSimple } from "./memoize";
export { BubleSorter } from "./BubleSorter";
export { default as Comparator } from "./Comparator";
export { default as StopWatch } from "./StopWatch";
export { default as Stream } from "./Stream";

/**
 * Doesnt allow the function to execute more than 1 before the threshold is met. like a debounce function.
 * @param fn 
 * @param threshhold delay amount in ms
 * @param scope the this scope
 * @example
 * $('body').on('mousemove', throttle(function (event) {
  console.log('tick');
}, 1000));
 */
export function throttle<T extends Function>(
  fn: T,
  threshhold: number = 250,
  scope?: any,
) {
  threshhold || (threshhold = 250);
  let last: number, deferTimer: NodeJS.Timeout;
  return function () {
    var context: Window | any = scope || window; // this was actually "this"

    var now = +new Date(),
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

export const pipe = <R>(...fns: Array<(...a: any[]) => R>) =>
  fns.reduce((prevFn, nextFn) =>
    (value: R, ...rest: any[]) =>
      nextFn(
        prevFn(value, rest),
        rest,
      )
  );

// export const compose = (fn1: (a: any) => any, ...fns: Array<(a: any) => any>) =>
//   fns.reduce((prevFn, nextFn) => (value) => prevFn(nextFn(value)), fn1);
// export function compose<R, A>(
//   fn1: (a: A) => R,
//   ...fns: Array<(a: A) => R>
// ): (a:A)=> R;
// export function compose<R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) {
//   return fns.reduce((prevFn, nextFn) => (value) => prevFn(nextFn(value)), fn1);
// }

/**
 * Returns a function composed of the functions passed as the parameters.
 * @param fn1 first function
 * @param fns all other functions. 
 * @example
 * const repeat = (x: string, number: number = 2) => `${x} `.repeat(number);
 * const scream = (x: string) => `${x.toUpperCase()}`;
 * const exclaim = (x: string) => `${x}!`;
 * const sayit = compose(repeat, exclaim, scream);
 * console.log(sayit("Wil", 4)); //  WIL! WIL! WIL! WIL!
 * 
 */
export function compose<
  R extends any[],
  C extends any,
  B extends ReturnType<any>,
>(
  fn1: (...a: R) => B,
  ...fns: Array<(a: B) => C>
) {
  return fns.reduceRight(
    (prevFn, nextFn) =>
      (value: B, ...rest: any[]) =>
        prevFn(
          nextFn(
            value,
            //@ts-ignore
            rest,
          ),
          rest,
        ),
    fn1 as any,
  ) as (a: B, ...rest: any[]) => B;
}

/**
 * finds if there are dupplicates in the arguments passed.
 * @returns {boolean} returns true or false using regular javascript comparison. objects will be the same only if they point to the same reference in memory.
 * @param  { ...any } args 
 * @example
 * console.log(areThereDuplicates(1, 2, 3)); // false
 * console.log(areThereDuplicates(1, 2, 3, 2)); // true
 * console.log(areThereDuplicates("name", "name", "noName")); // true
 * console.log(areThereDuplicates(true, false, true)); // true
 * const arr = [true, false, true];
 * console.log(areThereDuplicates(arr, arr)); // true
 * console.log(areThereDuplicates([1], [1])); // false
 * const obj = { name: "wil" };
 * console.log(areThereDuplicates({ name: "wil" }, { name: "wil" })); // false
 * console.log(areThereDuplicates(obj, obj)); // true
 * 
 */
export function areThereDuplicates(...args: any[]) {
  //One Liner Solution
  return new Set(arguments).size !== arguments.length;
  // Two pointers
  //   args.sort((a, b) => a > b);
  //   let start = 0;
  //   let next = 1;
  //   while (next < args.length) {
  //     if (args[start] === args[next]) {
  //       return true;
  //     }
  //     start++;
  //     next++;
  //   }
  //   return false;
}
