/**
 * 
 * @param classType 
 * @param message 
 * @example
 * 
 * class Point {
 *   constructor(public x = 0, public y = 0){}
 * }
 * 
 * class Line {
 *     private _p0?: Point ;
 *   
 * @Validate
 * ```ts
 * (Point, 'Should be of type Point')
 * ```
 * ```ts
 set p0(value: Point | undefined) {
 *       this._p0 = value;
 *     }
 *     get p0() {
 *       return this._p0;
 *     }
 *   }
 * 
 * const line = new Line()
 * 
 * try {
 *   line.p0 = undefined
 * } catch (error) {
 *   console.log(error) // [TypeError: Should be of type Point]
 * }
 * line.p0 = new Point() // all good
 * console.log(line.p0)
 * ```
 */
export function Validate<T extends new (...args: any[]) => any>(classType:T, message = "Invalid type."){
    return function validate<T>(
        target: any,
        _propertyKey: string,
        descriptor: TypedPropertyDescriptor<T>
      ) {
        let set = descriptor.set!;
        descriptor.set = function(value: T) {
          if (!(value instanceof classType)) {
            throw new TypeError(message);
          }
          set.call(target, value);
        };
      }
}



// class Point {
//   constructor(public x = 0, public y = 0){}
// }

// class Line {
//     private _p0?: Point ;
  
//     @Validate(Point, 'Should be of type Point')
//     set p0(value: Point | undefined) {
//       this._p0 = value;
//     }
//     get p0() {
//       return this._p0;
//     }
//   }

// const line = new Line()

// try {
//   line.p0 = undefined
// } catch (error) {
//   console.log(error) // [TypeError: Should be of type Point]
// }
// line.p0 = new Point() // all good
// console.log(line.p0)