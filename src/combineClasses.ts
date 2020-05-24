export type Newable<T> = { new (...args: any[]): T }

/**
 * Combines two classes. returns a proxy between both.
 * usefull when you are using third party libraries and its no convenient to extend the class.
 * @param classOne class to combine with the 2nd one
 * @param classTwo class to combine with the first one
 * @example
 * const Combined = combineClasses(ClassOne, ClassTwo)
   const classOneAndTwo = Combined()
   classOneAndTwo.close() //property of class 1
   classOneAndTwo.navigate() // property of class 2
@example
  class Logger {
    log() {
      console.log(this)
    }
  }
  const CombinedArray = combineClasses<string[], Logger>(Array, Logger)
  const arrayAndLogger = CombinedArray()
  arrayAndLogger.push("wilfred")
  arrayAndLogger.push("austria")
  arrayAndLogger.log() //executes the log property of the Logger class.
 */
export function combineClasses<T, C>(
  classOne: Newable<T>,
  classTwo: Newable<C>,
): () => T & C {
  const cT = new classOne()
  const cC = new classTwo()

  return () =>
    new Proxy<Newable<T> & Newable<C>>(cT as any, {
      get: (target, property: keyof Newable<T> | keyof Newable<C>) => {
        return target[property] || cC[property as keyof Newable<C>]
      },
    }) as any
}

//*****************************************//

/**
 * example of how to create a type saved proxy between 2 or more classes
 */
// class Builder {
//   static build() {
//     const testing = new TestingW()
//     const builder = new Builder()

//     const proxy = new Proxy<Builder & TestingW>(builder as any, {
//       get: (target, property: BuilderAndTestingProperties) => {
//         return target[property] || testing[property as TestingProperties]
//       },
//     })
//     return proxy
//   }

//   close() {
//     console.log("closing")
//   }
// }

// const combined = Builder.build();
// combined.close();
// combined.navigate();

// /**
//  * just for demo
//  */
// class TestingW {
//   navigate() {
//     console.log("im navigating")
//   }
// }

// /**
//  * demo types
//  */
// type BuilderProperties = keyof Builder
// type TestingProperties = keyof TestingW
// type BuilderAndTestingProperties = BuilderProperties | TestingProperties
