export class TestingW {
  navigate() {
    console.log("im navigating")
  }
}

type BuilderProperties = keyof Builder
type TestingProperties = keyof TestingW
type BuilderAndTestingProperties = BuilderProperties | TestingProperties

class Builder {
  static build() {
    const testing = new TestingW()
    const builder = new Builder()

    const proxy = new Proxy<Builder & TestingW>(builder as any, {
      get: (target, property: BuilderAndTestingProperties) => {
        return target[property] || testing[property as TestingProperties]
      },
    })
    return proxy
  }

  close() {
    console.log("closing")
  }
}

const combined = Builder.build()

combined.close()
combined.navigate()

export type Newable<T> = { new (...args: any[]): T }

/**
 * Combines two classes. returns a proxy between both.
 * @param classOne class to combine with the 2nd one
 * @param classTwo class to combine with the first one
 * @example
 * const Combined = combineClasses(ClassOne, ClassTwo)

const classOneAndTwow = new Combined()

classOneAndTwow.close() //property of class 1
classOneAndTwow.navigate() // property of class 2
 */
export function combineClasses<T, C>(
  classOne: Newable<T>,
  classTwo: Newable<C>,
) {
  const testing = new classOne()
  const builder = new classTwo()

  const proxy = new Proxy<Newable<T> & Newable<C>>(builder as any, {
    get: (target, property: keyof Newable<T> | keyof Newable<C>) => {
      return target[property] || testing[property as keyof Newable<C>]
    },
  })
  return proxy
}

const Combined = combineClasses(TestingW, Builder)

const testAndBuild = new Combined()

testAndBuild.close()
testAndBuild.navigate()
