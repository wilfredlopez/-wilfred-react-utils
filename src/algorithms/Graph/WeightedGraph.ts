import { PriorityQueue } from "../Queue/PriorityQueue"
interface WeightedElement {
  vertexKey: string
  weight: number
}

/**
 * Implementation of Dijkstra's algorithm
 */
export class WeightedGraph {
  adjacencyList: { [key: string]: WeightedElement[] } = {}

  //Implementation of Dijkstra's algorithm
  shortestPath(from: string, to: string) {
    const nodes = new PriorityQueue<string>()
    let distances: { [key: string]: number } = {}
    let previews: { [key: string]: string | null } = {}
    let path: string[] = [] // to return at the end

    //build initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === from) {
        distances[vertex] = 0
        nodes.enqueue(vertex, 0)
      } else {
        distances[vertex] = Infinity
        nodes.enqueue(vertex, Infinity)
      }
      previews[vertex] = null
    }
    let smallest: string
    //loop as long as there's something to visit
    while (nodes.values.length !== 0) {
      smallest = nodes.dequeue()

      if (smallest === to) {
        //WE ARE DONT AND NEED TO BUILD PATH
        while (previews[smallest]) {
          path.push(smallest)
          smallest = previews[smallest]!
        }
        break
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbor]
          //calculate new distance to neighbor in node
          let candidate = distances[smallest] + nextNode.weight
          let nextNeighbor = nextNode.vertexKey
          if (candidate < distances[nextNeighbor]) {
            //updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate
            // updating previews - how we got to neighbor
            previews[nextNeighbor] = smallest
            //enqueue in priority queue with new priotity
            nodes.enqueue(nextNeighbor, candidate)
          }
        }
      }
    } //end While Loop
    return path.concat(smallest!).reverse()
  }
  addVertex(key: string) {
    if (!this.adjacencyList[key]) this.adjacencyList[key] = []
  }
  addEdge(vertex1Key: string, vertex2Key: string, weight: number) {
    if (!this.adjacencyList[vertex1Key]) {
      throw new Error(
        `Please Make sure the vertex key [${vertex1Key}] is added before adding an edge`,
      )
    }
    if (!this.adjacencyList[vertex2Key]) {
      throw new Error(
        `Please Make sure the vertex key [${vertex2Key}] is added before adding an edge`,
      )
    }
    this.adjacencyList[vertex1Key].push({ vertexKey: vertex2Key, weight })
    this.adjacencyList[vertex2Key].push({ vertexKey: vertex1Key, weight })
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
