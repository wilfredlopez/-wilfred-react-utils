/**
 * Custom Error for type checking
 */
export class AssertionError extends Error {
  constructor(text?: string) {
    super(text)
    this.name = "AssertionError"
    if (process.env.NODE_ENV !== "test") {
      console.error("AssertionError:", text)
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
  throw new AssertionError(msg)
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
    throw new AssertionError(msg)
  }
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
  if (typeof val !== "string") {
    throw new AssertionError("Not a string!")
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
  assertIsString(str)
  return true
}
