
const formatMetadataKey = Symbol("format");

export function LogIt(): ParameterDecorator{
    return function(target:any, propertyKey, index){
        console.log(target, propertyKey, index)
        target[propertyKey] = 'WIL'
        console.log()
        }
}

class Point {
    constructor(public x:number, public y:number){

    }
  }

class Person{
    name:string
    _p1: Point | undefined
    constructor(name:string){
        this.name = name
    }

    greet(name: string) {
      return "Hello " + name + ", " + this.name;
    }
}

const  p = new Person('')
console.log(p.name)

