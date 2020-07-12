export interface INode {
  next: INode | null;
  value: any;
}

export interface ILinkedList {
  head: INode | null;
}
