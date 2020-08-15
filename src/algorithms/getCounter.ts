import { Dictionary } from './Dictionary'

/**
 * Returns an object where if the value is undefined will return 0
 * @example
 * function characterCounter(str: string) {
 *     if (!str) return {};
 *     const result = getCounter();
 *     for (let char of str)
 *     {
 *          //if result[char] is undefined will return 0 
 *          //that way you can safely use ++result[char] and will not get NAN.
 *         result[char] = ++result[char];
 *     }
 *     return result;
 * }
 * 
 * console.log(characterCounter("ABCDEABC")) // { A: 2, B: 2, C: 2, D: 1, E: 1 }
 */
const getCounter: () => Dictionary<number> = () => new Dictionary()



export default getCounter