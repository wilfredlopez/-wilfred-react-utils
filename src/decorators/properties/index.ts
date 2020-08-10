
 function appendEmoji(emoji:string, next:string){
  return `${emoji} ${next} ${emoji}`
 }
 /**
  * Adds emoji to start and end of the string. if set on an array. it will added to every string on the top level of the array. ['here', {other: 'not here'}]
  * @param emoji '🍦' to decorate string.
  * @example
  * class IceScream {
  *  @Emoji('🍦')
  * ```ts
  *  flavor = "vanilla"; // output will be: 🍦 vanilla 🍦
  * ```
  *  @Emoji('🎪')
  * ```ts
  *  toppings: string[] = [];
  *  addTopping(topping = "sprinkles") {
                this.toppings.push(topping);
  *         }
  * }
  ```
  */
export function Emoji(emoji = '🍦'):PropertyDecorator {
  return function <T extends Object>(target: T, key: string | symbol) {
    let val = target[key as keyof T];
    const getter = () => {
      if(Array.isArray(val) && val.length >  0){
        val  = val.map(v => {
          return typeof v === 'string' && !v.includes(emoji) ? appendEmoji(emoji, v) : v
        }) as any
      }
     return  val
    };
    const setter = (next: T[keyof T]) => {
      if(typeof next === 'string'){
        val = appendEmoji(emoji, next)  as any;
      }else{
        val = next
      }
    };
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}


// class IceScream {
//   @Emoji('🍍')
//   flavor = "vanilla";
//   @Emoji('🎪')
//   toppings: string[] = [];
//   addTopping(topping = "sprinkles") {
//     this.toppings.push(topping);
//   }
// }

// const ice = new IceScream();

// console.log(ice.flavor); //🍦 vanilla 🍦
// ice.addTopping("wilfred");
// ice.flavor = "Pineapple"
// console.log(ice.flavor); //🍦 Pineapple 🍦
// console.log(ice.toppings) // [ '🎪 wilfred 🎪' ]