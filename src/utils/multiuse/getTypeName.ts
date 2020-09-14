
/**
 * Return the type of the value or the name of the constructor if value is an object.
 * @param val Any kind of value
 * @example getTypeName([]) // Array
 */
export default function getTypeName(val: any): string {
    let name = typeof val;
    if (
        name === "object" && typeof Reflect !== 'undefined' && typeof Reflect.get !== "undefined"
    )
    {
        name = Reflect.get(val, "constructor").name;
    }
    return name;
}