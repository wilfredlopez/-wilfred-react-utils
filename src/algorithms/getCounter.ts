import { Dictionary } from './Dictionary'

/**
 * Returns an object where if the value is undefined will return 0
 * @param initialValues Iterable
 * @example
 *  const count = getCounter([1, 3, 2, 4, 1, 1, 1])
 *  console.log(count) //{ '1': 4, '2': 1, '3': 1, '4': 1 }
 *  const data = [['fiesta'], ['p'], ['p'], ['fiesta']]
 *  getCounter(data) //{ fiesta: 2, p: 2 }
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
const getCounter: (initialValues?: Iterable<any>) => Dictionary<number> = (initialValues) => {
    const dic = new Dictionary<number>()
    if (initialValues)
    {
        for (let val of initialValues)
        {
            dic[val] = dic[val] + 1
        }
    }
    return dic
}



export default getCounter