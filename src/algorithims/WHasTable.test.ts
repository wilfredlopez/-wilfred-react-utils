import { WHasTable } from "./WHashTable"

let wht: WHasTable | null = null
let totalLength = 30

describe.skip("WHasTable", () => {
  beforeEach(() => {
    //head 20
    wht = new WHasTable(totalLength)
  })
  it("creates a table with the correct length", () => {
    expect(wht.buckets).toBeInstanceOf(Array)
    expect(wht.buckets.length).toBe(totalLength)
    expect(wht.numBuckets).toBe(totalLength)
  })

  describe("@Method hash", () => {
    it('hashes the key"', () => {
      const hashedkey = wht.hash("wilfred")
      expect(hashedkey).toBeLessThanOrEqual(totalLength)
    })
  })
  describe("@Method insert", () => {
    it("inserts to the buckets", () => {
      const value = { title: "el duro" }
      wht.insert("wilfred", value)
      const index = wht.buckets.findIndex((d) =>
        d ? d.key === "wilfred" : null,
      )
      expect(index).not.toBe(-1)
      expect(wht.buckets[index].value).toBe(value)
    })
    it("updates the value if already exist", () => {
      const value = { title: "el duro" }
      const newValue = { title: "el matatan" }
      wht.insert("wilfred", value)
      wht.insert("wilfred", newValue)
      const index = wht.buckets.findIndex((d) =>
        d ? d.key === "wilfred" : null,
      )
      expect(index).not.toBe(-1)
      expect(wht.buckets[index].value).toBe(newValue)
    })
    it("inserts multiple key value pairs", () => {
      const value = { title: "el duro" }
      const secondVal = { title: "el matatan" }
      wht.insert("wilfred", value)
      wht.insert("donald", secondVal)
      const index1 = wht.buckets.findIndex((d) =>
        d ? d.key === "wilfred" : null,
      )
      const index2 = wht.buckets.findIndex((d) =>
        d ? d.key === "donald" : null,
      )
      expect(index1).not.toBe(-1)
      expect(wht.buckets[index1].value).toBe(value)
      expect(wht.buckets[index2].value).toBe(secondVal)
    })
  })
  describe("@Method get", () => {
    it("gets an existing value", () => {
      const value = { title: "el duro" }
      wht.insert("wilfred", value)
      const data = wht.get("wilfred")
      expect(data).toBe(value)
    })
    it("returns null if value is not present", () => {
      const value = { title: "el duro" }
      wht.insert("wilfred", value)
      const data = wht.get("idn")
      expect(data).toBe(null)
    })
  })
  describe("@Method getAllValues", () => {
    it("gets all existing values disregarding the order", () => {
      const value = { title: "el duro" }
      const valueLast = { title: "last val" }
      wht.insert("wilfred", value)
      wht.insert("theudy", value)
      wht.insert("austria", value)
      wht.insert("yanna", valueLast)
      const expected = [value, valueLast, value, value]
      const data = wht.getAllValues()
      expect(data).toStrictEqual(expected)
    })
    // it("returns null if value is not present", () => {
    //   const value = { title: "el duro" }
    //   wht.insert("wilfred", value)
    //   const data = wht.get("idn")
    //   expect(data).toBe(null)
    // })
  })
})
