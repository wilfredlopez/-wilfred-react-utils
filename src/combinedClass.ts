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
