export function WithTax(rate: number) {
  return function <T extends Object>(
    target: T,
    key: keyof T,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.get;
    descriptor.get = function () {
      const result = original?.apply(this);
      return (result * (1 + rate)).toFixed();
    };
    return descriptor;
  };
}

class Product {
  private _price: number;
  constructor(price: number) {
    this._price = price;
  }

  @WithTax(0.15)
  get price() {
    return this._price;
  }
}

const product = new Product(20);

console.log(product.price); // 23 (price with tax rate)
