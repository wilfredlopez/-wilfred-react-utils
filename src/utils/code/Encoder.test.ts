// import { decode, encode, Encoder } from "./index"
import { Encoder } from "./Encoder"

const encoder = new Encoder("SUNNYDAY")
const GLOBAL_SECRET = "GLOBAL_SECRET_CODE"

describe.skip("Encode and Decode", () => {
  describe("Encode", () => {
    it("encodes the string", () => {
      const value = "I Should Be Encoded. code 5545 ABCDEFGAPQRSTWXYZZZ"
      const encoded = encoder.encode(value, GLOBAL_SECRET)
      expect(encoded).not.toBe(value)
    })
    it("encodes the string with a certain variant", () => {
      const value =
        "Should work as expected and IT Should Be Encoded. code 5545"
      const encoded = encoder.encode(value, GLOBAL_SECRET, 22)
      expect(encoded).not.toBe(value)
    })
  })
  describe("Decode", () => {
    it("Decodes the string", () => {
      const value = "I Should Be Encoded. code 5545 secret: society DotDot END"
      const secret = "secretcode"
      const encoded = encoder.encode(value, secret)
      const decoded = encoder.decode(encoded, secret)
      expect(decoded).toBe(value)
    })
    it("Decodes the string with a certain variant", () => {
      const value =
        "secret code  45321314. please Destroy as soon as you see it. Thanks"
      const encoded = encoder.encode(value, GLOBAL_SECRET, 25)
      const decoded = encoder.decode(encoded, GLOBAL_SECRET, 25)
      expect(decoded).toBe(value)
    })
    it("Thows and error is the variant is not equal to the one used to encode.", () => {
      const value =
        "The world is beautifull and we All know it to be that way bae"
      const encoded = encoder.encode(value, GLOBAL_SECRET, 25)
      expect(encoder.decode.bind(null, encoded, GLOBAL_SECRET, 5)).toThrow()
    })
    it("Decodes multiple line strings", () => {
      const value = `I Love You. 
        forever!`
      const encoded = encoder.encode(value, GLOBAL_SECRET, 10)
      const decoded = encoder.decode(encoded, GLOBAL_SECRET, 10)
      expect(decoded).toBe(value)
    })
    it("Thows error if secret is not valid", () => {
      const value =
        "The world is beautifull and we All know it to be that way bae"
      const encoded = encoder.encode(value, GLOBAL_SECRET, 25)
      expect(
        encoder.decode.bind(null, encoded, "i dont know the secret", 25),
      ).toThrow()
    })
    it("Thows error if variant is not the same", () => {
      const value =
        "The world is beautifull and we All know it to be that way bae"
      const encoded = encoder.encode(value, GLOBAL_SECRET, 25)
      expect(
        encoder.decode.bind(null, encoded, "i dont know the secret", 25),
      ).toThrow()
    })
  })
})
