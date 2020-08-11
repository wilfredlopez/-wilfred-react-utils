import { maxBy } from 'lodash'
import {deepCopy} from '../utils/multiuse'
function getKeyValuePair(data: Record<any, any>){
    let record:Record<any,any> = {}
    //loop back each if is array.
    if(Array.isArray(data)){
        for(let val of data){
            record = Object.assign(record, getKeyValuePair(val)) 
        }
    }//proceed if is object
    else if(typeof data === 'object'){
        for(let k of Object.keys(data)){
            record[k] = data[k]
        }
    }
    else{
        //if is of type string|number|boolean asign same value as key.
        record[data] = data      
    }
    return record
}


/**
 * Creates a javascript object with extra functionality. you can still do the same operations as using the {} notation.
 * It provides utility functions like copy, map, keys, forEach, has, isEmpty, toPromise, toArray, etc.
 * It has a getter for the length. and you can use it in (for of) loops.
 * To access you can use bracket notation or getValue function. 
 * @example
 * 
 * interface User{
 *     id:number
 *     name:string
 *     age:number
 * }
 * const obj = new EnhancedObject<number, User>({1:{age:30,id: 1,name:'Wilfred'}})
 * 
 * obj.isEmpty() //false
 * obj.setValue(2, {age: 20, id: 2, name: "Theudy"})
 * obj.has(2) //true
 * console.log(obj[2]) // { age: 20, id: 2, name: 'Theudy' }
 * obj.length // 2
 * obj.getValue(1000, 'value doesnt exist')// returns 'value doesnt exist'
 * 
 * for(let [id, user] of obj.entries()){
 *     console.log(id) // returns the current user id
 *     console.log(user) // returns the user object.
 * }
 * 
 * for(let user of obj){
 *     console.log(user) // returns the user object on by one.
 * }
 */
export class EnhancedObject<K extends string|number,V extends {}>{
    [K:string]:V | Function | number

    constructor(initialValues?: Record<K,V> |  Record<K,V>[] | EnhancedObject<K, V>){
        if(typeof initialValues !== 'undefined'){
            const vals = getKeyValuePair(initialValues)
            for(let k of Object.keys(vals)){
                this[k] = vals[k as K]
            }           
        }
    }

    get length(){
        return this.keys().length
    }

    toString(){
        if (this.isEmpty()) {
            return "{}";
          }
          
          return JSON.stringify(this, null, 4);
    }

    [Symbol.toStringTag](){
       return this.toString()
      }

    toObjectArray(){
        const arr: Record<K,V>[] = [];
        const keys = Object.keys(this) as K[];
        for (const key of keys) {
            //@ts-ignore
            arr.push({[key as K]: this.getValue(key as any)!});
        }
        return deepCopy(arr)
    }

    copy():  Record<K,V>{
        const arr: Record<K,V>[] = [];
        const keys = Object.keys(this) as K[];
        for (const key of keys) {
            //@ts-ignore
            arr.push({[key as K]: this.getValue(key as any)!});
        }
    
        return deepCopy(this) as Record<K,V>;
    }

    toArray():  V[] {
    const arr: V[] = [];
    const keys = Object.keys(this) as K[];
    for (const key of keys) {
        //@ts-ignore
        arr.push(this.getValue(key as any)!);
    }

    return arr;
    }

    isEmpty() {
        return this.keys().length === 0;
      }

    *[Symbol.iterator]() {
        const keys = Object.keys(this) as K[];
        for (const key of keys) {
          yield this.getValue(key as any) as V;
        }
      }

    toPromise() {
        return new Promise<Array<V>>((res, rej) => {
          res(this.toArray());
        });
    }

    getValue<D>(key:K, defaultVal:D):V | D
    getValue<D>(key:K):V|null
    getValue<D = null>(key:K, defaultVal = null):V | D | null{
        if(typeof this[key] !== 'undefined'){
            return this[key] as V
        }
        return defaultVal
    }

    setValue(key:K, value:V){
        this[key as any] = value
        return this
    }

    has(key: K) {
        return this[key] !== undefined;
    }

    delete(key: K) {
        if (this.has(key)) {
          const temp = this[key];
          delete this[key];
          return temp;
        }
        return null;
    }

    keys(){
        return Object.keys(this)
    }

    map<R extends any>(callback: (value: V, key: K, index: number) => R) {
        return Object.keys(this).map<R>((key, index) => {
          return callback(deepCopy(this.getValue(key as any)) as V, key as K, index);
        });
    }

    forEach(callback: (value: V, key: K, index: number) => void) {
        return Object.keys(this).forEach((key, index) => {
          return callback(this.getValue(key as any) as V, key as K, index);
        });
    }
    values(){
        return Object.values(this)
    }
    reset(){
        this.keys().forEach((k) => {
            this.delete(k as K)
        })
        return this
    }

    *entries(): IterableIterator<[K, V]> {
        for (const key of this.keys()) {
          yield [key as K, this.getValue(key as any)!];
        }
      }
}

// interface User{
//     id:number
//     name:string
//     age:number
// }
// const obj = new EnhancedObject<number, User>({1: {age: 30, id: 1, name: 'Wilfred'}})

// obj.isEmpty() //false
// obj.setValue(2, {age: 20, id: 2, name: "Theudy"})
// obj.has(2) //true
// console.log(obj[2]) // { age: 20, id: 2, name: 'Theudy' }
// obj.length // 2
// obj.getValue(1000, 'value doesnt exist')// returns 'value doesnt exist'
// for(let [id, user] of obj.entries()){
//     console.log(id) // returns the current user id
//     console.log(user) // returns the user object.
// }
// for(let user of obj){
//     console.log(user) // returns the user object.
// }


// const en = new EnhancedObject([1,2,4, 'pineaple', {name:'w'}, {'data': [{'name': 2}]}])

// for(let val of en){
//     console.log(val)
// }
// console.log(en.toString())
// console.log(String(en))
// // en.setValue(2, {age: 2, id: 2, name: "Lopez"})

// const user = en.getValue(1)
// console.log(user)
// console.log(en[1])
// console.log(en.keys())
// console.log(en.length)
// console.log(en.values())
// console.log(en.getValue(2))