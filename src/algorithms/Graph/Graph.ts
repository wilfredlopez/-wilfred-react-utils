/**
 * Undirected graph. connections/edges in both directions.
 */

import { IGraph } from "./index";

export class Graph<K extends string | number | symbol> implements IGraph<K, K> {
  private _adjacencyList: { [P in K]: Array<K> };

  get list() {
    return this._adjacencyList;
  }
  constructor() {
    this._adjacencyList = {} as { [P in K]: Array<K> };
  }

  /**
   * create an empty vertex where the key and the value is the vertex argument
   * @param vertex 
   */
  addVertex(vertex: K) {
    if (!this._adjacencyList[vertex]) this._adjacencyList[vertex] = [] as K[];
    return this;
  }

  /**
   * add edge or connection between existing vertex1 and existing vertex2.
   * throws an error if at least one of them doesnt exist.
   * @param vertex1 
   * @param vertex2 
   */
  addEdge(vertex1: K, vertex2: K) {
    if (!this.areExistinVertex(vertex1, vertex2)) {
      throw new Error(
        `Please Make sure the vertex key [${vertex1}] and [${vertex2}] is added before adding an edge`,
      );
    }
    this._adjacencyList[vertex1].push(vertex2);
    this._adjacencyList[vertex2].push(vertex1);
    return this;
  }

  /**
   * Removes connection between vertex1 and vertex2 arguments.
   * @param vertex1 
   * @param vertex2 
   */
  removeEdge(vertex1: K, vertex2: K) {
    if (this.areExistinVertex(vertex1, vertex2)) {
      this._adjacencyList[vertex1] = this._adjacencyList[vertex1].filter((v) =>
        v !== vertex2
      );
      this._adjacencyList[vertex2] = this._adjacencyList[vertex2].filter((v) =>
        v !== vertex1
      );
    }
    return this;
  }

  /**
   * Deletes the vertex from the graph and all it's connections
   * @param vertex 
   */
  removeVertex(vertex: K) {
    if (this._adjacencyList[vertex]) {
      for (const pairVertex of this._adjacencyList[vertex]) {
        this.removeEdge(vertex, pairVertex);
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
  areExistinVertex(vertex1: K, vertex2: K) {
    if (!vertex1 || !vertex2) {
      return false;
    }
    return typeof this._adjacencyList[vertex1] !== "undefined" &&
      typeof this._adjacencyList[vertex2] !== "undefined";
  }

  DFS_Iter(startVertex: K) {
    const stack = [startVertex];
    const result: K[] = [];
    let visited = {} as Record<K, boolean>;
    visited[startVertex] = true;

    let current: K;
    while (stack.length) {
      current = stack.pop()!;

      result.push(current);
      for (let val of this._adjacencyList[current]) {
        if (!visited[val]) {
          visited[val] = true;
          stack.push(val);
        }
      }
    }
    return result;
  }

  deepCopy(): { [P in K]: Array<K> } {
    let copy = {} as { [P in K]: Array<K> };
    for (let key of Object.getOwnPropertyNames(this._adjacencyList)) {
      copy[key as K] = this._adjacencyList[key as K].map((v) => v);
    }
    return copy;
  }

  //   DFS_Iter2(startVertex: K) {
  //     let result: K[] = [startVertex];
  //     let visited = {} as Record<K, boolean>;
  //     let list = this.deepCopy();
  //     let current = list[startVertex];
  //     visited[startVertex] = true;

  //     while (current.length) {
  //       current.forEach((neighbor) => {
  //         if (!visited[neighbor]) {
  //           visited[neighbor] = true;
  //           result.push(neighbor);
  //         }
  //       });
  //       current = list[current.pop()!];
  //     }
  //     return result;
  //   }

  DFS_Recursive(startVertex: K) {
    let result: K[] = [];
    let visited = {} as Record<K, boolean>;
    let list = this._adjacencyList;

    (function dfs(vertex: K) {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      list[vertex].forEach((neigboar) => {
        if (!visited[neigboar]) {
          return dfs(neigboar);
        }
      });
    })(startVertex);
    return result;
  }

  BFS(startVertex: K) {
    let data = [];
    let queue = [startVertex];
    let visited = {} as Record<K, boolean>;
    while (queue.length) {
      let vertex = queue.shift()!;
      data.unshift(vertex);
      visited[vertex] = true;
      for (let val of this._adjacencyList[vertex]) {
        if (!visited[val]) {
          visited[val] = true;

          queue.unshift(val);
        }
      }
    }
    return data;
  }
  BFS_Recursive(startVertex: K) {
    let result: K[] = [];
    let visited = {} as Record<K, boolean>;
    let list = this._adjacencyList;

    (function dfs(vertex: K) {
      if (!vertex) return null;
      visited[vertex] = true;
      list[vertex].forEach((neigboar) => {
        if (!visited[neigboar]) {
          return dfs(neigboar);
        }
      });
      result.push(vertex);
    })(startVertex);
    return result;
  }
}

// const flights = new Graph();
// flights.addVertex("Dallas").addVertex("New Jersey");
// flights.addVertex(1).addVertex(2);
// flights.addEdge("New Jersey", "Dallas");
// flights.addEdge(1, 2);
// flights.addEdge("New Jersey", 2);

// console.log(flights);
// flights.removeEdge("New Jersey", "Dallas");
// flights.removeEdge(1, 2);
// flights.removeVertex("Dallas");
// console.log(flights);
// console.log(flights.DFS_Recursive(1));
// // console.log(flights.DFS_Iter2(1));
// console.log(flights.DFS_Iter(1));
// console.log(flights.DFS_Recursive(1));
// console.log(flights.BFS(1));
// console.log(flights.BFS_Recursive(1));
