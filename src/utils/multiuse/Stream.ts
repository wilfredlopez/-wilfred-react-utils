export type NoNever<T> = [T] extends [never] ? undefined : T;

export interface Runner<T> {
  run: (caller: (data: T) => void) => void;
}

/**
 * Gets a function a calls it until the limit is reached.
 * Default limit is the Number.MAX_SAFE_INTEGER;
 * @example
 * const stream = Stream.Generate(() => Math.random());
 *   stream.setLimit(3).forEach().run((n) => {
 *   console.log(n); // 0.9513618349999324, 0.021560365191784392, 0.7923212292766264
 *   });
 * 
 * //OR
 * const LIMIT = 3;
 * const stream2 = new Stream(() => Math.random(),LIMIT);
 *   stream2.forEach().run((n) => {
 *   console.log(n); // 0.9835108734762583
 *   stream2.stop();
 *   });
 */
const INITIAL_LIMIT = 1000;
export default class Stream<T extends any, A extends T> {
  /**
     * STATE
     */
  #limit: number = INITIAL_LIMIT;
  #skip: number | undefined = undefined;
  #count = 0;
  #stoper: (data: T) => boolean = (d) => false;
  private streamer: (...args: Array<NoNever<A>>) => T;

  constructor(
    func: (...args: NoNever<A>[]) => T,
    limit = INITIAL_LIMIT,
  ) {
    this.streamer = func;
    this.#limit = limit;
  }

  /**********************
   * 
   * BLOCKING/TERMINAL METHODS
   * 
   * ********************* */

