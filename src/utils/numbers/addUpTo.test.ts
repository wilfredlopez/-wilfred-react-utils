import { addUpTo } from "./index"

describe("addUpTo", () => {
  it("Add the right value in timely matter", () => {
    const to20 = addUpTo(20)
    const to100 = addUpTo(100)
    expect(to20).toBe(210)
    expect(to100).toBe(5050)
  })
  it("handles super large numbers", () => {
    const to9K = addUpTo(9000)
    expect(to9K).toBe(40504500)
  })
})
