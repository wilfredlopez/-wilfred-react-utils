export function Rejectable(
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

// ice.addTopping("short"); //Error: Toppings should have a length greater than 6
ice.addTopping("wilfred");
console.log(ice.toppings);