  /**
   * Returns a promise of array of values.
   * @example
   * const stream3 = Stream.iterate(-1, (n) => n + 1);
   *  stream3.setLimit(10).promise().then((data) => {
   *  console.log(data); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
   *  });
   */
  promise<D extends A>(args?: NoNever<D>): Promise<T[]>;
  promise<D extends A>(...args: NoNever<D>[]) {
    return new Promise<T[]>((resolve, reject) => {
      try {
        const result: T[] = [];
        let stop = false;
        let value: T;
        while (!stop && (this.#count < this.#limit)) {
          if (args && args.length > 0) {
            value = this.streamer(...args);
            args = [value] as NoNever<D>[];
          } else {
            value = this.streamer();
          }
          result.push(value);
          stop = this.#stoper(value);
          this.#count++;
        }

        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        this.reset();
      }
    });
  }

  /**
   * 
   * @param initialArgument 
   * @example
   * const stream3 = Stream.Iterate(-1, (n) => n + 1);
   * let value = 0;
   * stream3.takeWhile(() => value <= 5).forEach().run((d) => {
   * console.log(d); //0, 1, 2, 3, 4, 5 
   * value++;
   * });
   * //Or
   * stream3.setLimit(5).forEach().run((d) => {
   *    console.log(d); //0, 1, 2, 3, 4
   * });
   */
  forEach<D extends A>(
    initialArgument?: D,
  ): Runner<T>;
  forEach<D extends A>(
    initialArgument: NoNever<D> | Array<NoNever<D>>,
  ): Runner<T>;
  forEach<D extends A>(
    //TODO: Need to find a way to make this argument required if the type is not never|undefined
    ...initialArgument: Array<NoNever<D>>
  ): Runner<T> {
    return {
      run: (caller: (data: T) => void) => {
        let stop = false;
        while (!stop && (this.#count < this.#limit)) {
          let value: T;
          if (
            typeof initialArgument !== "undefined" &&
            initialArgument.length > 0
          ) {
            value = this.streamer(...initialArgument);
            initialArgument = [value] as any;
          } else {
            value = this.streamer();
          }
          if (!this.#skip || this.#skip - 1 < this.#count) {
            caller(value);
          }
          stop = this.#stoper(value);
          this.#count++;
        }
        this.reset();
      },
    };
  }

  /**********************
   * 
   * NON BLOCKING METHODS
   * 
   * ********************* */

  /**
   * 
   * @param stopper Function that takes no arguments and returns true or false to stop the iteration.
   * @param initialArgument
   * @example
   * const stream3 = Stream.Iterate(-1, (n) => n + 1);
   * let value = 0;
   * stream3.takeWhile(() => value <= 5).forEach().run((d) => {
   * console.log(d); //0, 1, 2, 3, 4, 5 
   *    value++;
   * });
   */
  takeWhile(
    stopper: (d: NoNever<A>) => boolean,
    initialArgument: NoNever<A> = undefined as NoNever<A>,
  ) {
    this.#stoper = () => !stopper(initialArgument);
    return this;
  }

  /**
   * 
   * @param func callback function
   * @param limit iterations limit. Defaults to Number.MAX_SAFE_INTEGER
   * @returns Stream
   */
  static Generate<T extends any, A extends T>(
    func: (...args: NoNever<A>[]) => T,
    limit?: number,
  ) {
    return new Stream<T, A>(func, limit);
  }

  /**
   * Returns a Stream with a closure over the initial data. 
   * returning the modified initial data on each iteration.
   * @param initialData 
   * @param updaterFunction Function that takes the initial data and returns the same type as the initial data. eg. number => number + 1;
   * @param { Number } limit max iterations. (Optional)
   * @example
   * const stream3 = Stream.iterate(1, (n) => n + 2);
   *  stream3.setLimit(10).forEach().run((d) => {
   *    console.log(d);
   *  });
   */
  static Iterate<T>(
    initialData: T,
    updaterFunction: (arg: T) => T,
    limit?: number,
  ) {
    let data: T = initialData;
    const iter = () => data = updaterFunction(data);
    return new Stream(iter, limit);
  }

  /**
   * 
   * @param stopper 
   * @example
   * function numberGen() {
   *    let n = 0;
   *    return () => n++;
   *  }
   *  const data = ["i", "am", "the", "best!"];
   *  const stream2 = new Stream(numberGen(), data.length);
   *  stream2.takeUntil((d) => data[d] === "the").forEach().run((n) => {
   *    console.log(data[n]); // i, am, the, best!
   *  });
   */
  takeUntil(stopper: (d: T) => boolean) {
    this.#stoper = stopper;
    return this;
  }

  stop() {
    this.#count = Number.MAX_SAFE_INTEGER;
    return this;
  }

  reset() {
    this.#count = 0;
    this.#stoper = (_d) => false;
    this.#skip = undefined;
    return this;
  }

  /**
   * 
   * @param number number to set the limit to. Most be a positive interger greater than 0.
   */
  setSkip(n: number | undefined): Stream<T, A> {
    if (n && n <= 0) {
      this.#skip = undefined;
      return this;
    }
    if (n && n >= Number.MAX_SAFE_INTEGER) {
      throw new Error(
        "Number most not be greater than Number.MAX_SAFE_INTEGER",
      );
    }
    this.#skip = n;
    return this;
  }

  /**
   * 
   * @param number number to set the limit to. Most be a positive interger greater than 0 and less than than Number.MAX_SAFE_INTEGER.
   */
  setLimit(number: number) {
    if (number > Number.MAX_SAFE_INTEGER) {
      throw new Error("Limit most not be greater than Number.MAX_SAFE_INTEGER");
    }
    if (number <= 0) {
      throw new Error("Limit most not be less than or equal to 0");
    }
    this.#limit = number;
    return this;
  }
}

// const stream = Stream.Generate(() => Math.random());
// stream.setLimit(3).forEach().run((n) => {
//   console.log(n); // 0.9513618349999324, 0.021560365191784392, 0.7923212292766264
// });

// stream.setLimit(3).forEach().run((n) => {
//   console.log(n); // 0.9513618349999324, 0.021560365191784392, 0.7923212292766264
//   stream.stop();
// });

// stream.promise().then((n) => {
//   console.log(n); // 0.9513618349999324, 0.021560365191784392, 0.7923212292766264
// });

// const countStream = new Stream((n: number) => n + 1);
// countStream.setLimit(3).promise(1).then((data) => {
//   console.log(data);
// });
// countStream.setLimit(3).forEach(1).run((val) => {
//   console.log(val);
// });

// countStream.takeUntil((d) => d > 10).forEach(1).run((val) => {
//   console.log(val);
// });
// countStream.forEach().run((v)=> {
//     console.log(v)
// }
// function numberGen() {
//   let n = 0;
//   return () => n++;
// }
// const data = ["i", "am", "the", "best!"];
// const stream2 = new Stream(numberGen(), data.length);

// stream2.takeUntil((d) => data[d] === "the").forEach().run((n) => {
//   console.log(data[n]); // i, am, the, best!
// });

// const stream3 = Stream.Iterate(-1, (n) => n + 1);
// stream3.setLimit(10).promise().then((data) => {
//   console.log(data); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
// });
// let value = 0;
// stream3.takeWhile(() => value <= 5).forEach().run((d) => {
//   console.log(d); //0, 1, 2, 3, 4, 5
//   value++;
// });

// stream3.setLimit(5).forEach().run((d) => {
//     console.log(d); //0, 1, 2, 3, 4
//   });
