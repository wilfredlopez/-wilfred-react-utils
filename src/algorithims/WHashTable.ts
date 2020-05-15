export class WHasTable<T = any> {
  buckets: Array<HashNode>
  numBuckets: number
  key: string | null = null
  value: T | null = null
  next: WHasTable<T> | null = null
  constructor(size: number) {
    this.buckets = new Array(size)
    this.numBuckets = this.buckets.length
  }

  /**
   * Inserts to the buckets a new key value pair
   * if the key already exist it will update the value.
   * @param key string key
   * @param value any value
   */
  insert(key: string, value: T) {
    const index = this.hash(key)
    //is empty?
    if (!this.buckets[index]) this.buckets[index] = new HashNode(key, value)
    //if key already exist > and is the top key
    else if (this.buckets[index].key === key) {
      this.buckets[index].value = value
    } else {
      let currentNode = this.buckets[index]
      //set currentNode to last node in the chain
      while (currentNode.next) {
        //if key already exist > update that key and stop
        if (currentNode.next.key === key) {
          currentNode.next.value = value
          //stop here.
          return
        }
        currentNode = currentNode.next
      }
      currentNode.next = new HashNode(key, value)
    }
  }

  hash(key: string) {
    let total = 0

    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i)
    }
    //a number from 0 to the total number of buckets
    return total % this.numBuckets
  }

  get(key: string): T | null {
    const index = this.hash(key)
    if (!this.buckets[index]) return null
    else {
      let currentNode: HashNode | null = this.buckets[index]
      while (currentNode) {
        if (currentNode.key === key) return currentNode.value
        currentNode = currentNode.next
      }
      //if not found. but this should never be the case
      return null
    }
  }

  /**
   * Returns all the nodes in the bucket as HashNode instances
   */
  getAll(): HashNode[] {
    let allNodes: HashNode[] | undefined = []
    for (let i = 0; i < this.numBuckets; i++) {
      let currentNode: HashNode | null = this.buckets[i]
      while (currentNode) {
        allNodes.push(currentNode)
        currentNode = currentNode.next
      }
    }

    return allNodes
  }
  /**
   * returns all the values in the bucket.
   * the order is not the same as they were added in
   */
  getAllValues(): T[] {
    return this.getAll().map((n) => n.value)
  }
}

class HashNode {
  key: string
  value: any
  next: HashNode | null
  constructor(key: string, value: any, next?: HashNode) {
    this.key = key
    this.value = value
    this.next = next || null
  }
}
