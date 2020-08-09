

export type AccesorDecorator<T> = (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T>;

/**
 * Decorator for adding tax rate to a class accesor [get]
 * @param rate tax rate 
 * @example
 * ```ts
 * const GLOBAL_TAX_RATE = 0.15
 * 
 * class Product {
 *   #_price: number;
 *   constructor(price: number) {
 *     this.#_price = price;
 *   }
 * 
 *   get rawPrice(){
 *     return this.#_price
 *   }
```
@
```
WithTax(GLOBAL_TAX_RATE)
 *   get price() {
 *     return this.#_price;
 *   }
 * 
 *   set rawPrice(newP:number){
 *     this.#_price = newP
 *   }
 * }
 * 
 * const product = new Product(20);
 * console.log(product.rawPrice); // 20 (price with tax rate)
 * console.log(product.price); // 23 (price with tax rate)
```
 */
export function WithTax(rate: number) :AccesorDecorator<number>{
  return function (
    _target,
    _key,
    descriptor
  ) {
    const original = descriptor.get;
    descriptor.get = function () {
      const result = original!.apply(this);
      return parseFloat((result * (1 + rate)).toFixed(2))
    };
    return descriptor
  };
}


// const GLOBAL_TAX_RATE = 0.15

// class Product {
//   #_price: number;
//   constructor(price: number) {
//     this.#_price = price;
//   }

//   get rawPrice(){
//     return this.#_price
//   }

//   @WithTax(GLOBAL_TAX_RATE)
//   get price() {
//     return this.#_price;
//   }

//   set rawPrice(newP:number){
//     this.#_price = newP
//   }
// }

// const product = new Product(20);
// console.log(product.rawPrice); // 20 (price with tax rate)
// console.log(product.price); // 23 (price with tax rate)



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
 * @validate
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
export function validate<T extends new (...args: any[]) => any>(classType:T, message = "Invalid type."){
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
  
//     @validate(Point, 'Should be of type Point')
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