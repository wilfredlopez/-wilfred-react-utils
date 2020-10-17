import { deepCopy } from '../utils/multiuse'
import { Decorators } from '../decorators'
import { getKeyValuePair } from './getKeyValuePair'

/**
 * Creates a javascript object with extra functionality.
 * Built-In Functions are prexfixed with $ to avoid collitions with keys you might want to use.
 * It provides utility functions like $copy, $map, $keys, $forEach, $has, $isEmpty, $toPromise, $toArray, etc.
 * It has a getter for the length ($length). and you can use it in (for of) loops.
 * To access you can use bracket notation or $get function.
 * @param initialValues [Optional] an object with key value pairs. or an array. If is array the array index is used as the key unless you pass 2nd parameter to map the keys.
 * @param mapToKey [Optional] Map the keys passing a function that receives the initialValues and should return a key value pair. (initialValues:any) => Record<K, V>
 * @example
 * interface User{
 *     id:number
 *     name:string
 *     age:number
 * }
 * const obj = new EnhancedObject<number, User>({1:{age:30,id: 1,name:'Wilfred'}})
 *
 * obj.$isEmpty() //false
 * obj.$set(2, {age: 20, id: 2, name: "Theudy"})
 * obj.$has(2) //true
 * console.log(obj[2]) // { age: 20, id: 2, name: 'Theudy' }
 * obj.$length // 2
 * obj.$get(1000, 'value doesnt exist')// returns 'value doesnt exist'
 *
 * for(let [id, user] of obj.$entries()){
 *     console.log(id) // returns the current user id
 *     console.log(user) // returns the user object.
 * }
 *
 * for(let user of obj){
 *     console.log(user) // returns the user object on by one.
 * }
 * @example //usign 2nd argument
 * const users: User[] = [{ age: 30, id: 100, name: 'Wilfred' }, { age: 27, id: 325, name: 'Theudy' }]
 * const mapUserToRecord = (data: User[]) => data
 *  .reduce((prev: Record<number, User>, curr) => Object
 *    .assign(prev, ({ [curr.id]: curr })), {})
 *
 * const usersObj = new EnhancedObject<number, User>(users,(data) => mapUserToRecord(data))
 *
 * console.log(usersObj.toString())
 * // returns {100: {"age": 30,"id": 100,"name": "Wilfred"},325: {"age": 27,"id": 325,"name": "Theudy"}}
 */
export class EnhancedObject<K extends string | number, V extends {}> {
  [K: string]: V | Function | number | Record<K, V>

  constructor(
    initialValues?: any[] | (Record<K, V> | EnhancedObject<K, V>),
    mapToKey: (values: any) => Record<K, V> = getKeyValuePair
  ) {
    if (typeof initialValues !== 'undefined') {
      const vals = mapToKey(initialValues)
      for (let k of Object.keys(vals)) {
        this.$set(k as K, vals[k as K])
      }
    }
  }

  get $length() {
    return this.$keys().length
  }

  @Decorators.ReadOnly()
  $toString() {
    if (this.$isEmpty()) {
      return '{}'
    }

    return JSON.stringify(this, null, 4)
  }

  @Decorators.ReadOnly()
  toString() {
    return this.$toString()
  }

  [Symbol.toStringTag]() {
    return this.toString()
  }

  /**
   * Returns a new array with each key value pair.
   */
  @Decorators.ReadOnly()
  $toObjectArray() {
    const arr: Record<K, V>[] = []
    const keys = Object.keys(this) as K[]
    for (const key of keys) {
      //@ts-ignore
      arr.push({ [key as K]: this.$get(key as any)! })
    }
    return deepCopy(arr)
  }

  @Decorators.ReadOnly()
  $copy(): Record<K, V> {
    return deepCopy(this) as Record<K, V>
  }

  @Decorators.ReadOnly()
  $toArray(): V[] {
    const arr: V[] = []
    const keys = Object.keys(this) as K[]
    for (const key of keys) {
      //@ts-ignore
      arr.push(this.$get(key as any)!)
    }

    return arr
  }

  @Decorators.ReadOnly()
  $isEmpty() {
    return this.$keys().length === 0
  }

  set [Symbol.iterator](_data: any) {
    //making sure users cant override this function setting this[Symbol.iterator] = null
    return
  }

  get [Symbol.iterator]() {
    const that = this
    function* iter() {
      const keys = Object.keys(that) as K[]
      for (const key of keys) {
        yield that.$get(key as any) as V
      }
    }
    return iter
  }

  get $data(): Record<K, V> {
    return this as Record<K, V>
  }

  @Decorators.ReadOnly()
  $toPromise() {
    return new Promise<Array<V>>((res, rej) => {
      res(this.$toArray())
    })
  }

  $get<D extends any>(key: K, defaultVal: D): V | D
  $get<D extends any>(key: K): V | null

