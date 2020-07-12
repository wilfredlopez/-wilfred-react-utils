import { ILinkedList, INode } from "../interfaces";

export class DoublyNode<T extends any = any> implements INode {
  constructor(
    public value: T,
    public next: DoublyNode | null = null,
    public previous: DoublyNode | null = null,
  ) {}
}

/**
   * List with head and tail. with nodes that are linked with a previous and next nodes.
   * You can insert/push/set/unshift items. you can pop/remove/shift and you can get items or revese the order.
   * Easy to insert (better than arrays)
   * Not good to get items/Access like arrays or object where you can use the index.
   * Better than SinglyLinkedList but uses more memory.
   * @complexity
   * removing O(1)
   * insertion O(1)
   * Search O(n) but a little better than that. it depends how close to the end or begining is the value
   * Access O(n)
   * 
   */
export class DoublyLinkedList<T extends any> implements ILinkedList {
  head: DoublyNode<T> | null = null;
  tail: DoublyNode<T> | null = null;
  length: number = 0;

  /**
   * 
   * @param val add to the end
   */
  push(val: T) {
    const node = new DoublyNode<T>(val);
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail!.next = node;
      node.previous = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  /**
   * remove from the end
   */
  pop() {
    if (!this.head || this.length === 0) return null;
    let current = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = current!.previous || null;
      this.tail!.next = null;
      current!.previous = null;
    }
    this.length--;
    return current;
  }

  /**
   * removes the first element(head) and returns it/
   */
  shift() {
    if (!this.head || this.length === 0) return null;
    let current = this.head;
    this.head = this.head.next;
    if (this.head) {
      this.head.previous = null;
    }
    if (this.length === 1) {
      this.tail = null;
      this.head = null;
    }
    this.length--;
    current.next = null;
    return current;
  }

  /**
   * 
   * @param val add to the begining
   */
  unshift(val: T) {
    const newHead = new DoublyNode<T>(val);
    if (!this.head) {
      this.head = newHead;
      this.tail = this.head;
    } else {
      this.head.previous = newHead;
      newHead.next = this.head;
      this.head = newHead;
    }
    this.length++;
    return this;
  }

  /**
   * Takes the index and returns the node at that current index
   * @param index 
   */
  get(index: number) {
    if (
      index < 0 || index >= this.length || this.head === null ||
      this.length === 0
    ) {
      return null;
    }
    //Is the index closer to the tail or the head?
    const isCloserToTail = index > this.length / 2;
    if (isCloserToTail) {
      let count = this.length - 1;
      let current: DoublyNode<T> | null = this.tail;
      while (count !== index) {
        current = current?.previous || null;
        count--;
      }
      return current;
    } else {
      let current: DoublyNode<T> | null = this.head;
      let count = 0;
      while (count !== index) {
        current = current?.next || null;
        count++;
      }
      return current;
    }
  }

  /**
   * Sets value at index and returns true or false if index is out of bounds.
   * @param index index to get.
   * @param value value to set.
   */
  set(index: number, value: T) {
    let foundNode = this.get(index);
    if (foundNode) {
      foundNode.value = value;
      return true;
    }
    return false;
  }

  /**
   * Inserts value at index. 
   * if index less than 0 or greater than the length of the linked list returns false.
   * @param index index needs to be between 0 and the total length of the LinkedList.
   * @param value value to insert.
   */
  insert(index: number, value: T) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) this.push(value);
    else if (index === 0) this.unshift(value);
    else {
      let newNode = new DoublyNode<T>(value);
      let prev = this.get(index - 1)!;
      let afterNode = prev?.next || null;
      prev.next = newNode;
      newNode.previous = prev;
      newNode.next = afterNode;
      afterNode!.previous = newNode;
      this.length++;
    }

    return true;
  }

  remove(index: number) {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    let removedNode = this.get(index)!;
    let prev = removedNode.previous;
    //should always be true
    if (prev) {
      prev.next = removedNode.next;
      prev.previous = removedNode.previous;
    }
    this.length--;

    //reset
    removedNode.next = null;
    removedNode.previous = null;
    return removedNode;
  }

  public reverse() {
    if (this.length === 0) return;
    let temp = this.head; //swap head and tail
    this.head = this.tail; // head now points to tail
    this.tail = temp; //tail points to head
    //traverse the list swapping prev and next fields of each node
    let headPointer = this.head; //create a node and point to head

    while (headPointer !== null) { //while p does not equal null
      //swap prev and next of current node
      temp = headPointer.next; // p.next does that not equal null? confusing.
      headPointer.next = headPointer.previous; //this line makes sense since you have to reverse the link
      headPointer.previous = temp; //having trouble visualizing this.
      headPointer = headPointer.next; //advance current node which makes sense
    }
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      const temp = current;
      current = current.next;
      yield temp.value;
    }
  }
}

// const list = new DoublyLinkedList<string | number>();
// //adding
// list.push("Wilfred");
// list.push("yanna");
// list.push("Austria");
// list.push("Catalina");
// list.push("Pablo");

// for (let val of list) {
//   console.log(val);
// }

// console.log(list.print());
// //get
// console.log(list.get(0)?.value);
// console.log(list.get(4)?.value);

// //removing
// // console.log(list.remove(4));
// list.printReverse();
// // console.log(list.head);
// list.reverse();
// list.printReverse();
// console.log(list.pop());

// console.log(list.shift()?.value);
// console.log(list.shift()?.value);
// console.log(list.shift()?.value);
// console.log(list.shift()?.value);
// console.log(list.shift()?.value);
// console.log(list.shift()?.value);
