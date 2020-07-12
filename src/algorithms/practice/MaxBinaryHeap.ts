// In a Max Binary heap the parrent node is always larger than the children but there are no guarantees between the children.
// each parent can have at most 2 children. (see example below)
// The root is index 0
// For any index on the array n...
// The left child is stored at 2n + 1
// The right child is at 2n + 2
// and its parent is at index Math.floor((n-1) / 2)
/*
    100_______
        19  36
        |   | 
       |   |25 5    
      |    ------- 
     17 12 
    -------
*/
// [100, 19, 36, 17, 12, 25, 5, 9, 15, 6, 11, 13, 8, 1 ,4]

/**
 * Binary Heap (MAX)
 */
export class MaxBinaryHeap<T extends any> {
  values: T[];
  constructor() {
    this.values = [];
  }
  insert(value: T) {
    this.values.push(value);
    this.bubbleUp();
  }
  remove() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      if (end) {
        this.values[0] = end;
      }
      this.bubbleDown();
    }
    return max;
  }
  bubbleDown() {
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
        if (leftChild > element) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > (leftChild)! as T)
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
      if (element <= parrent) break;
      this.values[parrentIdx] = element;
      this.values[index] = parrent;
      index = parrentIdx;
      //   break;
    }
  }
}

// const testVals = [41, 39, 33, 18, 27, 12];

// let heap = new MaxBinaryHeap<number>();

// for (const val of testVals) {
//   heap.insert(val);
// }

// heap.insert(55);
// // heap.insert(1);
// // heap.insert(45);
// // heap.insert(199);
// console.log(heap.remove());
// console.log(heap.remove());
// console.log(heap.remove());
// console.log(heap.remove());
// console.log(heap.remove());
// console.log(heap.remove());
// console.log(heap.remove());
// console.log(heap.remove());
// console.log(heap);
