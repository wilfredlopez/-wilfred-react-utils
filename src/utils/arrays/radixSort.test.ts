import { radixSort } from "./radixSort"

describe("radixSort", () => {
  it("sorts lol", () => {
    const data = radixSort([29, 300, 500, 20])
    expect(data).toStrictEqual([20, 29, 300, 500])
  })
})
