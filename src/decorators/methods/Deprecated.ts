
/**
 * Decorator to log when method or static method is deprecated.
 * @param options [Optional]
 * @param options.logAtRunTime Log to the console when function is called. defaults to true.
 * @param options.logAtDeclaration Log to console when class is declared. defaults to false.
 * @param options.message Message log. defaults to 'has been deprecated.'
 * @param options.logger defaults to console.warn
 *  * @example
 *  * class MyClass {
 *     @Memo()
 *     @Deprecated({
 *         logAtRunTime: false,
 *         logAtDeclaration: true
 *     })
 *     static staticFib(n:number):number {
 *         if(n < 1) return 0
 *         if(n < 3) return 1
 *         let arr = [1,1,1]
 *         for(let i=3; i <= n; i++){
 *             arr[i] = arr[i -1] + arr[i - 2]
 *         }
 *         return arr[n]
 *     }
 * 
 *     @Deprecated({
 *         message: 'has been deprecated.​​​ Please use MyClass.sayHello.',
 *         logger: console.error
 *     })
 *     sayHi(){
 *         return 'Hi'
 *     }
 * }
 * 
 * MyClass.staticFib(100) // Message logged to console at declaration time but not when called.
 * const test = new MyClass()
 * test.sayHi() //Message logged to console everytime function is called but not at declaration time.
 */
export function Deprecated({logger = console.warn, message = 'has been deprecated.', logAtRunTime = true, logAtDeclaration = false} = {}){
    return function (
        target: Function | object, // the function itself and not the prototype
        propertyKey: string | symbol, // The name of the static method
        descriptor: TypedPropertyDescriptor<any>
        ) {
            const name = typeof target === 'function' ? target.name + "." : ""
        if(logAtDeclaration){
            logger(`${name}${String(propertyKey)} ${message}`)
        }
        const originalMethod = descriptor.value
        descriptor.value = (...args:any[]) => {
            if(logAtRunTime){
                logger(`${name}${String(propertyKey)} ${message}`)
            }
                return originalMethod(...args)
        }

        return descriptor
    }
}



// class MyClass {
//     @Deprecated({
//         logAtRunTime: false,
//         logAtDeclaration: true
//     })
//     static staticFib(n:number):number {
//         if(n < 1) return 0
//         if(n < 3) return 1
//         let arr = [1,1,1]
//         for(let i=3; i <= n; i++){
//             arr[i] = arr[i -1] + arr[i - 2]
//         }
//         return arr[n]
//     }

//     @Deprecated({
//         message: 'has been deprecated.​​​ Please use MyClass.sayHello.',
//         logger: console.error
//     })
//     sayHi(){
//         return 'Hi'
//     }
// }

// MyClass.staticFib(10) // Message logged to console at declaration time but not when called.
// const test = new MyClass()
// test.sayHi() //Message logged to console everytime function is called but not at declaration time.

