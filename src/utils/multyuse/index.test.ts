import { throttle } from "./index"
import { wait } from "@testing-library/react"

describe.skip("Throttle", () => {
  it("creates delay", async () => {
    let i = 0
    function getInt() {
      i++
    }
    const getId = throttle(getInt, 300)
    //call it three times in a row. it shoulnd increment i more than 1 time.
    getId()
    getId()
    getId()
    expect(i).toBe(1)

    await wait(
      () => {
        getId()
        getId()
        expect(i).toBe(2)
      },
      { timeout: 300 },
    )
  })
})
