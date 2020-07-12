export { DoublyLinkedList, DoublyNode } from "./DoblyLinkedList";
export { SinglyLinkedList, SingleNode } from "./SinglyLinkedList";
import { ILinkedList, INode } from "../interfaces";

export function findLinkedListMidPoint(list: ILinkedList) {
  if (!list.head) return null;
  let slow: INode | null = list.head;
  let fast = list.head;

  while (fast && fast.next && fast.next.next) {
    slow = slow?.next || null;
    fast = fast.next.next;
  }
  return slow ? slow.value : null;
}

export function isCircularLinkedList(list: ILinkedList) {
  if (!list.head) return false;
  let slow = list.head;
  let fast = list.head;

  while (slow && slow.next && fast && fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
    //if equal at some point the list most be circular.
    if (slow === fast) return true;
  }
  return false;
}
