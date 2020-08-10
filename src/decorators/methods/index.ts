

export function timeMethod(time = true):MethodDecorator{
  return function(target, propertyKey, descriptor:PropertyDescriptor){
    if(time){
      const original = descriptor.value
      descriptor.value = function(){
        const targetName = target.constructor.name
        const args = [...arguments]
        const allArgs = JSON.stringify(args[0])
        const k = `${targetName}.${String(propertyKey)}(${allArgs})`
        function getActualTime(){
          return new Date().getTime()
        }
        const start = getActualTime()
        console.time(k)
        const result = original.apply(this, arguments)
        const end = getActualTime()
        console.log(k, 
          ' took aprox:', ` ${end - start}ms`)
        console.timeEnd(k)
        return result
      }
    }

    return descriptor
  }
}


// function verifyToping(top: string){
//   if (typeof top !== "string") return false;
//   return top.length > 6;
// }

// class IceScream {
//   toppings: string[] = [];

//   @Rejectable(verifyToping, "Toppings should have a length greater than 6")
//   addTopping(topping = "sprinkles") {
//     this.toppings.push(topping);
//   }
// }

// const ice = new IceScream();

// // ice.addTopping("short"); //Error: Toppings should have a length greater than 6
// ice.addTopping("wilfred");
// console.log(ice.toppings);

