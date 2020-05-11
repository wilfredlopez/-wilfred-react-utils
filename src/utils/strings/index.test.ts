import { reduceLongString } from "./index"

describe("reduceLongString", () => {
  it("returns the same string if its less than the maxLength", () => {
    const str = "hello"
    const s = reduceLongString(str, 10)
    expect(s).toEqual(str)
  })
  it("returns the string with ... at the end when its more than the maxLength", () => {
    const str = "hello world"
    const s = reduceLongString(str, 10)
    expect(s).toEqual("hello w...")
  })
})
