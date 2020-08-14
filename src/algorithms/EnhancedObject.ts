import { deepCopy } from "../utils/multiuse";
import { Decorators } from "../decorators";
import { getKeyValuePair } from './getKeyValuePair'

/**
 * Creates a javascript object with extra functionality.
 * Built-In Functions are prexfixed with $ to avoid collitions with keys you might want to use.
 * It provides utility functions like $copy, $map, $keys, $forEach, $has, $isEmpty, $toPromise, $toArray, etc.
 * It has a getter for the length ($length). and you can use it in (for of) loops.
 * To access you can use bracket notation or $getValue function. 
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
 * obj.$setValue(2, {age: 20, id: 2, name: "Theudy"})
 * obj.$has(2) //true
 * console.log(obj[2]) // { age: 20, id: 2, name: 'Theudy' }
 * obj.$length // 2
 * obj.$getValue(1000, 'value doesnt exist')// returns 'value doesnt exist'
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
export class EnhancedObject<K extends string | number, V extends {}>  {
  [K: string]: V | Function | number

  constructor(
    initialValues?: any,
    mapToKey: (values: any) => Record<K, V> = getKeyValuePair
  ) {
    if (typeof initialValues !== "undefined")
    {
      const vals = mapToKey(initialValues);
      for (let k of Object.keys(vals))
      {
        this.$setValue(k as K, vals[k as K])
      }
    }
  }

  get $length() {
    return this.$keys().length;
  }

  @Decorators.ReadOnly()
  $toString() {
    if (this.$isEmpty())
    {
      return "{}";
    }

    return JSON.stringify(this, null, 4);
  }

  @Decorators.ReadOnly()
  toString() {
    return this.$toString();
  }

  [Symbol.toStringTag]() {
    return this.toString();
  }

  /**
   * Returns a new array with each key value pair.
   */
  @Decorators.ReadOnly()
  $toObjectArray() {
    const arr: Record<K, V>[] = [];
    const keys = Object.keys(this) as K[];
    for (const key of keys)
    {
      //@ts-ignore
      arr.push({ [key as K]: this.$getValue(key as any)! });
    }
    return deepCopy(arr);
  }

  @Decorators.ReadOnly()
  $copy(): Record<K, V> {
    return deepCopy(this) as Record<K, V>;
  }

  @Decorators.ReadOnly()
  $toArray(): V[] {
    const arr: V[] = [];
    const keys = Object.keys(this) as K[];
    for (const key of keys)
    {
      //@ts-ignore
      arr.push(this.$getValue(key as any)!);
    }

    return arr;
  }

  @Decorators.ReadOnly()
  $isEmpty() {
    return this.$keys().length === 0;
  }

  set [Symbol.iterator](data: any) {
    return;
  }

  get [Symbol.iterator]() {
    const that = this;
    function* iter() {
      const keys = Object.keys(that) as K[];
      for (const key of keys)
      {
        yield that.$getValue(key as any) as V;
      }
    }
    return iter;
  }


  //@ts-ignore
  get $data(): Record<K, V> {
    return this as Record<K, V>
  }

  @Decorators.ReadOnly()
  $toPromise() {
    return new Promise<Array<V>>((res, rej) => {
      res(this.$toArray());
    });
  }

  $getValue<D extends any>(key: K, defaultVal: D): (V | D);
  $getValue<D extends any>(key: K): V | null;

  @Decorators.ReadOnly()
  $getValue<D extends any = null>(key: K, defaultVal = null): V | D | null {
    if (this.$has(key))
    {
      return this[key] as V;
    }
    return defaultVal;
  }


  @Decorators.ReadOnly()
  /**
     * sets the value if is a save key to set. invalid keys would be existing function on the object.
     */
  $setValue(key: K, value: V) {
    if (this.$isSaveKey(key))
    {
      this[key as any] = value;
    } else
    {
      if (process.env.NODE_ENV !== "test")
      {
        console.warn(
          `The key '${key}' is not asignable to ${EnhancedObject.name}`,
        );
      }
      // throw new Error(`The key '${key}' is not asignable to ${EnhancedObject.name}`)
    }
    return this;
  }

  @Decorators.ReadOnly()
  $has(key: K) {
    return typeof this[key] !== "undefined";
  }

  @Decorators.ReadOnly()
  $deleteValue(key: K) {
    if (this.$has(key))
    {
      const temp = this[key];
      delete this[key];
      return temp;
    }
    return null;
  }

  @Decorators.ReadOnly()
  $keys() {
    return Object.keys(this);
  }

  @Decorators.ReadOnly()
  $map<R extends any>(callback: (value: V, key: K, index: number) => R) {
    return Object.keys(this).map<R>((key, index) => {
      return callback(
        deepCopy(this.$getValue(key as any)) as V,
        key as K,
        index,
      );
    });
  }

  @Decorators.ReadOnly()
  $forEach(callback: (value: V, key: K, index: number) => void) {
    return Object.keys(this).forEach((key, index) => {
      return callback(this.$getValue(key as any) as V, key as K, index);
    });
  }

  @Decorators.ReadOnly()
  $values() {
    return Object.values(this) as V[];
  }
  @Decorators.ReadOnly()
  $reset() {
    this.$keys().forEach((k) => {
      this.$deleteValue(k as K);
    });
    return this;
  }

  @Decorators.ReadOnly()
  public $isSaveKey(key: K) {
    return !Reflect.ownKeys(EnhancedObject.prototype).includes(String(key));
  }

  @Decorators.ReadOnly()
  *$entries(): IterableIterator<[K, V]> {
    for (const key of this.$keys())
    {
      yield [key as K, this.$getValue(key as any)!];
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

// const obj = new EnhancedObject<number, User>(users, (data) => mapUserToRecord(data))

  // console.log(obj.toString())

  // const obj = new EnhancedObject<number, User>({ 1: { age: 30, id: 1, name: 'Wilfred' } })

// console.log(obj.$isEmpty())//false
// obj._setValue(2, { age: 20, id: 2, name: "Theudy" })
// console.log(obj._has(2)) //true
// console.log(obj[2]) // { age: 20, id: 2, name: 'Theudy' }
// console.log(obj._length) // 2
// obj._getValue(1000, 'value doesnt exist')// returns 'value doesnt exist'

// for (let [id, user] of obj._entries())
// {
//   console.log(id) // returns the current user id
//   console.log(user) // returns the user object.
// }

// for (let user of obj._values())
// {
//   console.log(user) // returns the user object on by one.
// }