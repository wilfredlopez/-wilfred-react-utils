

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



