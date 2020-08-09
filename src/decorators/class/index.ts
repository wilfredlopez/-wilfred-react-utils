//The class wont be able to be extended.
export function Frozen():ClassDecorator {
  return function (constructor: Function) {
    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
  };
}

// @Frozen()
// class Me {
//   constructor(public name: string) {
//   }
// }

// class You extends Me {
//   constructor(public name: string) {
//     super(name);
//   }
// }
// console.log(new You("me"));
// console.log(Object.isFrozen(Me)); //true
