/**
 * Alternative to an array a Map, Object or a Set. with extra functionality and easy access.
 * @strengths
 * This is highly performent with O(1) for all methods except map.
 * Easy to access, delete and set.
 * property size is maintained for the object.
 * @weekness
 * Like a Set this overrides the value if already exists when you set the same key.
 * There is no Order/Sort.
 * @example
 *  const lastnames = new Mapper();
    lastnames.set("wilfred", "lopez");
    lastnames.set("Austria", "Castillo");
    lastnames.set("Pablo", "Escovar");
     console.log(lastnames.size); //3
    lastnames.delete("Pablo"); //true
    console.log(lastnames.size); //2
    console.log(lastnames.get("wilfred")); //lopez
    console.log(lastnames.keys()); // ['wilfred', 'Austria']
    lastnames.map((val, key, index) => {
    console.log(val, key, index);
    });
    let data = []
    for (const ln of lastnames) {
        data.push(ln)
    }
 */

export class Mapper<T extends any> {
  //private properties
  #_data: { [key: string]: T } = {}
  #_size = 0

  /**
   * Length of the keys stored.
   * cannot be set from outside.
   */
  get size() {
    return this.#_size
  }

  /**
   * Iterator function. allows you to use for(const element of mapper){}
   * @example
   * const numbers = new Mapper<number>()
   *  numbers.set("first", 111)
      numbers.set("second", 222)
      numbers.set("last", 0)
      let data = []
      for (const n of numbers) {
        data.push(n)
      }
   */
  *[Symbol.iterator]<R>() {
    const keys = Object.keys(this.#_data)
    for (const key of keys) {
      yield this.get(key)
    }
  }

  /**
   * Returns the data object with all [key]:value pairs.
   * this cannot be set from the outside
   */
  get data() {
    return this.#_data
  }

  /**
   * Deletes the value of the last key (ussually works but could be any key since there's no real order).
   * @see Not recommended. Better call delete with the key you want to delete.
   */
  pop() {
    if (this.size === 0) return null
    const lastKey = this.keys()[this.size - 1]
    return this.delete(lastKey)
  }

  /**
   * Deletes the value of the first key (ussually works but could be any key since there's no real order).
   * @see Not recommended. Better call delete with the key you want to delete.
   */
  unshift() {
    if (this.size === 0) return null
    const fistKey = this.keys()[0]
    return this.delete(fistKey)
  }

  /**
   * Sets the key value pair.
   * @param key key to use for the value
   * @param value value to save
   */
  set(key: string, value: T) {
    this.#_data[key] = value
    this.#_size++
  }

  /**
   * Returns the value or null if it doesnt exist.
   * @param key key of the value
   */
  get(key: string) {
    return this.#_data[key] !== undefined ? this.#_data[key] : null
  }

  /**
   * Returns the value if delete was success. null if the value was not found.
   * @param key key of the value
   */
  delete(key: string) {
    let temp = this.#_data[key]
    if (this.#_data[key] !== undefined) {
      delete this.#_data[key]
      this.#_size--
      return temp
    }
    return null
  }

  /**
   * Returns an array that contains all the keys
   */
  keys() {
    return Object.keys(this.#_data)
  }

  /**
   * Maps overeach value, key and index of the key.
   * @param callback Iterator function. takes tha value, key, index (in that order).
   */
  map<R extends any>(callback: (value: T, key: string, index: number) => R) {
    return Object.keys(this.#_data).map<R>((key, index) => {
      return callback(this.get(key) as T, key, index)
    })
  }

  /**
   * Calls the callback function for each value, key and index of the key.
   * @param callback Iterator function. takes tha value, key, index (in that order).
   */
  forEach(callback: (value: T, key: string, index: number) => void) {
    return Object.keys(this.#_data).forEach((key, index) => {
      return callback(this.get(key) as T, key, index)
    })
  }

  /**
   * Resets the map. deletes all the key value pairs.
   */
  reset() {
    this.#_data = {}
    this.#_size = 0
  }
}
