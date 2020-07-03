export type ComparatorFunction<T> = (a: T) => boolean;
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
 * 
 * @example
 * interface User {
 *   name: string;
 *   email: string;
 * }
 * const userComparator = new Comparator<{ user: User; otherUser: User }>((
 *   { user, otherUser },
 *   ) => user.name === otherUser.name && user.email === otherUser.email);
 * const user1 = {
 * email: "email.com",
 * name: "wilfred"
 * };
 * console.log(userComparator.test(
 *    { user: user1, otherUser: 
 *    { email: "email.com", name: "wilfred" } })); //true;
 * console.log(userComparator.test(
 *    { user: user1, otherUser: 
 *    { email: "other", name: "some" } })); //false;
 * 
 */
export default class Comparator<T> {
  /**
       * Evaluates this comparator on the given argument.
       *
       * @param {T} t the input argument
       * @returns {boolean} boolean
  */
  test: ComparatorFunction<T>;

  constructor(test: Comparator<T>);
  constructor(test: ComparatorFunction<T>);
  constructor(test: Comparator<T> | ComparatorFunction<T>) {
    if (test instanceof Comparator) {
      this.test = test.test;
    } else {
      this.test = test;
    }
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
  and(other: Comparator<T>): Comparator<T>;
  and(other: ComparatorFunction<T>): Comparator<T>;
  and(other: Comparator<T> | ComparatorFunction<T>) {
    if (other instanceof Comparator) return this._and(other);
    const comp = new Comparator(other);
    return this._and(comp);
  }

  private _and(other: Comparator<T>) {
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
  or(other: Comparator<T>): Comparator<T>;
  or(other: ComparatorFunction<T>): Comparator<T>;
  or(other: Comparator<T> | ComparatorFunction<T>) {
    if (other instanceof Comparator) return this._or(other);
    const comp = new Comparator(other);
    return this._or(comp);
  }

  private _or(other: Comparator<T>) {
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

const hasLeftBracket: Comparator<string> = new Comparator<string>((
  str: string,
) => str[0] === "{");
const hasRightBracket: Comparator<string> = new Comparator((str: string) =>
  str[str.length - 1] === "}"
);
const has10Chars: Comparator<string> = new Comparator((str: string) =>
  str.length === 10
);

const isClosed = hasLeftBracket.and(hasRightBracket).or(has10Chars);
console.log(isClosed.test("{short:2{")); //false
console.log(isClosed.test("{short:2}")); //true
console.log(isClosed.test("{number:2{")); //true (because length === 10)
console.log(isClosed.test("{number:2}")); //true

const x = 1;
const y = 2;
const isSameNumber: Comparator<number> = Comparator.isEqual<number>(x);
console.log(isSameNumber.test(x)); // true
console.log(isSameNumber.test(y)); // true

interface User {
  name: string;
  email: string;
}
const userComparator = new Comparator<{ user: User; otherUser: User }>((
  { user, otherUser },
) => user.name === otherUser.name && user.email === otherUser.email);

const user1: User = {
  email: "wil@test.com",
  name: "wilfred",
};

console.log(
  userComparator.test(
    { user: user1, otherUser: { email: "wil@test.com", name: "wilfred" } },
  ),
); //true;
console.log(
  userComparator.test(
    { user: user1, otherUser: { email: "other", name: "some" } },
  ),
); //false;
