
const formatMetadataKey = Symbol("format");
const requiredMetadataKey = Symbol("required");

export function LogIt(): ParameterDecorator{
    return function(target:any, propertyKey, paramIndex){
      let existingRequiredParameters: number[] = [];
    existingRequiredParameters.push(paramIndex);
    Reflect.defineProperty(
      target,
      propertyKey,
      {},
    );
        console.log(target, propertyKey, paramIndex)
        // target[propertyKey] = 'WIL'
        console.log(target[propertyKey]('me'))
        const original = target[propertyKey]
        target[propertyKey] = (...args: any[]) => {
          console.log(arguments)
          return original
        }
        console.log(`${target.constructor.name}.${propertyKey.toString()}()`)
        return target
        }
}

class Point {
    constructor(public x:number, public y:number){

    }
  }

class Person{
    name:string
    _p1: Point | undefined
    constructor(  name:string){
        this.name = name
    }

    greet(@LogIt() name: string) {
      return "Hello " + name + ", " + this.name;
    }
}

const  p = new Person('wil')
console.log(p.name)

