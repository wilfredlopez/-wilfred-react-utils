interface WeightedElement {
  vertexKey: string;
  weight: number;
}

/**
 * Implementation of Dijkstra's algorithm
 */
export class WeightedGraph {
  adjacencyList: { [key: string]: WeightedElement[] } = {};

  //Implementation of Dijkstra's algorithm
  shortestPath(from: string, to: string) {
    const nodes = new PriorityQueue<string>();
    let distances: { [key: string]: number } = {};
    let previews: { [key: string]: string | null } = {};
    let path: string[] = []; // to return at the end

    //build initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === from) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previews[vertex] = null;
    }
    let smallest: string;
    //loop as long as there's something to visit
    while (nodes.values.length !== 0) {
      smallest = nodes.dequeue();

      if (smallest === to) {
        //WE ARE DONT AND NEED TO BUILD PATH
        while (previews[smallest]) {
          path.push(smallest);
          smallest = previews[smallest]!;
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbor];
          //calculate new distance to neighbor in node
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.vertexKey;
          if (candidate < distances[nextNeighbor]) {
            //updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            // updating previews - how we got to neighbor
            previews[nextNeighbor] = smallest;
            //enqueue in priority queue with new priotity
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    } //end While Loop
    return path.concat(smallest!).reverse();
  }
  addVertex(key: string) {
    if (!this.adjacencyList[key]) this.adjacencyList[key] = [];
  }
  addEdge(vertex1Key: string, vertex2Key: string, weight: number) {
    if (!this.adjacencyList[vertex1Key]) {
      throw new Error(
        `Please Make sure the vertex key [${vertex1Key}] is added before adding an edge`,
      );
    }
    if (!this.adjacencyList[vertex2Key]) {
      throw new Error(
        `Please Make sure the vertex key [${vertex2Key}] is added before adding an edge`,
      );
    }
    this.adjacencyList[vertex1Key].push({ vertexKey: vertex2Key, weight });
    this.adjacencyList[vertex2Key].push({ vertexKey: vertex1Key, weight });
  }
}

export class PriorityNode<V extends any> {
  constructor(public value: V, public priority: number) {
  }
}

// import {PriorityQueue} from '../Queue/PriorityQueue'
// using it here in order for the pluggin Quokka to work.
export class PriorityQueue<T extends any> {
  values: PriorityNode<T>[];
  constructor() {
    this.values = [];
  }

  enqueue(value: T, priority: number) {
    this.values.push(new PriorityNode(value, priority));
    this.bubbleUp();
  }
  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      if (end) {
        this.values[0] = end;
      }
      this.bubbleDown();
    }
    return min.value;
  }
  private bubbleDown() {
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
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < (leftChild?.priority)! as T)
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
    }
  }
  private bubbleUp() {
    let index = this.values.length - 1;
    const element = this.values[index];

    while (index > 0) {
      let parrentIdx = Math.floor((index - 1) / 2);
      const parrent = this.values[parrentIdx];
      if (element.priority >= parrent.priority) break;
      this.values[parrentIdx] = element;
      this.values[index] = parrent;
      index = parrentIdx;
    }
  }
}

// const g = new WeightedGraph();

// g.addVertex("A");
// g.addVertex("B");
// g.addVertex("C");
// g.addVertex("D");
// g.addVertex("E");
// g.addVertex("F");
// g.addEdge("A", "B", 4);
// g.addEdge("A", "C", 2);
// g.addEdge("B", "E", 3);
// g.addEdge("C", "D", 2);
// g.addEdge("C", "F", 4);
// g.addEdge("D", "E", 3);
// g.addEdge("D", "F", 1);
// g.addEdge("E", "F", 1);
// // console.log(g.adjacencyList);
// console.log(g.shortestPath("F", "C"));
