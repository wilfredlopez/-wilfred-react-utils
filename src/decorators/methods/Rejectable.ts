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