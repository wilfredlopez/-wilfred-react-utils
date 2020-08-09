/**
 * Method Decorator that adds functionality to throw error if called with invalid parameteres.
 * @param allow function that returns a boolean whether the operation is allowed or not.
 * @param message message for the error when not allowed.
 * @example
 * ```ts
 * function verifyToping(top: string){
      if (typeof top !== "string") return false;
      return top.length > 6;
}

 * class IceScream {
 *  toppings: string[] = [];
 *
```
 @
```
Rejectable(verifyToping, "Toppings should have a length greater than 6")
 *  public addTopping(topping = "sprinkles") {
 *      this.toppings.push(topping);
 *    }
 *}
 ```
 */
export function Rejectable(
  allow: (...args: any[]) => boolean,
  message = "This is not allowed",
):MethodDecorator {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (allow(...args)) {
        console.log("its allowed");
        const result = original.apply(this, args);
        return result;
      } else {
        throw new Error(message);
        // return null;
      }
    };
    return descriptor;
  };
}

export function logMethod(log=true):MethodDecorator{
  return function(target, propertyKey, descriptor:PropertyDescriptor){
    const original = descriptor.value
    descriptor.value = function(){
      const targetName = target.constructor.name
      const args = [...arguments]
      let call = ''
      if(log){
        const allArgs = JSON.stringify(args[0])
        call = `${targetName}.${String(propertyKey)}(${allArgs})`
        console.time(call)
        console.log(`Calling: ${call}`)
      }
      const result = original.apply(this, arguments)   
      if(log){
        console.timeEnd(call)   
      }
      return result
    }
    return descriptor
  }
}

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


// function verifyToping(top: string){
//   if (typeof top !== "string") return false;
//   return top.length > 6;
// }

// class IceScream {
//   toppings: string[] = [];

//   @Rejectable(verifyToping, "Toppings should have a length greater than 6")
//   addTopping(topping = "sprinkles") {
//     this.toppings.push(topping);
//   }
// }

// const ice = new IceScream();

// // ice.addTopping("short"); //Error: Toppings should have a length greater than 6
// ice.addTopping("wilfred");
// console.log(ice.toppings);


/**
  * Decorator for making a method readOnly. noone will not be able to asign a new value to it.
  * @example
  * ```ts
  *  class Moon{
  *   constructor(public radius:number){}
  * 
  * ```
  * @
  * ```
  * readOnly()
  * circunference() {
  *         return 2 * Math.PI * this.radius
  *     }
  * }
  * 
  * const moon = new Moon(1.3)
  * 
  * console.log(moon.circunference()) // 8.168140899333462
  * 
  * //Trying to change the method will throw error 
  * // moon.circunference = () => 20 //Cannot assign to read only property 'circunference' of object '#<Moon>'
  * ```
 */
export function readOnly():MethodDecorator{
  return function(_target, _key, descriptor){
    descriptor.writable = false
    return descriptor
  }
}

// class Moon{
//   constructor(public radius:number){}

//   @readOnly()
//   circunference(){
//     return 2 * Math.PI * this.radius
//   }
// }

// const moon = new Moon(1.3)

// console.log(moon.circunference()) // 8.168140899333462
// //Trying to change the method will throw error 
// // moon.circunference = () => 20 //Cannot assign to read only property 'circunference' of object '#<Moon>'