// import { findLinkedListMidPoint, isCircularLinkedList } from "./";
import { INode, ILinkedList } from "../interfaces";

export class SingleNode<T extends any = any> implements INode {
  constructor(public value: T, public next: SingleNode | null = null) {}
}

/**
 * List with head and tail. you can insert/push/set/unshift items. you can pop/remove/shift and you can get items or revese the order.
 * Easy to insert (better than arrays) O(1)
 * Not good to get items/Access like arrays or object where you can use the index. O(n)
 * removing O(1) or O(n)
 */
export class SinglyLinkedList<T extends any> implements ILinkedList {
  head: SingleNode<T> | null = null;
  tail: SingleNode<T> | null = null;
  length: number = 0;

  /**
   * Insert a the end.
   * @param val 
   */
  push(val: T) {
    const node = new SingleNode<T>(val);
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  /**
   * Removes from the end.
   */
  pop() {
    if (!this.head) return null;
    let current = this.head;
    let newTail = current;

    while (current?.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    if (this.tail?.next) {
      this.tail!.next = null;
    }
    this.length--;
    if (this.length === 0) this.head = null;
    return current;
  }

  /**
   * Remove from the begining (the head)
   */
  shift() {
    if (!this.head) return null;
    let current = this.head;
    this.head = this.head.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return current;
  }

  /**
   * Insert at the begining
   * @param val 
   */
  unshift(val: T) {
    const newHead = new SingleNode<T>(val);
    if (!this.head) {
      this.head = newHead;
      this.tail = this.head;
    } else {
      newHead.next = this.head;
      this.head = newHead;
    }
    this.length++;
    return this;
  }

  get(index: number) {
    if (
      index < 0 || index >= this.length || this.head === null ||
      this.length === 0
    ) {
      return null;
    }
    let current: SingleNode<T> | null = this.head;
    let count = 0;
    while (count !== index) {
      current = current!.next;
      count++;
    }
    return current;
  }

  set(index: number, value: T) {
    let foundNode = this.get(index);
    if (foundNode) {
      foundNode.value = value;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Inserts value at index. 
   * if index less than 0 or greater than the length of the linked list returns false.
   * @param index index needs to be between 0 and the total length of the LinkedList.
   * @param value value to insert.
   */
  insert(index: number, value: T) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) {
      this.push(value);
      return true;
    }
    if (index === 0) this.unshift(value);
    else {
      let newNode = new SingleNode<T>(value);
      let prev = this.get(index - 1);
      let temp = prev?.next || null;
      prev!.next = newNode;
      newNode.next = temp;
      this.length++;
    }

    return true;
  }

  remove(index: number) {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    let previewsNode = this.get(index - 1);
    let removed = previewsNode?.next || null;
    previewsNode!.next = removed!.next;
    this.length--;

    return removed;
  }

  /**
   * Verifies if the linked list at some point has nodes refering to the same value in memory.
   * @returns {boolean} true of the list is circular. false if not.
   */
  isCircular() {
    if (this.length === 0) return false;
    let slow = this.head;
    let fast = this.head;

    while (slow && slow.next && fast && fast.next && fast.next.next) {
      slow = slow.next;
      fast = fast.next.next;
      //if equal at some point the list most be circular.
      if (slow === fast) return true;
    }
    return false;
  }

  revese() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next = null;
    let prev = null;
    for (let i = 0; i < this.length; i++) {
      next = node?.next || null;
      node!.next = prev;
      prev = node;
      node = next;
    }
    return this;
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      let temp = current;
      current = current.next;
      yield temp.value;
    }
  }
}

// const list = new SinglyLinkedList<string | number>();
// // adding
// list.push("Wilfred");
// list.push("yanna");
// list.push("Austria");
// list.push("Catalina");
// list.push("Pablo");
// console.log(list.findMidPoint());
// console.log(findLinkedListMidPoint(list));
// console.log(isCircularLinkedList(list));
// //TEST IF CIRCULAR
// //MAKE IT CIRCULAR IN PURPOSE IN ORDER TO TEST.
// list.head?.next?.next = list.head
// console.log(list.isCircular());
// console.log(list.unshift("Mom"));
// list.set(0, "mami");
// list.insert(0, "NEW");
// list.unshift("2");

// for (let val of list) {
//   console.log(val);
// }

// //get
// console.log(list.get(0)?.value);
// console.log(list.get(6)?.value);
// list.print();
// list.revese();
// list.print();

// //removing
// list.remove(4);
// console.log(list.pop()?.value);
// console.log(list.shift()?.value);
// console.log(list.shift()?.value);
// console.log(list.shift()?.value);
// console.log(list.shift()?.value);
// console.log(list.shift()?.value);
// console.log(list.shift()?.value);
