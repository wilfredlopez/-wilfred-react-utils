import { Queue } from "./Queue";

let queue = new Queue<string>();
describe.skip("Queue", () => {
  beforeEach(() => {
    queue = new Queue<string>();
  });
  it("Starts empty", () => {
    expect(queue.size).toBe(0);
    expect(queue.fist).toBe(null);
    expect(queue.last).toBe(null);
  });
  it("@enqueue Adds to the end", () => {
    queue.enqueue("WILFRED");
    queue.enqueue("Austria");
    queue.enqueue("Yanna");
    queue.enqueue("Theudy");
    queue.enqueue("Catalina");
    expect(queue.fist.value).toBe("WILFRED");
    expect(queue.last.value).toBe("Catalina");
  });
  it("@dequeue removes the first element and returns it", () => {
    queue.enqueue("WILFRED");
    queue.enqueue("Austria");
    queue.enqueue("Yanna");
    queue.enqueue("Theudy");
    expect(queue.dequeue()).toBe("WILFRED");
  });
  it("Keeps track to the size", () => {
    queue.enqueue("WILFRED");
    queue.enqueue("Austria");
    queue.enqueue("Yanna");
    queue.enqueue("Theudy");
    expect(queue.size).toBe(4);
    queue.enqueue("Five");
    queue.enqueue("Six");
    queue.enqueue("Seven");
    expect(queue.size).toBe(7);
  });
  it("@get returns the correct node with 0 based index", () => {
    queue.enqueue("ONE");
    queue.enqueue("Two");
    queue.enqueue("Three");
    queue.enqueue("Four");
    queue.enqueue("Five");
    expect(queue.get(2).value).toBe("Three");
  });
});
