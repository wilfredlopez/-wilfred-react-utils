type BinaryTreeValue<D extends {}> = {
  priority: number
  data: D
}

/**
 * Organizes the data by priority for easy access. Each priority should be unique.
 * Wrapper around the WBinarySearchTree class.
 * @note It replaces the value if the priority is already taken unless you pass false as the 2nd parameter for insert.
 */
export class BinaryTreeRoot<T extends BinaryTreeValue<any>> {
  root: null | WBinarySearchTree<T>
  constructor() {
    this.root = null
  }
  /**
   * Adds a node to the tree.
   * If priority already exist it will be replaced unless the second argument (replace) was set to false.
   * @param value value to add.
   * @param replace true or false if you want to replace if the priority already exist. @default true
   * @example
   * insert({ priority: 21, data: "My Data" })
   */
  insert(value: T, replace: boolean = true): boolean {
    if (!this.root) {
      this.root = new WBinarySearchTree(value)
      return true
    } else {
      return this.root.insert(value, replace)
    }
  }

  contains(priority: number): boolean {
    if (!this.root) return false
    return this.root.contains(priority)
  }

  /**
   * Returns the value at the specified priority.
   * @param priority priority in the tree
   */
  getValue(priority: number): T | null {
    if (!this.root) return null
    return this.root.getValue(priority)
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
    if (!this.root) return
    return this.root.depthFirstTraversal(iteratorFn, order)
  }

  //breadthFirstTraversal iterator. to use for(let t of tree){}
  //Starting from the root and then root.left, root.right and all the next nodes in that order.
  *[Symbol.iterator](): Generator<T> {
    if (!this.root) return
    const queue: WBinarySearchTree<T>[] = [this.root]
    while (queue.length) {
      let treeNode = queue.shift()
      if (treeNode) {
        yield treeNode.value
        if (treeNode.left) queue.push(treeNode.left)
        if (treeNode.right) queue.push(treeNode.right)
      }
    }
  }

  /**
   * Gets the value with the lowest priority
   */
  getMinVal(): T | null {
    if (!this.root) return null
    return this.root.getMinVal()
  }

  /**
   * Gets the value with the highest priority
   */
  getMaxVal(): T | null {
    if (!this.root) return null
    return this.root.getMaxVal()
  }

  /**
   * Returns all the values from top(Root) to bottom. [root > left > right >left.left > right.right]
   * @param iteratorFn function to iterate over the values.
   */
  breadthFirstTraversal(iteratorFn: (value: T) => void) {
    if (!this.root) return
    const queue: WBinarySearchTree<T>[] = [this.root]
    while (queue.length) {
      let treeNode = queue.shift()
      if (treeNode) {
        iteratorFn(treeNode.value.data)
        if (treeNode.left) queue.push(treeNode.left)
        if (treeNode.right) queue.push(treeNode.right)
      }
    }
  }
}

/**
 * Binary Tree class. Organizes the data by priority for easy access. Each priority should be unique.
 * @note It replaces the value if the priority is already taken unless you pass false as the 2nd parameter for insert.
 */
export class WBinarySearchTree<T extends BinaryTreeValue<any>> {
  value: T
  left: WBinarySearchTree<T> | null = null
  right: WBinarySearchTree<T> | null = null

  constructor(value: T) {
    this.value = value
  }

  /**
   * Adds a node to the tree.
   * If priority already exist it will be replaced unless the second argument (replace) was set to false.
   * @param value value to add.
   * @param replace true or false if you want to replace if the priority already exist. @default true
   * @example
   * insert({ priority: 21, data: "My Data" })
   */
  insert(value: T, replace: boolean = true): boolean {
    if (value.priority === this.value.priority) {
      if (replace) {
        //replacing
        this.value = value
        return true
      }
      return false
    } else if (value.priority <= this.value.priority) {
      if (!this.left) {
        this.left = new WBinarySearchTree(value)
        return true
      } else return this.left.insert(value, replace)
    } else if (value.priority > this.value.priority) {
      if (!this.right) {
        this.right = new WBinarySearchTree(value)
        return true
      } else return this.right.insert(value, replace)
    }

    return false
  }

  contains(priority: number): boolean {
    if (priority === this.value.priority) return true
    else if (priority < this.value.priority) {
      if (!this.left) return false
      else return this.left.contains(priority)
    } else {
      if (!this.right) return false
      else return this.right.contains(priority)
    }
  }

  /**
   * Returns the value at the specified priority.
   * @param priority priority in the tree
   */
  getValue(priority: number): T | null {
    // if (!priority) return null;
    if (priority === this.value.priority) return this.value.data
    else if (priority < this.value.priority) {
      if (!this.left) return null
      else return this.left.getValue(priority)
    } else {
      if (!this.right) return null
      else return this.right.getValue(priority)
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
    if (order === "pre-order") iteratorFn(this.value.data)
    if (this.left) this.left.depthFirstTraversal(iteratorFn, order)
    if (order === "in-order") iteratorFn(this.value.data)
    if (this.right) this.right.depthFirstTraversal(iteratorFn, order)
    if (order === "post-order") iteratorFn(this.value.data)
  }

  //breadthFirstTraversal iterator. to use for(let t of tree){}
  *[Symbol.iterator](): Generator<T> {
    const queue: WBinarySearchTree<T>[] = [this]
    while (queue.length) {
      let treeNode = queue.shift()
      if (treeNode) {
        yield treeNode.value
        if (treeNode.left) queue.push(treeNode.left)
        if (treeNode.right) queue.push(treeNode.right)
      }
    }
  }

  getMinVal(): T {
    if (this.left) return this.left.getMinVal()
    return this.value.data
  }
  getMaxVal(): T {
    if (this.right) return this.right.getMaxVal()
    return this.value.data
  }

  /**
   * Returns all the values from top(Root) to bottom. [root > left > right >left.left > right.right]
   * @param iteratorFn function to iterate over the values.
   */
  breadthFirstTraversal(iteratorFn: (value: T) => void) {
    const queue: WBinarySearchTree<T>[] = [this]
    while (queue.length) {
      let treeNode = queue.shift()
      if (treeNode) {
        iteratorFn(treeNode.value.data)
        if (treeNode.left) queue.push(treeNode.left)
        if (treeNode.right) queue.push(treeNode.right)
      }
    }
  }
}
