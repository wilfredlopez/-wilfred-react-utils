//The class wont be able to be extended.
export function Frozen(): ClassDecorator {
  return function (constructor: Function) {
    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
    // return constructor
  };
}

function configurable(value: boolean) {
  return function g() {
    console.log("g(): evaluated");
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      console.log("g(): called");
    };
  };
}

@Frozen()
class Me {
  constructor(public name: string) {
  }
}

class You extends Me {
  [key: string]: any
  constructor(public name: string) {
    super(name);
  }
}
const person = new You("some");
// console.log(person.get('sad'));
console.log(person.name);
console.log(person["data"]);
console.log(You["name"]);
console.log(Object.isFrozen(Me)); //true
