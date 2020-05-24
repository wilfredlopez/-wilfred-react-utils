import { StringHelper } from "./index"
const { reduceLongString, toProperCase } = StringHelper
describe.skip("String Methods", () => {
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
  describe("toProperCase", () => {
    it("returns the same string trimmed and with proper case", () => {
      const str = " hello world 2"
      const properStr = " Hello World 2"
      const s = toProperCase(str)
      expect(s).toEqual(properStr)
    })
    it("works with a single word", () => {
      const str = " hello"
      const properStr = " Hello"
      const s = toProperCase(str)
      expect(s).toEqual(properStr)
    })
    it("works with a multiline word. the output should be trimmed.", () => {
      const str = `hello yo se que si
      es bueno.`
      const properStr = `Hello Yo Se Que Si
      Es Bueno.`

      const s = toProperCase(str)
      expect(s).toEqual(properStr)
    })
  })
})
