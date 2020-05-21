/**
 * Creates a hash table *like a map with key value pairs
 * All keys are unique. if you try to set a value twice with the same key it will override the existing value.
 * @complexity
 * O(1) very fast
 */
export class WHasTable<T = any> {
  buckets: Array<HashNode<T>>;
  bucketSize: number;
  constructor(size: number = 53) {
    this.buckets = new Array(size);
    this.bucketSize = this.buckets.length;
  }

  /**
   * Inserts to the buckets a new key value pair
   * if the key already exist it will update/override the value.
   * @param key string key
   * @param value any value
   */
  set(key: string, value: T) {
    const index = this._hash(key);
    //is empty?
    if (!this.buckets[index]) this.buckets[index] = new HashNode<T>(key, value);
    //if key already exist > and is the top key
    else if (this.buckets[index].key === key) {
      this.buckets[index].value = value;
    } else {
      let currentNode = this.buckets[index];
      //set currentNode to last node in the chain
      while (currentNode.next) {
        //if key already exist > update that key and stop
        if (currentNode.next.key === key) {
          currentNode.next.value = value;
          //stop here.
          return;
        }
        currentNode = currentNode.next;
      }
      currentNode.next = new HashNode<T>(key, value);
    }
  }

  private _hash(key: string) {
    if (key.length === 0) return 0;
    let total = 0;
    let PRIME_NUMBER = 31;
    for (let i = 0; i < key.length; i++) {
      // total += key.charCodeAt(i);
      total = (total * PRIME_NUMBER + (key.charCodeAt(i) - 96)) %
        this.bucketSize;
    }
    //a number from 0 to the total number of buckets
    // return total % this.bucketSize;
    return total;
  }

  get(key: string): T | null {
    const index = this._hash(key);
    if (!this.buckets[index]) return null;
    else {
      let currentNode: HashNode<T> | null = this.buckets[index];
      while (currentNode) {
        if (currentNode.key === key) return currentNode.value;
        currentNode = currentNode.next;
      }
      //if not found. but this should never be the case

      return null;
    }
  }

  forEach(fn: (value: T, index: number) => void) {
    let index = 0;
    for (let i = 0; i < this.bucketSize; i++) {
      let currentNode: HashNode<T> | null = this.buckets[i];
      while (currentNode) {
        fn(currentNode.value, index);
        index++;
        currentNode = currentNode.next;
      }
    }
    // this.getNodes().forEach((node, index) => {
    //   fn(node.value, index);
    // });
  }

  getKeys() {
    let keys: string[] = [];
    for (let i = 0; i < this.bucketSize; i++) {
      let currentNode: HashNode<T> | null = this.buckets[i];
      while (currentNode) {
        keys.push(currentNode.key);
        currentNode = currentNode.next;
      }
    }
    return keys;
    // return this.getNodes().map((n) => n.key);
  }

  /**
   * Returns all the nodes in the bucket as HashNode instances
   */
  getNodes(): HashNode<T>[] {
    let allNodes: HashNode<T>[] = [];
    for (let i = 0; i < this.bucketSize; i++) {
      let currentNode: HashNode<T> | null = this.buckets[i];
      while (currentNode) {
        allNodes.push(currentNode);
        currentNode = currentNode.next;
      }
    }

    return allNodes;
  }
  /**
   * returns all the values in the bucket.
   * the order is not the same as they were added in
   */
  getAll(): T[] {
    let allNodes: T[] = [];
    for (let i = 0; i < this.bucketSize; i++) {
      let currentNode: HashNode<T> | null = this.buckets[i];
      while (currentNode) {
        allNodes.push(currentNode.value);
        currentNode = currentNode.next;
      }
    }
    return allNodes;
    // return this.getNodes().map((n) => n.value);
  }
}

export class HashNode<T extends any> {
  key: string;
  value: T;
  next: HashNode<T> | null;
  constructor(key: string, value: T, next?: HashNode<T>) {
    this.key = key;
    this.value = value;
    this.next = next || null;
  }
}
