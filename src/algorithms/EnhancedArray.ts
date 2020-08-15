import { Validator } from "../validator";
/**
 * Enhanced array. by default replaces any undefined values when trying to access with replaceUndefinedWith parameter. 
 * @param replaceUndefinedWith defaults to empty array.
 * example: myArray[20] //will return [] instead of undefined if there is no value there.
 * @param arrayLength number or undefined.
 * 
 */
export class EnhancedArray<T> extends Array<T> {
  #replaceUndefinedWith: any = [];

  constructor(
    undefinedReplacer: any = [],
  ) {
    super();
    this.#replaceUndefinedWith = undefinedReplacer;
    const proxy = new Proxy<this>(this, {
      get(target, name, receiver) {
        const realValue = Reflect.get(target, name, receiver);
        if (
          (typeof realValue !== "undefined") || (realValue === null) ||
          (realValue === 0)
        ) {
          return realValue;
        } else {
          return target.#replaceUndefinedWith;
        }
      },
    });
    return proxy;
  }

  getUndefinedReplacer() {
    return this.#replaceUndefinedWith;
  }

  setUndefinedReplacer(val: any) {
    this.#replaceUndefinedWith = val;
  }

  concat(val: T[]) {
    for (const v of val) {
      this.push(v);
    }
    return this;
  }

  //@ts-ignore
  [Symbol.toStringTag]() {
    return this.toString();
  }

  toString() {
    return JSON.stringify(this);
  }

  //Returns a promise of the same array object.
  toPromise() {
    return new Promise<this>((res) => res(this));
  }

  /**
     * Pops every item on the array.
     */
  clear() {
    while (this.length) {
      this.pop();
    }
  }

  /**
     * Checks with deep equality if value is in array.
     * @param val value to check.
     */
  hasValue(val: any) {
    return this.findIndex((v) => Validator.isDeepEqual(v, val)) !== -1;
  }

  findIndexDeep(val: any) {
    return this.findIndex((v) => Validator.isDeepEqual(v, val));
  }

  private deepDelete(val: any) {
    const index = this.findIndexDeep(val);
    if (index !== -1) {
      this.splice(index, 1);
    }
    return this;
  }

  /**
     * Deletes from the array at index of the value.
     * @param val value to delete.
     * @param deep [Optional] if you want a deepEquality Check. default to false
     */
  delete(val: any, deep = false) {
    if (deep) {
      return this.deepDelete(val);
    }

    const indexof = this.indexOf(val);
    if (indexof !== -1) {
      this.splice(indexof, 1);
    }
    return this;
  }
}

// eArr.clear()
// console.log(eArr)
