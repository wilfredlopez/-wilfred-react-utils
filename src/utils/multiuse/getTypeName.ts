
/**
 * Return the type of the value or the name of the constructor if value is an object.
 * @param val Any kind of value
 * @example getTypeName([]) // Array
 */
export default function getTypeName(val: any): string {
    let name = typeof val;
    if(typeof val !== 'object'){
        return typeof val
    }else if(typeof val === 'object' && typeof Reflect !== 'undefined' && typeof Reflect.get !== "undefined"){

        try {
            name = Reflect.get(val, "constructor").name;
        } catch (error) {
            
        }
    }
    return name;
}