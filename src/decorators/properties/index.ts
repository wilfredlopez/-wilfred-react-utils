export function Emoji() {
  return function <T extends Object>(target: T, key: keyof T) {
    let val = target[key];
    const getter = () => {
      return val;
    };
    const setter = (next: T[keyof T]) => {
      console.log("updating flavor");
      val = `🍭 ${next} 🍭` as any;
    };
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

function Rejectable(
  allow: (...args: any[]) => boolean,
  message = "This is not allowed",
) {
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

class IceScream {
  @Emoji()
  flavor = "vanilla";
  toppings: string[] = [];

  @Rejectable((top: string) => {
    if (typeof top !== "string") return false;
    return top.length > 6;
  }, "Toppings should have a length greater than 6")
  addTopping(topping = "sprinkles") {
    this.toppings.push(topping);
  }
}

const ice = new IceScream();

console.log(ice.flavor); //🍭 vanilla 🍭
// ice.addTopping("short"); //Error: Toppings should have a length greater than 6
ice.addTopping("wilfred");
console.log(ice.toppings);
