type BSTValues<D extends {}> = {
  priority: number;
  data: D;
};

/**
 * Binary Tree class. doesnt add values if the priority is already taken.
 */
export class WBinarySearchTree<T extends BSTValues<any>> {
  value: T;
  left: WBinarySearchTree<T> | null = null;
  right: WBinarySearchTree<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }

  /**
   * Adds a node to the tree. 
   * If priority already exist it will not added and will return false if the second argument (replace) was not passed.
   * @param value value to add. 
   * @param replace true or false if you want to replace if the priority already exist.
   * @example
   * insert({ priority: 21, data: "My Data" })
   */
  insert(value: T, replace: boolean = false): boolean {
    if (value.priority === this.value.priority) {
      if (replace) {
        //replacing
        this.value = value;
        return true;
      }
      return false;
    } else if (value.priority <= this.value.priority) {
      if (!this.left) {
        this.left = new WBinarySearchTree(value);
        return true;
      } else return this.left.insert(value, replace);
    } else if (value.priority > this.value.priority) {
      if (!this.right) {
        this.right = new WBinarySearchTree(value);
        return true;
      } else return this.right.insert(value, replace);
    }

    return false;
  }

  contains(priority: number): Boolean {
    if (priority === this.value.priority) return true;
    else if (priority < this.value.priority) {
      if (!this.left) return false;
      else return this.left.contains(priority);
    } else {
      if (!this.right) return false;
      else return this.right.contains(priority);
    }
  }

  /**
   * Returns the value at the specified priority.
   * @param priority priority in the tree
   */
  getValue(priority: number): T | null {
    // if (!priority) return null;
    if (priority === this.value.priority) return this.value.data;
    else if (priority < this.value.priority) {
      if (!this.left) return null;
      else return this.left.getValue(priority);
    } else {
      if (!this.right) return null;
      else return this.right.getValue(priority);
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
    if (order === "pre-order") iteratorFn(this.value.data);
    if (this.left) this.left.depthFirstTraversal(iteratorFn, order);
    if (order === "in-order") iteratorFn(this.value.data);
    if (this.right) this.right.depthFirstTraversal(iteratorFn, order);
    if (order === "post-order") iteratorFn(this.value.data);
  }

  getMinVal(): T {
    if (this.left) return this.left.getMinVal();
    return this.value.data;
  }
  getMaxVal(): T {
    if (this.right) return this.right.getMaxVal();
    return this.value.data;
  }

  breadthFirstTraversal(iteratorFn: (value: T) => void) {
    const queue: WBinarySearchTree<T>[] = [this];
    while (queue.length) {
      let treeNode = queue.shift();
      if (treeNode) {
        iteratorFn(treeNode.value.data);
        if (treeNode.left) queue.push(treeNode.left);
        if (treeNode.right) queue.push(treeNode.right);
      }
    }
  }
}
