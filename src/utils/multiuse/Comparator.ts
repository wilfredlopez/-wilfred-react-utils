/**
 * Represents a comparator (boolean-valued function).
 *
 * @param <T> the type of the input to the comparator
 * @see Based on the Predicate interface of java language.
 * @example
 * const hasLeftBracket: Comparator<string> = new Comparator<string>((str: string) =>
 *   str[0] === "{"
 * );
 * const hasRightBracket: Comparator<string> = new Comparator((str: string) =>
 *   str[str.length - 1] === "}"
 * );
 * const has10Chars: Comparator<string> = new Comparator((str: string) =>
 *   str.length === 10
 * );
 * const isClosed = hasLeftBracket.and(hasRightBracket).or(has10Chars);
 * console.log(isClosed.test("{short:2{")); //false
 * console.log(isClosed.test("{short:2}")); //true
 * console.log(isClosed.test("{number:2{")); //true (because length === 10)
 * console.log(isClosed.test("{number:2}")) //true;
 */
export default class Comparator<T> {
  /**
       * Evaluates this comparator on the given argument.
       *
       * @param {T} t the input argument
       * @returns {boolean} boolean
  */
  test: (t: T) => boolean;

  constructor(test: (t: T) => boolean) {
    this.test = test;
  }

  /**
       * Returns a composed comparator that represents a short-circuiting logical
       * AND of this comparator and another.  When evaluating the composed
       * comparator, if this comparator is {@code false}, then the {@code other}
       * comparator is not evaluated.
       *
       * <p>Any exceptions thrown during evaluation of either comparator are relayed
       * to the caller; if evaluation of this comparator throws an exception, the
       * {@code other} comparator will not be evaluated.
       *
       * @param other a comparator that will be logically-ANDed with this
       *              comparator
       * @return a composed comparator that represents the short-circuiting logical
       * AND of this comparator and the {@code other} comparator
       * @throws NullPointerException if other is null
       */
  and(other: Comparator<T>) {
    return new Comparator((t: T) => this.test(t) && other.test(t));
  }

  /**
       * Returns a comparator that represents the logical negation of this
       * comparator.
       *
       * @return a comparator that represents the logical negation of this
       * comparator
       */
  public negate() {
    return new Comparator((t: T) => !this.test(t));
  }

  /**
       * Returns a composed comparator that represents a short-circuiting logical
       * OR of this comparator and another.  When evaluating the composed
       * comparator, if this comparator is {true} , then the {other}
       * comparator is not evaluated.
       *
       *
       * @param other a comparator that will be logically co-related with this
       *              comparator
       * @return a composed comparator that represents the short-circuiting logical
       * OR of this comparator and the {@code other} comparator
       * @throws NullPointerException if other is null
       */
  or(other: Comparator<T>) {
    return new Comparator((t: T) => this.test(t) || other.test(t));
  }

  /**
       * Returns a comparator that tests if two arguments are equal according
       * to strict equality ===.
       *
       * @param {T} targetRef the object reference with which to compare for equality.
       *               
       * @example
       * const x = 1;
       * const y = 2;
       * const isSameNumber = Comparator.isEqual<number>(x);
       * console.log(isSameNumber.test(x)); // true
       * console.log(isSameNumber.test(y)); // true
       * 
       */
  static isEqual<T>(targetRef: T): Comparator<T> {
    return new Comparator(
      targetRef === null
        ? () => targetRef === null
        : (object) => targetRef === object,
    );
  }
}

// const hasLeftBracket: Comparator<string> = new Comparator<string>((
//   str: string,
// ) => str[0] === "{");
// const hasRightBracket: Comparator<string> = new Comparator((str: string) =>
//   str[str.length - 1] === "}"
// );
// const has10Chars: Comparator<string> = new Comparator((str: string) =>
//   str.length === 10
// );

// const isClosed = hasLeftBracket.and(hasRightBracket).or(has10Chars);
// console.log(isClosed.test("{short:2{")); //false
// console.log(isClosed.test("{short:2}")); //true
// console.log(isClosed.test("{number:2{")); //true (because length === 10)
// console.log(isClosed.test("{number:2}")); //true

// const x = 1;
// const y = 2;
// const isSameNumber: Comparator<number> = Comparator.isEqual<number>(x);
// console.log(isSameNumber.test(x)); // true
// console.log(isSameNumber.test(y)); // true
