import { isInteger, keys, keysIn } from "lodash"


export function timeMethod(time = true):MethodDecorator{
    return function(target, propertyKey, descriptor:PropertyDescriptor){
      if(time){
          


        const original = descriptor.value
        descriptor.value = function(){
          const targetName = target.constructor.name
          const args = [...arguments]
          const allArgs = JSON.stringify(args[0])
          const k = `${targetName}.${String(propertyKey)}(${allArgs})`
          function getActualTime(){
            return new Date().getTime()
          }
          const start = getActualTime()
          console.time(k)
          const result = original.apply(this, arguments)
          const end = getActualTime()
          console.log(k, 
            ' took aprox:', ` ${end - start}ms`)
          console.timeEnd(k)
          return result
        }
      }
  
      return descriptor
    }
  }
  
  

  
  class IceScream {
    toppings: string[] = [];
  
    @timeMethod()
    addTopping(topping = "sprinkles") {
      this.toppings.push(topping);
    }

    sayHi(){
        return 'Hi'
    }
  }


  type AppendMethodReturnType<T, D, K extends keyof any> = T & Record<K,D> & { [P in K]: T[keyof T]};

  /**
   * 
   * @param c class of function
   * @param method method to append.
   * @param name  name of the method
   * @example
   * const ArrNew = appendMethod(Array, Math.round, 'round')
   * console.log(ArrNew.round(22.6)) // 23
   */
  function appendMethod<T extends ((...args:any[])=> any) | (new (...args:any[])=> any), D extends Function, N extends keyof any>(c:T, method: D, name:N): AppendMethodReturnType<T,D, N>{
    const descriptor:PropertyDescriptor = Reflect.getOwnPropertyDescriptor(method, 'name')!
    //@ts-ignore
    descriptor?.value = method
    //@ts-ignore
    descriptor?.writable = true

    Reflect.defineProperty(c, name,descriptor)
    const newC = Object.assign(c, {[name]: method})
    //@ts-ignore
    // c[name] = method
    c = newC
    return newC as AppendMethodReturnType<T,D, N>
  }

interface ComFunction<T = (...args:any[])=> any>{
    fn: T, 
    name: string
}



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

  let ICE = appendMethod(IceScream, new IceScream().sayHi, 'sayHi')
 const   ICERound = appendMethod(ICE, Math.round, 'round')
 
 
 function go(){
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


 
 
 
  const ice = new ICE();

console.log(ICERound.sayHi())
  // ice.addTopping("short"); //Error: Toppings should have a length greater than 6
  ice.addTopping("wilfred");
  console.log(ice.toppings);
  
  