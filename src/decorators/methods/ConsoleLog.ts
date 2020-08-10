
export interface LogDecoratorI{
  log?:boolean, customName?:string
}
export function ConsoleLog({log=true, customName = undefined}:LogDecoratorI = {}):MethodDecorator{
    return function(target, propertyKey, descriptor:PropertyDescriptor){
      const original = descriptor.value
      descriptor.value = function(){
        const targetName = target.constructor.name
        const args = [...arguments]
        let call = ''
        if(log){
          const allArgs = JSON.stringify(args[0])
          console.log(typeof allArgs)
          call = `${targetName}.${String(propertyKey)}(${typeof allArgs === 'undefined' ? "" : allArgs})`
          console.time(typeof customName === 'undefined' ? call: customName)
          console.log(`Calling: ${call}`)
        }
        const result = original.apply(this, arguments)   
        if(log){
          console.timeEnd(typeof customName === 'undefined' ? call: customName)   
        }
        return result
      }
      return descriptor
    }
  }


  // class Mamis{
  //   @ConsoleLog()
  //   getAMami(){
  //     return 'MIA'
  //   }
  // }

  // const mamis = new Mamis()
  // console.log(mamis.getAMami())