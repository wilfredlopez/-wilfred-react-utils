
export type AppendMethodReturnType<T, D, K extends keyof any> = T & Record<K,D> & { [P in K]: T[keyof T]};

  /**
   * Append static method to a class or a function. types are infered.
   * @param c class of function
   * @param method method to append.
   * @param name  name of the method
   * @example
   * const ArrNew = appendMethod(Array, Math.round, 'round')
   * console.log(ArrNew.round(22.6)) // 23
   */
  export function appendMethod<T extends ((...args:any[])=> any) | (new (...args:any[])=> any), D extends Function, N extends keyof any>(c:T, method: D, name:N): AppendMethodReturnType<T,D, N>{
    const descriptor:PropertyDescriptor = Reflect.getOwnPropertyDescriptor(method, 'name') || {}
    //@ts-ignore
    descriptor.value = method
    //@ts-ignore
    descriptor.writable = true

    Reflect.defineProperty(c, name,descriptor)
    const newC = Object.assign(c, {[name]: method})
    //@ts-ignore
    // c[name] = method
    c = newC
    return newC as AppendMethodReturnType<T,D, N>
  }

// class Math2{}

// let MathCombined= {} as Math & Math2 
// for(let key of Reflect.ownKeys(Math)){
//     const fn = Math[key as keyof Math]
//     if(typeof fn === 'function'){
//         //@ts-ignore
//         MathCombined = appendMethod(Math2, fn, String(key))
//     }else{
//         //@ts-ignore
//         MathCombined[key] = fn
//     }
// }


// const ArrNew = appendMethod(Array, Math.round, 'round')
// console.log(ArrNew.round(22.6)) // 23

interface ComFunction<T = (...args:any[])=> any>{
    fn: T, 
    name: string
}



//THIS DOESNT PROVIDE TYPE INFERANCES FOR THE FUNCTIONS :(
/**
 * Append multiple functions to class or function as static methods.
 * @param baseClass class or function
 * @param data array of key value pairs of functions and names [{fn: Function, name:string}]
 * @example
 *  function go(){
 }
 const fns=[
    {
        fn: Math.round,
        name: 'round' as const
    },
    {
       fn:Math.abs,
       name: 'abs' as const
   }
]
 const Test = multiAppendMethod(go,  fns)
console.log(Test.abs(-20)) //20
console.log(Test.round(20.55)) // 21
 */
function multiAppendMethod<T extends ((...args:any[])=> any) | (new (...args:any[])=> any), FNS extends ComFunction[]>
(baseClass:T, data:FNS){
    if(data.length === 0){
        throw new Error("An empty array is not valid for multiMakeStatic.")
    }
    let base = appendMethod(baseClass, data[0].fn, data[0].name)  
    for(let i=1; i < data.length; i++){
        const name = data[i].name
        const fn = data[i].fn
        base = appendMethod(base, fn, name)
    }
      return base as AppendMethodReturnType<Function, typeof data[0]['fn'], typeof data[0]['name']>
  }

 
 
//  function go(){
//  }
//  const fns=[
//     {
//         fn: Math.round,
//         name: 'round' as const
//     },
//     {
//        fn:Math.abs,
//        name: 'abs' as const
//    }
// ]
//  const Test = multiAppendMethod(go,  fns)
// console.log(Test.abs(-20)) //20
// console.log(Test.round(20.55)) // 21


 
 

  