export class PriorityNode<V extends any> {
  constructor(public value: V, public priority: number) {}
}

/**
 * Keeps track of the queue based on the priority. where -Infinity is the highest priority.
 * Not designed for search. just add and remove one by one.
 * @complexity O(log n) fast
 */
export class PriorityQueue<T extends any> {
  protected _values: PriorityNode<T>[];
  constructor() {
    this._values = [];
  }

  get length() {
    return this._values.length;
  }

  /**
   * Adds value and makes sure goest to the right place in priority
   * @param value value to add
   * @param priority priority for this value. the lowest number the higher priority.
   * @example
   * 
   * const queue = new PriorityQueue<string>();
   *  queue.enqueue("Super Important", 1);
      queue.enqueue("Not So Important", 45);
   */
  enqueue(value: T, priority: number) {
    this._values.push(new PriorityNode(value, priority));
    this.bubbleUp();
  }
  /**
   * Returns the value with the highest priority where the lowest number is the higher priority.
   * @example
   *  const queue = new PriorityQueue<string>();
   *  queue.enqueue("Super Important", 1);
      queue.enqueue("Not So Important", 45);
      queue.dequeue() // Super Important
   */
  dequeue() {
    const min = this._values[0];
    const end = this._values.pop();
    if (this._values.length > 0) {
      if (end) {
        this._values[0] = end;
      }
      this.bubbleDown();
    }
    return min.value;
  }

  /**
   * Lets you peek at the next element that will go out.
   * Basically element with the highest priority.
   */
  peek() {
    return this._values.length > 0 ? this._values[0].value : null;
  }
  private bubbleDown() {
    let idx = 0;
    let length = this._values.length;
    const element = this._values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;

      let swap = null;
      if (leftChildIdx < length) {
        leftChild = this._values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this._values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && ((rightChild.priority < leftChild?.priority!) as T))
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) {
        break;
      }
      this._values[idx] = this._values[swap];
      this._values[swap] = element;
      idx = swap;
    }
  }
  private bubbleUp() {
    let index = this._values.length - 1;
    const element = this._values[index];

    while (index > 0) {
      let parrentIdx = Math.floor((index - 1) / 2);
      const parrent = this._values[parrentIdx];
      if (element.priority >= parrent.priority) break;
      this._values[parrentIdx] = element;
      this._values[index] = parrent;
      index = parrentIdx;
    }
  }
}

// const testVals = [41, 39, 33, 18, 27, 12];

// let heap = new PriorityQueue<string>();

// for (const val of testVals) {
//   heap.enqueue("TEST", val);
// }

// heap.enqueue("TEST@", 55);
// heap.enqueue("TEST@", -1);
// heap.enqueue("TEST@", 1);
// heap.enqueue("TEST@", 45);
// heap.enqueue("TEST@", 199);
// console.log(heap);
// console.log(heap.dequeue());
// console.log(heap.dequeue());
// console.log(heap.dequeue());
// console.log(heap.dequeue());
// console.log(heap.dequeue());
// console.log(heap.dequeue());
// console.log(heap.dequeue());
// console.log(heap.dequeue());
// console.log(heap);
