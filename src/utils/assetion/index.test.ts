import {
  AssertionError,
  assert,
  assertIsString,
  assertNever,
  forceString,
} from "./index"
describe.skip("AssertionError", () => {
  it("Returns an error with the message", () => {
    const error = new AssertionError("message")
    expect(error.message).toBe("message")
    expect(error.name).toBe("AssertionError")
  })
})

describe.skip("assert", () => {
  it("Asserts the condition or throws error", () => {
    const n = 1
    function assertGood() {
      assert(typeof n === "number")
    }
    expect(assertGood).not.toThrowError()
  })
  it("Throws error when the condition it not met", () => {
    const n = null
    function asserBad() {
      assert(typeof n === "number", "Expected String")
    }
    expect(asserBad).toThrowError()
  })
})

describe.skip("assertIsString", () => {
  it("Asserts that is typeof string or throws error", () => {
    const message = ""
    function assertGood() {
      assertIsString(message)
    }
    expect(assertGood).not.toThrowError()
  })
  it("Throws error when the condition it not met", () => {
    const message = null
    function asserBad() {
      assertIsString(message)
    }
    expect(asserBad).toThrowError()
  })
})

describe.skip("assertNever", () => {
  it("Doesnt throw error when type will be never", () => {
    function assertGood() {
      const message = 1
      if (message === 1) {
        return
      }
      assertNever(message)
    }
    expect(assertGood).not.toThrowError()
  })
  it("Throws error when type is not never", () => {
    function asserBad() {
      const message: unknown = "Hello"
      //@ts-ignore
      //@ts-expect-error
      assertNever(message)
    }
    expect(asserBad).toThrowError()
  })
})

describe.skip("forceString", () => {
  it("Doesnt throw error when type is string", () => {
    function assertGood() {
      const s = "string"
      forceString(s)
    }
    const s = "string"
    const isString = forceString(s)
    expect(assertGood).not.toThrowError()
    expect(isString).toBeTruthy()
  })
  it("Throws error when type is not string", () => {
    function asserBad(message: any) {
      forceString(message)
      message.trim()
    }
    expect(asserBad.bind(null, 1)).toThrowError()
  })
})
