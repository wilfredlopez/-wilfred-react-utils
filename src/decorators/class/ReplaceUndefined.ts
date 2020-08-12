/**
 * Creates a proxy of the class and returns the replacer value @withValue if the original value is undefined.
 * @param withValue [Optional] default to 0
 * @example
@
```ts
ReplaceUndefined(0)
 * class Dictionary<T extends any> {
 *   [key: string]: T
 * }
 * 
 * function characterCounter(str: string) {
 *   if (!str) return {};
 *   const result = new Dictionary<number>();
 *   for (let char of str) {
 *     char = char.toLowerCase();
 *     if (!(/[a-zA-Z0-9]/.test(char))) {
 *       continue;
 *     }
 *     //if result[char] is undefined it will return 0 using ++ wont cause a NAN.
 *     result[char] = ++result[char];
 *   }
 *   return result;
 * }
 * 
 * console.log(characterCounter("abcabc")); // Dictionary { a: 2, b: 2, c: 2 }
```
 */
export function ReplaceUndefined(withValue: any = 0) {
  return function Dictionary<T extends { new (...args: any[]): {} }>(
    constructor: T,
  ) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        const proxy = new Proxy<this>(this, {
          get(target, name, receiver) {
            const realValue = Reflect.get(target, name, receiver);
            if (
              (typeof realValue !== "undefined") || (realValue === null) ||
              (realValue === 0)
            ) {
              return realValue;
            } else {
              return withValue;
            }
          },
        });
        return proxy;
      }
    };
  };
}

// @ReplaceUndefined(0)
// class Dictionary<T extends any> {
//   [key: string]: T
// }

// function characterCounter(str: string) {
//   if (!str) return {};
//   const result = new Dictionary<number>();
//   for (let char of str) {
//     char = char.toLowerCase();
//     if (!(/[a-zA-Z0-9]/.test(char))) {
//       continue;
//     }
//     //if result[char] is undefined it will return 0 using ++ wont cause a NAN.
//     result[char] = ++result[char];
//   }
//   return result;
// }

// console.log(characterCounter("abcabc")); // Dictionary { a: 2, b: 2, c: 2 }
