
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

export class EnhancedObject<K extends string|number,V extends {}>{
    [K:string]:V | Function | number

    constructor(initialValues?: Record<K,V>){
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

    toArray(): V[] {
    const arr: V[] = [];
    const keys = Object.keys(this) as K[];
    for (const key of keys) {
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
        return new Promise<V[]>((res, rej) => {
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
          return callback(this.getValue(key as any) as V, key as K, index);
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
}

// interface User{
//     id:number
//     name:string
//     age:number
// }
// const en = new EnhancedObject<number, User>({1: {age: 1, id: 1, name: 'Wilfred'}})
// // const en = new EnhancedObject([1,2,4, 'pineaple', {name:'w'}, {'data': [{'name': 2}]}])
// console.log(en.isEmpty())

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