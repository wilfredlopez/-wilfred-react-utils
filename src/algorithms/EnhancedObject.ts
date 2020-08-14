import { deepCopy } from "../utils/multiuse";
import { Decorators } from "../decorators";
import { getKeyValuePair } from './getKeyValuePair'



/**
 * Creates a javascript object with extra functionality. you can still do the same operations as using the {} notation.
 * Built-In Functions are prexfixed with _ to avoid collitions with keys you might want to use.
 * It provides utility functions like _copy, _map, _keys, _forEach, _has, _isEmpty, _toPromise, _toArray, etc.
 * It has a getter for the length (_length). and you can use it in (for of) loops.
 * To access you can use bracket notation or _getValue function. 
 * @param initialValues an object with key value pairs. or an array. If is array the array index is used as the key.
 * @example
 * 
 * interface User{
 *     id:number
 *     name:string
 *     age:number
 * }
 * const obj = new EnhancedObject<number, User>({1:{age:30,id: 1,name:'Wilfred'}})
 * 
 * obj._isEmpty() //false
 * obj._setValue(2, {age: 20, id: 2, name: "Theudy"})
 * obj._has(2) //true
 * console.log(obj[2]) // { age: 20, id: 2, name: 'Theudy' }
 * obj._length // 2
 * obj._getValue(1000, 'value doesnt exist')// returns 'value doesnt exist'
 * 
 * for(let [id, user] of obj._entries()){
 *     console.log(id) // returns the current user id
 *     console.log(user) // returns the user object.
 * }
 * 
 * for(let user of obj){
 *     console.log(user) // returns the user object on by one.
 * }
 */
export class EnhancedObject<K extends string | number, V extends {}>  {
  [K: string]: V | Function | number

  constructor(
    initialValues?: any
  ) {
    if (typeof initialValues !== "undefined")
    {
      const vals = getKeyValuePair(initialValues);
      for (let k of Object.keys(vals))
      {
        this._setValue(k as K, vals[k])

        // if (typeof vals[k] === 'object')
        // {
        //   this[k] = { [k]: vals[k as K] } as V
        //   // console.log('se')
        // } else
        // {

        // }
      }
    }
  }

  get _length() {
    return this._keys().length;
  }

  @Decorators.ReadOnly()
  _toString() {
    if (this._isEmpty())
    {
      return "{}";
    }

    return JSON.stringify(this, null, 4);
  }

  @Decorators.ReadOnly()
  toString() {
    return this._toString();
  }

  [Symbol.toStringTag]() {
    return this.toString();
  }

  /**
   * Returns a new array with each key value pair.
   */
  @Decorators.ReadOnly()
  _toObjectArray() {
    const arr: Record<K, V>[] = [];
    const keys = Object.keys(this) as K[];
    for (const key of keys)
    {
      //@ts-ignore
      arr.push({ [key as K]: this._getValue(key as any)! });
    }
    return deepCopy(arr);
  }

  @Decorators.ReadOnly()
  _copy(): Record<K, V> {
    return deepCopy(this) as Record<K, V>;
  }

  @Decorators.ReadOnly()
  _toArray(): V[] {
    const arr: V[] = [];
    const keys = Object.keys(this) as K[];
    for (const key of keys)
    {
      //@ts-ignore
      arr.push(this._getValue(key as any)!);
    }

    return arr;
  }

  @Decorators.ReadOnly()
  _isEmpty() {
    return this._keys().length === 0;
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
        yield that._getValue(key as any) as V;
      }
    }
    return iter;
  }


  //@ts-ignore
  get _data(): Record<K, V> {
    return this as Record<K, V>
  }

  @Decorators.ReadOnly()
  _toPromise() {
    return new Promise<Array<V>>((res, rej) => {
      res(this._toArray());
    });
  }

  _getValue<D extends any>(key: K, defaultVal: D): (V | D);
  _getValue<D extends any>(key: K): V | null;

  @Decorators.ReadOnly()
  _getValue<D extends any = null>(key: K, defaultVal = null): V | D | null {
    if (this._has(key))
    {
      return this[key] as V;
    }
    return defaultVal;
  }


  @Decorators.ReadOnly()
  /**
     * sets the value if is a save key to set. invalid keys would be existing function on the object.
     */
  _setValue(key: K, value: V) {
    if (this._isSaveKey(key))
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
  _has(key: K) {
    return typeof this[key] !== "undefined";
  }

  @Decorators.ReadOnly()
  _deleteValue(key: K) {
    if (this._has(key))
    {
      const temp = this[key];
      delete this[key];
      return temp;
    }
    return null;
  }

  @Decorators.ReadOnly()
  _keys() {
    return Object.keys(this);
  }

  @Decorators.ReadOnly()
  _map<R extends any>(callback: (value: V, key: K, index: number) => R) {
    return Object.keys(this).map<R>((key, index) => {
      return callback(
        deepCopy(this._getValue(key as any)) as V,
        key as K,
        index,
      );
    });
  }

  @Decorators.ReadOnly()
  _forEach(callback: (value: V, key: K, index: number) => void) {
    return Object.keys(this).forEach((key, index) => {
      return callback(this._getValue(key as any) as V, key as K, index);
    });
  }

  @Decorators.ReadOnly()
  _values() {
    return Object.values(this) as V[];
  }
  @Decorators.ReadOnly()
  _reset() {
    this._keys().forEach((k) => {
      this._deleteValue(k as K);
    });
    return this;
  }

  @Decorators.ReadOnly()
  public _isSaveKey(key: K) {
    return !Reflect.ownKeys(EnhancedObject.prototype).includes(String(key));
  }

  @Decorators.ReadOnly()
  *_entries(): IterableIterator<[K, V]> {
    for (const key of this._keys())
    {
      yield [key as K, this._getValue(key as any)!];
    }
  }
}

// interface User {
//   id: number
//   name: string
//   age: number
// }
// const obj = new EnhancedObject<number, User>({ 1: { age: 30, id: 1, name: 'Wilfred' } })

// console.log(obj._isEmpty())//false
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