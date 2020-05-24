import { Queue } from "./Queue"

let queue = new Queue<string>()
describe.skip("Queue", () => {
  beforeEach(() => {
    queue = new Queue<string>()
  })
  it("Starts empty", () => {
    expect(queue.size).toBe(0)
    expect(queue.fist).toBe(null)
    expect(queue.last).toBe(null)
  })
  it("@enqueue Adds to the end", () => {
    queue.enqueue("WILFRED")
    queue.enqueue("Austria")
    queue.enqueue("Yanna")
    queue.enqueue("Theudy")
    queue.enqueue("Catalina")
    expect(queue.fist.value).toBe("WILFRED")
    expect(queue.last.value).toBe("Catalina")
  })
  it("Returns an Iterator to use in for of loops.", () => {
    queue.enqueue("WILFRED")
    queue.enqueue("Austria")
    queue.enqueue("Yanna")
    queue.enqueue("Theudy")
    queue.enqueue("Catalina")
    const data = []
    for (const node of queue) {
      data.push(node.value)
    }
    expect(data).toStrictEqual([
      "WILFRED",
      "Austria",
      "Yanna",
      "Theudy",
      "Catalina",
    ])
  })
  it("@dequeue removes the first element and returns it", () => {
    queue.enqueue("WILFRED")
    queue.enqueue("Austria")
    queue.enqueue("Yanna")
    queue.enqueue("Theudy")
    expect(queue.peek()).toBe("WILFRED")
    expect(queue.dequeue()).toBe("WILFRED")
  })
  it("Keeps track to the size", () => {
    queue.enqueue("WILFRED")
    queue.enqueue("Austria")
    queue.enqueue("Yanna")
    queue.enqueue("Theudy")
    expect(queue.size).toBe(4)
    queue.enqueue("Five")
    queue.enqueue("Six")
    queue.enqueue("Seven")
    expect(queue.size).toBe(7)
  })
  it("@get returns the correct node with 0 based index", () => {
    queue.enqueue("ONE")
    queue.enqueue("Two")
    queue.enqueue("Three")
    queue.enqueue("Four")
    queue.enqueue("Five")
    expect(queue.get(2).value).toBe("Three")
  })
})