  @Decorators.ReadOnly()
  $get<D extends any = null>(key: K, defaultVal = null): V | D | null {
    if (this.$has(key)) {
      return this[key] as V
    }
    return defaultVal
  }

  /**
   * sets the value and overrides if key was already in use.
   * if it's a not a save key it will console log a warning. invalid keys would be existing function on the class that cant be modified.
   * @param key
   * @param value
   * @param replace [Optional] Defaults to true. if you dont want to replace value if already defined you can pass false.
   */
  @Decorators.ReadOnly()
  $set(key: K, value: V, replace = true) {
    return this.$setIfNotExists(key, value, replace) //passing true for replacing the value
  }

  /**
   * Sets the value if key doesnt exits
   * @param key
   * @param value
   * @param replace [Optional] defaults to false.
   */
  @Decorators.ReadOnly()
  $setIfNotExists(key: K, value: V, replace = false) {
    if (this.$has(key) && !replace) {
      return this
    }
    if (this.$isSaveKey(key)) {
      this[key as any] = value
    } else {
      if (process.env.NODE_ENV !== 'test') {
        console.warn(
          `The key '${key}' is not asignable to ${EnhancedObject.name}`
        )
      }
      // throw new Error(`The key '${key}' is not asignable to ${EnhancedObject.name}`)
    }
    return this
  }

  /**
   * Update values from a different object.
   * @param data a key value pair object or another EnchancedObject instance. example: {222: {price: 299, description:'desc..'}}
   * @param shouldAddIfNotExists [Optional] Defaults to false. if you want to add all other values in the data pass true.
   */
  @Decorators.ReadOnly()
  $update(
    data: Record<K, V> | EnhancedObject<K, V>,
    shouldAddIfNotExists = false
  ) {
    for (let key in data) {
      if (this.$has(key as K) || shouldAddIfNotExists)
        this.$set(key as K, data[key as K] as V)
    }
    return this
  }

  @Decorators.ReadOnly()
  $has(key: K) {
    return typeof this[key] !== 'undefined'
  }

  $delete<F extends any>(key: K, defaultVal: F): V | F
  $delete<F extends any>(key: K): V | null
  @Decorators.ReadOnly()
  $delete<F extends any>(key: K, fallback: F | null = null): V | F | null {
    if (this.$has(key) && this.$isSaveKey(key)) {
      const temp = this[key]!
      delete this[key]
      return temp as V
    }
    return fallback
  }

  @Decorators.ReadOnly()
  $keys() {
    return Object.keys(this)
  }

  @Decorators.ReadOnly()
  $map<R extends any>(callback: (value: V, key: K, index: number) => R) {
    return Object.keys(this).map<R>((key, index) => {
      return callback(deepCopy(this.$get(key as any)) as V, key as K, index)
    })
  }

  @Decorators.ReadOnly()
  $forEach(callback: (value: V, key: K, index: number) => void) {
    return Object.keys(this).forEach((key, index) => {
      return callback(this.$get(key as any) as V, key as K, index)
    })
  }

  @Decorators.ReadOnly()
  $values() {
    return Object.values(this) as V[]
  }
  @Decorators.ReadOnly()
  $clear() {
    this.$keys().forEach(k => {
      this.$delete(k as K)
    })
    return this
  }

  @Decorators.ReadOnly()
  public $isSaveKey(key: K) {
    return !Reflect.ownKeys(EnhancedObject.prototype).includes(String(key))
  }

  @Decorators.ReadOnly()
  *$entries(): IterableIterator<[K, V]> {
    for (const key of this.$keys()) {
      yield [key as K, this.$get(key as any)!]
    }
  }
}

// interface User {
//   id: number
//   name: string
//   age: number
// }

// const users: User[] = [{ age: 30, id: 100, name: 'Wilfred' }, { age: 27, id: 325, name: 'Theudy' }]
// const mapUserToRecord = (data: User[]) => data
//   .reduce((prev: Record<number, User>, curr) => Object
//     .assign(prev, ({ [curr.id]: curr })), {})

// const obj = new EnhancedObject(users, (data) => mapUserToRecord(data))

// console.log(obj.toString())
// const userRecord = { 1: { age: 30, id: 1, name: 'Wilfred' } }
// const obj = new EnhancedObject(userRecord)

// console.log(obj.$isEmpty())//false
// obj.$set(2, { age: 20, id: 2, name: "Theudy" })
// console.log(obj.$has(2)) //true
// console.log(obj[2]) // { age: 20, id: 2, name: 'Theudy' }
// console.log(obj._length) // 2
// obj.$get(1000, 'value doesnt exist')// returns 'value doesnt exist'

// for (let [id, user] of obj.$entries())
// {
//   console.log(id) // returns the current user id
//   console.log(user) // returns the user object.
// }

// for (let user of obj.$values())
// {
//   console.log(user) // returns the user object on by one.
// }
