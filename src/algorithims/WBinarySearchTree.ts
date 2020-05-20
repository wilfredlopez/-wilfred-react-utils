type BSTValues<D extends {}> = {
  priority: number;
  data: D;
};
export class WBinarySearchTree<T extends BSTValues<any>> {
  value: T;
  left: WBinarySearchTree<T> | null = null;
  right: WBinarySearchTree<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
  insert(value: T) {
    if (value.priority <= this.value.priority) {
      if (!this.left) this.left = new WBinarySearchTree(value);
      else this.left.insert(value);
    } else if (value.priority > this.value.priority) {
      if (!this.right) this.right = new WBinarySearchTree(value);
      else this.right.insert(value);
    }
  }

  contains(value: T): Boolean {
    if (value.priority === this.value.priority) return true;
    else if (value.priority < this.value.priority) {
      if (!this.left) return false;
      else return this.left.contains(value);
    } else {
      if (!this.right) return false;
      else return this.right.contains(value);
    }
  }

  getValue(value: T): T | null {
    if (!value.priority) return null;
    if (value.priority === this.value.priority) return this.value;
    else if (value.priority < this.value.priority) {
      if (!this.left) return null;
      else return this.left.getValue(value);
    } else {
      if (!this.right) return null;
      else return this.right.getValue(value);
    }

    // if (this.value === value) return value
    // if (this.contains(value)) return this.getValue(value)
    // else return null
  }

  /**
   * calls the iterator function with each value ordered as specified by the paramerer order.
   * defaults to 'in-order'
   * @param iteratorFn  iterator function that takes the value
   * @param order "in-order" | "pre-order" | "post-order"
   * In Order returns each value from least to greatest
   * Pre Order returns each value from left to right
   * Post Order returns each value from right to left
   */
  depthFirstTraversal(
    iteratorFn: (value: T) => void,
    order: "in-order" | "pre-order" | "post-order" = "in-order",
  ) {
    if (order === "pre-order") iteratorFn(this.value);
    if (this.left) this.left.depthFirstTraversal(iteratorFn, order);
    if (order === "in-order") iteratorFn(this.value);
    if (this.right) this.right.depthFirstTraversal(iteratorFn, order);
    if (order === "post-order") iteratorFn(this.value);
  }

  getMinVal(): T {
    if (this.left) return this.left.getMinVal();
    return this.value;
  }
  getMaxVal(): T {
    if (this.right) return this.right.getMaxVal();
    return this.value;
  }

  breadthFirstTraversal(iteratorFn: (value: WBinarySearchTree<T>) => void) {
    const queue: WBinarySearchTree<T>[] = [this];
    while (queue.length) {
      let treeNode = queue.shift();
      if (treeNode) {
        iteratorFn(treeNode);
        if (treeNode.left) queue.push(treeNode.left);
        if (treeNode.right) queue.push(treeNode.right);
      }
    }
  }
}
