import { PriorityQueue } from "./PriorityQueue";

let queue: PriorityQueue<TestOb>;

interface TestOb {
  title: string;
  data: number;
}

describe.skip("PriorityQueue", () => {
  beforeAll(() => {
    queue = new PriorityQueue<TestOb>();
  });
  describe("enqueue", () => {
    it("Adds value and makes sure goest to the right place in priority.", () => {
      queue.enqueue({ title: "Super Important", data: 1 }, 1);
      queue.enqueue({ title: "Not so important", data: 2 }, 2);

      expect(queue.dequeue()).toStrictEqual(
        { title: "Super Important", data: 1 },
      );
    });
  });
});
