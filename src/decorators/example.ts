export {};

export function Timed(name: string) {
  return function (
    target: object,
    key: string,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const start = new Date().valueOf();

      console.time(name);
      const result = original.apply(...args);
      console.timeEnd(name);
      const end = new Date().valueOf();
      console.log(`${name}: ${end - start} ms`);
      return result;
    };
  };
}

class Something {
  @Timed("Do it")
  doit() {
    for (let i = 0; i < 1000000; i++) {}
    return 4;
  }
}

const s = new Something();

export function Log(name = "LOG") {
  return function decorator(
    t: object,
    n: string,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;
    if (typeof original === "function") {
      descriptor.value = function (...args: any[]) {
        console.log(`Arguments for ${name}: ${args}`);
        try {
          const result = original.apply(this, args);
          console.log(`Result from ${name}: ${result}`);
          return result;
        } catch (e) {
          console.log(`Error from ${name}: ${e}`);
          throw e;
        }
      };
    }
    return descriptor;
  };
}

/**
 * Wrapper function to log how much time the function took to complete.
 * @param fn function to log everytime is called.
 * @param log log to console or not. defaults to true.
 * @example
 * const multiply = LogWrapper(function mult(x: number, y: number) {
 *    return x + y;
 *  });
 * 
 * const isDebug = process.env.NODE_ENV === 'debug'
 * const multiplyNoLog = LogWrapper(function nolog(x: number, y: number) {
      return x + y;
    }, isDebug); //passed 2nd parameter to avoid loggin to the console if not in debug mode.

 */
export type ParametersOf<T> = T extends (...args: infer T) => any ? T : never;

export function LogWrapper<
  T extends (...args: any[]) => ReturnType<T>,
  A extends ParametersOf<T>,
>(fn: T, log = true) {
  return function (...args: A) {
    // let start = +new Date();
    if (log) {
      console.time(fn.name);
    }
    let result = fn(...args);
    if (log) {
      console.timeEnd(fn.name);
      //   let message = `${fn.name} took: ${+new Date() - start} ms.`;
      //   if (args.length > 0) {
      //     message += ` With args [${args}].`;
      //   }
      //   console.log(message);
    }

    return result;
  };
}

// const func = LogWrapper(function mult(x: number, y: number) {
//   return x + y;
// }, false);

const fib = LogWrapper(function (n: number) {
  if (n < 0) {
    throw new Error(
      "fibonacci: First argument must be a number greater than zero.",
    );
  }

  if (n <= 2) return 1;
  let arr = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[n];
});

console.log(fib(900));
console.log(fib(900));
console.log(fib(900));

// console.log(fib(10)); //3
