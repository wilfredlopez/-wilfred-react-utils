import { BiNode } from "../BiNode";

/**
 *  Keeps a Collection of data. Where the first is the last value pushed. and the last is the first value pushed.
 * Great for undo/redo functionality.
 * You can push to the begining and pop from the end.
 * Works in a Last In First Out Aproach. (Like the js functions call stack) or browser history
 * @complexity O(1) very fast all constant time.
 * @related Queues work the opposite way
 */
export class Stack<T extends any> {
  fist: BiNode<T> | null = null;
  last: BiNode<T> | null = null;
  size: number = 0;

  /**
   * Adds to the begining
   * @param value value to add
   */
  push(val: T) {
    const newHead = new BiNode<T>(val);
    if (!this.fist) {
      this.fist = newHead;
      this.last = this.fist;
    } else {
      this.fist.previous = newHead;
      newHead.next = this.fist;
      this.fist = newHead;
    }
    this.size++;
    return this.size;
  }

  /**
   * removes the first element and returns it
   */
  pop() {
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
   * Added as an extra method. Not recommended to use because its not as fast as the other method.
   * @complexity O(n) maybe faster
   * Returns the value at the specified index or null if not found.
   * @param index index of the value
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
}

// const stack = new Stack();

// stack.push("WILFRED");
// stack.push("Yanna");
// stack.push("Austria");
// stack.push("Pablo");
// stack.push("Cataline");
// stack.push("Theudy");
// console.log(stack.fist?.value);
// console.log(stack.get(4)?.value);
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());
