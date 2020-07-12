import { IGraph } from ".";
import { PriorityQueue } from "../Queue/PriorityQueue";

export interface WeightedElement {
  vertexKey: string;
  weight: number;
}

/**
 * Implementation of Dijkstra's algorithm to find shortest path.
 * @example
 * const g = new WeightedGraph();
 * g.addVertex("Dominican Republic");
 * g.addVertex("USA");
 * g.addVertex("Spain");
 * g.addVertex("PR");
 * g.addEdge("Dominican Republic", "USA", 50);
 * g.addEdge("Dominican Republic", "PR", 30);
 * g.addEdge("Dominican Republic", "Spain", 70);
 * g.addEdge("USA", "Spain", 75);
 * g.addEdge("PR", "Dominican Republic", 30);
 * g.addEdge("PR", "USA", 14);
 * console.log(g.shortestPath("Dominican Republic", "USA"));
 * console.log(g.shortestPath("Dominican Republic", "Spain"));
 */
export class WeightedGraph implements IGraph<WeightedElement, string> {
  private _adjacencyList: { [key: string]: WeightedElement[] } = {};

  get list() {
    return this._adjacencyList;
  }
  //Implementation of Dijkstra's algorithm
  shortestPath(from: string, to: string) {
    const nodesQueue = new PriorityQueue<string>();
    let distances: { [key: string]: number } = {};
    let previews: { [key: string]: string | null } = {};
    let path: string[] = []; // to return at the end

    //build initial state
    for (let vertex in this._adjacencyList) {
      if (vertex === from) {
        distances[vertex] = 0;
        nodesQueue.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodesQueue.enqueue(vertex, Infinity);
      }
      previews[vertex] = null;
    }
    let smallest: string;
    //loop as long as there's something to visit
    while (nodesQueue.length !== 0) {
      smallest = nodesQueue.dequeue();

      if (smallest === to) {
        //WE ARE DONT AND NEED TO BUILD PATH
        while (previews[smallest]) {
          path.push(smallest);
          smallest = previews[smallest]!;
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this._adjacencyList[smallest]) {
          let nextNode = this._adjacencyList[smallest][neighbor];
          //calculate new distance to neighbor in node
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.vertexKey;
          if (candidate < distances[nextNeighbor]) {
            //updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            // updating previews - how we got to neighbor
            previews[nextNeighbor] = smallest;
            //enqueue in priority queue with new priotity
            nodesQueue.enqueue(nextNeighbor, candidate);
          }
        }
      }
    } //end While Loop
    return path.concat(smallest!).reverse();
  }

  addVertex(key: string) {
    if (!this._adjacencyList[key]) this._adjacencyList[key] = [];
    return this;
  }

  removeEdge(vertex1: string, vertex2: string) {
    if (this.areExistinVertex(vertex1, vertex2)) {
      this._adjacencyList[vertex1] = this._adjacencyList[vertex1].filter((v) =>
        v.vertexKey !== vertex2
      );
      this._adjacencyList[vertex2] = this._adjacencyList[vertex2].filter((v) =>
        v.vertexKey !== vertex1
      );
    }
    return this;
  }
  removeVertex(vertex: string) {
    if (this._adjacencyList[vertex]) {
      for (const pairVertex of this._adjacencyList[vertex]) {
        this.removeEdge(vertex, pairVertex.vertexKey);
      }
    }
    delete this._adjacencyList[vertex];
    return this;
  }

  /**
   * Verifies if vertex1 and vertex2 exist.
   * @param vertex1 
   * @param vertex2 
   * @returns {boolean}
   */
  areExistinVertex(vertex1: string, vertex2: string) {
    if (!vertex1 || !vertex2) {
      return false;
    }
    return typeof this._adjacencyList[vertex1] !== "undefined" &&
      typeof this._adjacencyList[vertex2] !== "undefined";
  }

  addEdge(vertex1Key: string, vertex2Key: string, weight: number) {
    if (!this._adjacencyList[vertex1Key]) {
      throw new Error(
        `Please Make sure the vertex key [${vertex1Key}] is added before adding an edge`,
      );
    }
    if (!this._adjacencyList[vertex2Key]) {
      throw new Error(
        `Please Make sure the vertex key [${vertex2Key}] is added before adding an edge`,
      );
    }
    this._adjacencyList[vertex1Key].push({ vertexKey: vertex2Key, weight });
    this._adjacencyList[vertex2Key].push({ vertexKey: vertex1Key, weight });
    return this;
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

/**
 * Flights example
 */
// const g = new WeightedGraph();
// g.addVertex("Dominican Republic");
// g.addVertex("USA");
// g.addVertex("Spain");
// g.addVertex("PR");
// g.addEdge("Dominican Republic", "USA", 50);
// g.addEdge("Dominican Republic", "PR", 30);
// g.addEdge("Dominican Republic", "Spain", 70);
// g.addEdge("USA", "Spain", 75);
// g.addEdge("PR", "Dominican Republic", 30);
// g.addEdge("PR", "USA", 14);
// console.log(g.shortestPath("Dominican Republic", "USA"));
// console.log(g.shortestPath("Dominican Republic", "Spain"));
