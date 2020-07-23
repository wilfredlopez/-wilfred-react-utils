/**
 * Custom Error for type checking
 */
export class AssertionError extends Error {
  constructor(text?: string) {
    super(text);
    this.name = "AssertionError";
    if (process.env.NODE_ENV !== "test") {
      console.error("AssertionError:", text);
    }
  }
}

/**
 * Usefull for switch cases. where we need to make sure all the cases are being met.
 * If the condition has a posibility to be reached. it will throw an AssertionError.
 * @param _condition should be a value that should never be reached by the code.
 * @param msg Output message in the console.
 */
export function assertNever(
  _condition: never,
  msg?: string,
): asserts _condition {
  throw new AssertionError(msg);
}

/**
 * asserts that a condition is met.
 * @param condition the condition to be met. for example typeof message === 'string'
 * @param msg message to be logged in the console.
 * @example
 * function sendMessage(message:any) {
      assert(typeof message === "string")
      sendApiRequest(message)
    }
 */
export function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new AssertionError(msg);
  }
}

export type TypeOfConditions =
  | "bigint"
  | "boolean"
  | "function"
  | "number"
  | "object"
  | "string"
  | "symbol"
  | "undefined";
export function isTypeof(value: any, condition: TypeOfConditions): boolean {
  return typeof value === condition;
}

export function isString(arg: any): arg is string {
  return typeof arg === "string";
}

export function isBoolean(val: any): val is boolean {
  return (
    val instanceof Boolean ||
    val === true ||
    val === false ||
    typeof val === "boolean"
  );
}
export function isNumber(arg: any): arg is number {
  return typeof arg === "number";
}

export function isArray<T extends any>(arg: any): arg is Array<T> {
  return arg instanceof Array;
}
export function isFunction<T extends Function>(arg: any): arg is T {
  return typeof arg === "function";
}

export function isUndefined(arg: any): arg is undefined {
  return typeof arg === "undefined";
}

export function isNullOrUndefined(arg: any): arg is undefined {
  return typeof arg === "undefined" || arg === null;
}
export function isObject(arg: any): arg is object {
  return typeof arg === "object";
}

/**
 * asserts the value is a string. Will throw an error if that is not the case.
 * @param val the value expected to be string
 * @example
 * function sendMessage(message:any) {
      assertIsString(message)
      message.trim()
    }
 */
export function assertIsString(val: any): asserts val is string {
  const isString = (typeof val === "string" || val instanceof String);

  if (!isString) {
    let invalidType;
    if (val === null) {
      invalidType = "null";
    } else {
      invalidType = typeof val;
      if (
        invalidType === "object" && val.constructor &&
        val.constructor.hasOwnProperty("name")
      ) {
        invalidType = val.constructor.name;
      } else {
        invalidType = `a ${invalidType}`;
      }
    }
    // throw new TypeError(`Expected string but received ${invalidType}.`);
    throw new AssertionError(`Expected string but received ${invalidType}.`);
  }
}

/**
 * Returns true when the type is string. or throws an error if not.
 * @param str the expected value to be of type string
 * @example
 * function trimString(message: any) {
    if(forceString(message)){
        assertIsString(message)
        return message.trim()
    }
  }
 */
export function forceString(str: string) {
  assertIsString(str);
  return true;
}
