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
export class Mapper<V extends any, K extends string | number = string> {
  //private properties
  //   sss: Record<K,T> = {}
  #_data: Record<K, V> = {} as Record<K, V>;
  #_size = 0;
  constructor(initialData?: Record<K, V>) {
    this.#_data = initialData || {} as Record<K, V>;
  }

  /**
   * Length of the keys stored.
   * cannot be set from outside.
   */
  get length() {
    return this.#_size;
  }

  /**
   * @deprecated use .length
   */
  get size() {
    return this.#_size;
  }

  isEmpty() {
    return this.#_size === 0;
  }

  toString() {
    if (this.isEmpty()) {
      return "{}";
    }
    return JSON.stringify(this.data);
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
  *[Symbol.iterator](): IterableIterator<V> {
    const keys = Object.keys(this.#_data) as K[];
    for (const key of keys) {
      yield this.get(key)!;
    }
  }

  /**
   * @returns { IterableIterator<V> } Array of the values. V[ ]
   * 
   */
  *values(): IterableIterator<V> {
    // return this.toArray;
    for (const key of this.keys()) {
      yield this.get(key)!;
    }
  }

  /**
   * Returns an iterable of key, value pairs for every entry.
   * same as the array method.
   * @example
   * const map = new Mapper({ 1: "one", 2: "two" });
   * for (let [key, val] of map.entries()) {
   *   console.log(key, val); // 1 'one', 2 'two'
   * }
   * //or 
   * const data = [...map.entries()]; //  [[1,'one'], [2, 'two']]
   */
  *entries(): IterableIterator<[K, V]> {
    for (const key of this.keys()) {
      yield [key, this.get(key)!];
    }
  }

  /**
   * 
   * @returns { Array<V> } Array of the values. V[ ]
   */
  toArray(): V[] {
    const arr: V[] = [];
    const keys = Object.keys(this.#_data) as K[];
    for (const key of keys) {
      arr.push(this.get(key)!);
    }
    return arr;
  }

  /**
   * Returns the data object with all [key]:value pairs.
   * this cannot be set from the outside
   */
  get data() {
    return this.#_data;
  }

  /**
   * Deletes the value of the last key (ussually works but could be any key since there's no real order).
   * @see Not recommended. Better call delete with the key you want to delete.
   */
  pop() {
    if (this.length === 0) return null;
    const lastKey = this.keys()[this.length - 1];
    return this.delete(lastKey);
  }

  /**
   * Deletes the value of the first key (ussually works but could be any key since there's no real order).
   * @see Not recommended. Better call delete with the key you want to delete.
   */
  unshift() {
    if (this.length === 0) return null;
    const fistKey = this.keys()[0] as K;
    return this.delete(fistKey);
  }

  /**
   * returns a promise of an array with all the values.
   * @example
   * const map = new Mapper({ "wil": { name: "wilfred" } });
   * async function init() {
   *   const data = await map.promise;
   *   console.log(data[0].name); // 'wilfred'
   * }
   * init();
   * //OR
   * map.promise.then((data) => {
   *   console.log(data[0].name); // 'wilfred'
   * })
   */
  get promise() {
    return new Promise<V[]>((res, rej) => {
      res(this.toArray());
    });
  }

  /**
   * Sets the key value pair.
   * @param key key to use for the value
   * @param value value to save
   */
  set(key: K, value: V) {
    this.#_data[key] = value;
    this.#_size++;
    return this;
  }

  /**
   * Sets the key value pair only if the key doesnt exist already.
   * @param key key of the value
   * @param value value to save if key doesnt exist.
   */
  setIfUndefined(key: K, value: V) {
    if (this.has(key)) {
      return this;
    }
    this.#_data[key] = value;
    this.#_size++;
    return this;
  }

  /**
   * Returns the value or null if it doesnt exist.
   * @param key key of the value
   */
  get(key: K, fallback: V): V;
  get(key: K): V | null;
  get(key: K, fallback?: V): V | null {
    return this.has(key) ? this.#_data[key] : fallback ? fallback : null;
  }

  /**
   * Returns the value or the fallback if the value doenst exist.
   * @param  { K } key the key of the value.
   * @param {any} fallback fallback return type.
   * @example
   * const map = new Mapper<string, number>();
   * map.set(1, "One");
   * const stringOrError = map.getOrFallback<Error>(1, new Error("Doest exist"));
   */
  getOrFallback<D extends any>(key: K, fallback: D) {
    return this.#_data[key] !== undefined ? this.#_data[key] : fallback;
  }

  has(key: K) {
    return this.#_data[key] !== undefined;
  }

  /**
   * Returns the value if delete was success. null if the value was not found.
   * @param key key of the value
   */
  delete(key: K) {
    if (this.has(key)) {
      const temp = this.#_data[key];
      delete this.#_data[key];
      this.#_size--;
      return temp;
    }
    return null;
  }

  /**
   * Returns an array that contains all the keys
   */
  keys() {
    return Object.keys(this.#_data) as K[];
  }

  /**
   * Maps overeach value, key and index of the key.
   * @param callback Iterator function. takes tha value, key, index (in that order).
   */
  map<R extends any>(callback: (value: V, key: K, index: number) => R) {
    return Object.keys(this.#_data).map<R>((key, index) => {
      return callback(this.get(key as K) as V, key as K, index);
    });
  }

  /**
   * Calls the callback function for each value, key and index of the key.
   * @param callback Iterator function. takes tha value, key, index (in that order).
   */
  forEach(callback: (value: V, key: K, index: number) => void) {
    return Object.keys(this.#_data).forEach((key, index) => {
      return callback(this.get(key as K) as V, key as K, index);
    });
  }

  /**
   * Resets the map. deletes all the key value pairs.
   */
  reset() {
    this.#_data = {} as any;
    this.#_size = 0;
    return this;
  }
}
