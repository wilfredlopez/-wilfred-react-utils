import { Stack } from "./Stack"

let stack = new Stack<string>()
describe.skip("Stack", () => {
  beforeEach(() => {
    stack = new Stack<string>()
  })
  it("Starts empty", () => {
    expect(stack.size).toBe(0)
    expect(stack.fist).toBe(null)
    expect(stack.last).toBe(null)
  })
  it("@push Adds to the begining", () => {
    stack.push("WILFRED")
    stack.push("Austria")
    stack.push("Yanna")
    stack.push("Theudy")
    stack.push("Catalina")
    expect(stack.peek().value).toBe("Catalina")
    expect(stack.fist.value).toBe("Catalina")
    expect(stack.last.value).toBe("WILFRED")
  })
  it("Works as an Iterator to use in for of loops.", () => {
    stack.push("WILFRED")
    stack.push("Austria")
    stack.push("Yanna")
    stack.push("Theudy")
    stack.push("Catalina")
    let data = []
    for (const node of stack) {
      data.push(node.value)
    }
    expect(data).toStrictEqual([
      "Catalina",
      "Theudy",
      "Yanna",
      "Austria",
      "WILFRED",
    ])
  })
  it("@pop removes the last element and returns it", () => {
    stack.push("WILFRED")
    stack.push("Austria")
    stack.push("Yanna")
    stack.push("Theudy")
    expect(stack.pop()).toBe("Theudy")
  })
  it("Keeps track to the size", () => {
    stack.push("WILFRED")
    stack.push("Austria")
    stack.push("Yanna")
    stack.push("Theudy")
    expect(stack.size).toBe(4)
    stack.push("Five")
    stack.push("Six")
    stack.push("Seven")
    expect(stack.size).toBe(7)
  })
  it("@get returns the correct node with 0 based index", () => {
    stack.push("ONE")
    stack.push("Two")
    stack.push("Three")
    stack.push("Four")
    stack.push("Five")
    expect(stack.get(2).value).toBe("Three")
  })
})
