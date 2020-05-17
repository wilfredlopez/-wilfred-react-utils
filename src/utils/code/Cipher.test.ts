import { Cipher } from "./Cipher"

const PASSWORD = "MyPassword"
const decoder = Cipher.Decoder(PASSWORD)
const encoder = Cipher.Encoder(PASSWORD)
describe("Cipher", () => {
  describe("Cipher.Encoder", () => {
    it("encodes", () => {
      const secret = encoder("Wilfred")
      expect(secret).not.toBe("Wilfred")
    })
  })
  describe("Cipher.Decoder", () => {
    it("encodes", () => {
      const secret = encoder("Wilfred")
      const decoded = decoder(secret)
      expect(decoded).toBe("Wilfred")
    })
  })
})
