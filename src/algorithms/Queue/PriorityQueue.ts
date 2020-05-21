export class PriorityNode<V extends any> {
  constructor(public value: V, public priority: number) {
  }
}

/**
 * Keeps track of the queue based on the priority. where -Infinity is the highest priority.
 * @complexity O(log n) fast
 */
export class PriorityQueue<T extends any> {
  values: PriorityNode<T>[];
  constructor() {
    this.values = [];
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
    this.values.push(new PriorityNode(value, priority));
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
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      if (end) {
        this.values[0] = end;
      }
      this.bubbleDown();
    }
    return min.value;
  }
  private bubbleDown() {
    let idx = 0;
    let length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;

      let swap = null;
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < (leftChild?.priority)! as T)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) {
        break;
      }
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
      //   break;
    }
  }
  private bubbleUp() {
    let index = this.values.length - 1;
    const element = this.values[index];

    while (index > 0) {
      let parrentIdx = Math.floor((index - 1) / 2);
      const parrent = this.values[parrentIdx];
      if (element.priority >= parrent.priority) break;
      this.values[parrentIdx] = element;
      this.values[index] = parrent;
      index = parrentIdx;
      //   break;
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
