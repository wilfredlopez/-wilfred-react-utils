import { BiNode } from "./BiNode";
/**
 * Fist in First Out aproach. different from Stacks.
 * Usefull for processing tasks, using methods dequeue and enqueue.
 * @complexity 
 * Insert O(1)
 * Remove O(1)
 * Search O(n)
 * Access O(n)
 * @related Queues work the opposite way
 */
export class Queue<T extends any> {
  fist: BiNode<T> | null = null;
  last: BiNode<T> | null = null;
  size: number = 0;

  /**
     * Adds to the end and returns the size of the queue.
     * @param value value to add
     */
  enqueue(val: T) {
    const node = new BiNode<T>(val);
    if (!this.fist) {
      this.fist = node;
      this.last = this.fist;
    } else {
      this.last!.next = node;
      node.previous = this.last;
      this.last = node;
    }
    this.size++;
    return this.size;
  }

  /**
     * removes the first element and returns the value
     */
  dequeue() {
    if (!this.fist || this.size === 0) return null;
    let current = this.fist;
    this.fist = this.fist.next;
    if (this.fist) {
      this.fist.previous = null;
    }
    if (this.size === 1) {
      this.last = null;
      this.fist = null;
    }
    this.size--;
    current.next = null;
    return current.value;
  }

  /**
     * Returns the node at index or null.
     * Added as an extra method. Not recommended to use because its not as fast as the other method.
     * @complexity O(n) maybe faster
     * Returns the value at the specified index or null if not found.
     * @param index index of the value
     * @example
     *    queue.get(2).value
          queue.get(2).next
          queue.get(2).previous
     */
  get(index: number) {
    if (
      index < 0 || index >= this.size || this.fist === null ||
      this.size === 0
    ) {
      return null;
    }
    //Is the index closer to the tail or the head?
    const isCloserToTail = index > this.size / 2;
    if (isCloserToTail) {
      let count = this.size - 1;
      let current = this.last;
      while (count !== index) {
        current = current!.previous;
        count--;
      }
      return current;
    } else {
      let current: BiNode<T> | null = this.fist;
      let count = 0;
      while (count !== index) {
        current = current!.next;
        count++;
      }
      return current;
    }
  }
  /**
   * just for testing purpuses
   */
  // print() {
  //   let arr = [];
  //   let current = this.fist;
  //   while (current) {
  //     arr.push(current.value);
  //     current = current.next;
  //   }
  //   console.log(arr);
  //   return arr;
  // }
}

// const queue = new Queue<string>();

// queue.enqueue("1");
// queue.enqueue("2");
// queue.enqueue("3");
// queue.enqueue("4");
// queue.enqueue("5");

// queue.dequeue();
// queue.dequeue();
// queue.dequeue();
// queue.dequeue();
// queue.dequeue();
// queue.dequeue();
// console.log(queue.print());
