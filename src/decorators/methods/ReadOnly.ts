
/**
  * Decorator for making a method ReadOnly. noone will not be able to asign a new value to it.
  * @example
  * ```ts
  *  class Moon{
  *   constructor(public radius:number){}
  * 
  * ```
  * @
  * ```
  * ReadOnly()
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
export function ReadOnly():MethodDecorator{
    return function(_target, _key, descriptor){
      descriptor.writable = false
      return descriptor
    }
  }
  
  // class Moon{
  //   constructor(public radius:number){}
  
  //   @ReadOnly()
  //   circunference(){
  //     return 2 * Math.PI * this.radius
  //   }
  // }
  
  // const moon = new Moon(1.3)
  
  // console.log(moon.circunference()) // 8.168140899333462
  // //Trying to change the method will throw error 
  // // moon.circunference = () => 20 //Cannot assign to read only property 'circunference' of object '#<Moon>'