export class NodeWithChildren<T extends any> {
  data: T;
  children: NodeWithChildren<T>[];

  get totalChildrens() {
    return this.children.length;
  }

  constructor(data: T, children: NodeWithChildren<T>[] = []) {
    this.data = data;
    this.children = children;
  }

  add(value: T, children: NodeWithChildren<T>[] = []) {
    this.children.push(new NodeWithChildren(value, children));
  }

  contains(value: T): boolean {
    if (!this.data === value) return true;
    let current = [...this.children];

    while (current.length) {
      const node = current.shift();
      if (node) {
        if (node.data === value) return true;
        current.push(...node.children);
      } else {
        //should never be the case.
        return false;
      }
    }
    return false;
  }

  remove(content: T) {
    this.children = this.children.filter((n) => n.data !== content);
  }

  *[Symbol.iterator](): Generator<T> {
    yield this.data;
    for (const child of this.children) {
      yield* child;
    }
  }
}

/**
 * Creates a tree where the root is the first parameter. 
 * The root is a CNode and all CNodes have children of the same type.
 * You can add or remove from any root children nodes. Children default to []
 * @example
 * 
const tree = new CommonTree<string>("great post")
tree.root.add("Good Comment")
tree.root.add("Bad Comment")
tree.root.add("General Comment")
tree.root.children[0].add("YEY")
console.log(tree.root.contains("Bad Comment")) //true
const elements: string[] = []
for (const node of tree) {
    elements.push(node)
}
console.log(elements)
//['great post','Good Comment','YEY','Bad Comment','General Comment']
 * 
 */
export class CommonTree<T> {
  public root: NodeWithChildren<T>;
  constructor(initialData: T, children: NodeWithChildren<T>[] = []) {
    this.root = new NodeWithChildren(initialData, children);
  }

  contains(data: T) {
    return this.root.contains(data);
  }

  addToRoot(value: T, children: NodeWithChildren<T>[] = []) {
    this.root.add(value, children);
  }

  /**
   * Breadth First Traversal
   * @param fn
   */
  breadthFirstTraverse(fn: (data: T) => void) {
    const arr = [this.root];
    while (arr.length) {
      const node = arr.pop();
      if (node) {
        arr.push(...node.children);
        fn(node.data);
      }
    }
  }

  /**
   * Depth First Traversal
   * @param fn Iterator fn.
   */
  depthFirstTraverse(fn: (data: T) => void) {
    // const arr = [this.root]
    // while (arr.length) {
    //   const node = arr.shift()
    //   if (node) {
    //     arr.unshift(...node.children)
    //     fn(node.data)
    //   }
    // }
    for (const node of this.root) {
      fn(node);
    }
  }

  *[Symbol.iterator](): Generator<T> {
    if (!this.root) return;
    yield* this.root;
  }
}

// const testChildren = [new CNode("Good Comment"), new CNode("Bad Comment")]
// const posts = new CNode("Great Post", testChildren)
// const data = []
// for (let comment of posts) {
//   data.push(comment)
// }
// console.log(posts)
// console.log(data)
// const tree = new CommonTree<string>("great post", testChildren)
// console.log(tree.root)
// console.log(tree.root.totalChildrens)
// const tree = new CommonTree<string>("great post")
// tree.root.add("Good Comment")
// tree.root.add("Bad Comment")
// tree.root.add("General Comment")
// tree.root.children[0].add("YEY")
// const elements: string[] = []
// console.log(tree.root.contains("Bad Comment")) //true
// tree.depthFirstTraverse((d) => {
//   elements.push(d)
// })
// // for (const node of tree) {
// //   elements.push(node)
// // }
// console.log(elements)
/*
[ 'great post',
  'Good Comment',
  'YEY',
  'Bad Comment',
  'General Comment' ]
*/

// /**
//  * Returns an array with the Width of the tree at each level.
//  * Example [ 1, 3, 1 ]
//  * @param tree CommonTree
//  */
// function levelWidth(tree: CommonTree<any>) {
//   //   if (tree.root === null) return
//   const SEPARATOR = "*"
//   const widths: Array<CNode<any> | typeof SEPARATOR> = [tree.root, SEPARATOR]
//   const counters = [0]
//   while (widths.length > 1) {
//     const node = widths.shift()

//     if (node === SEPARATOR) {
//       counters.push(0)
//       widths.push(SEPARATOR)
//     } else {
//       if (node && node !== null) {
//         widths.push(...node.children)
//         counters[counters.length - 1]++
//       }
//     }
//   }
//   return counters
// }

// console.log(levelWidth(tree))
