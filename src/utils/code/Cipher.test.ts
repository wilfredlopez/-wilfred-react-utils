import { Cipher } from "./Cipher"

const PASSWORD = "MyPassword"
const decoder = Cipher.Decoder(PASSWORD)
const encoder = Cipher.Encoder(PASSWORD)

describe("Cipher", () => {
  describe("Cipher.Encoder", () => {
    it("encodes and returns de decoded string", () => {
      const secret = encoder("Wilfred")
      expect(secret).not.toBe("Wilfred")
      expect(typeof secret === "string").toBeTruthy()
    })
    it("encodes different types like array and other objects", () => {
      const secret = encoder([{ name: "secret", data: "data" }])
      const number = encoder(20)
      expect(typeof secret === "string").toBeTruthy()
      expect(typeof number === "string").toBeTruthy()
    })
  })
  describe("Cipher.Decoder", () => {
    it("decodes and returns the correct value", () => {
      const secret = encoder("Wilfred")
      const decoded = decoder(secret)
      expect(decoded).toBe("Wilfred")
    })
    it("decodes an object and returns the parsed object", () => {
      const data = [{ title: "My Title" }, { title: "second title" }]
      const secret = encoder(data)
      const decoded = decoder(secret)
      expect(decoded).toStrictEqual(data)
      expect(Array.isArray(decoded)).toBeTruthy()
    })
    it("Can take a generic type", () => {
      const data = [{ title: "My Title" }, { title: "second title" }]
      const secret = encoder(data)
      const decoded = decoder<{ title: string }[]>(secret)
      expect(decoded).toStrictEqual(data)
      expect(Array.isArray(decoded)).toBeTruthy()
      expect(decoded[0].title).toBe("My Title")
    })
  })
})
