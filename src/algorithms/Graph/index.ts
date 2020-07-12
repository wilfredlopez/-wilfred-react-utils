export { Graph } from "./Graph";
export { WeightedGraph } from "./WeightedGraph";

export interface IGraph<
  T extends any,
  K extends string | number | symbol = string,
> {
  list: Record<K, T[]>;
  addVertex: (vertex: K) => IGraph<T, K>;
  addEdge: (vertex1: K, vertex2: K, ...rest: any) => IGraph<T, K>;
  removeEdge: (vertex1: K, vertex2: K) => IGraph<T, K>;
  removeVertex: (vertex: K) => IGraph<T, K>;
}
