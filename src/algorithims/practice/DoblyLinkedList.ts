export class DoublyNode<T extends any = any> {
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
   * Search O(n) but a little better than that. it depends how close to the end or begining is the valie
   * Access O(n)
   * 
   */
export class DoublyLinkedList<T extends any> {
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
      let current = this.tail;
      while (count !== index) {
        current = current!.previous;
        count--;
      }
      return current;
    } else {
      let current: DoublyNode<T> | null = this.head;
      let count = 0;
      while (count !== index) {
        current = current!.next;
        count++;
      }
      return current;
    }
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

  insert(index: number, value: T) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) {
      this.push(value);
      return true;
    }
    if (index === 0) this.unshift(value);
    else {
      let newNode = new DoublyNode<T>(value);
      let prev = this.get(index - 1);
      let afterNode = prev?.next || null;
      prev!.next = newNode;
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
    let removedNode = this.get(index) as DoublyNode<T>;
    // removedNode.previous!.next = removedNode.next;
    // removedNode.previous!.previous = removedNode.previous;
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

  //temp
  // help to make sure the next reference is not lost
  print() {
    let arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    console.log(arr);
  }
  //temp // help to make sure the prev reference is not lost
  printReverse() {
    let arr = [];
    let current = this.tail;
    while (current) {
      arr.push(current.value);
      current = current.previous;
    }
    console.log(arr);
  }
}

// const list = new DoublyLinkedList<string | number>();
// //adding
// list.push("Wilfred");
// list.push("yanna");
// list.push("Austria");
// list.push("Catalina");
// list.push("Pablo");

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
