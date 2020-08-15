import { Dictionary } from "./Dictionary";

const getKey: <T extends any>(value: T, index: number) => string | number = (
  value: any,
  index: number,
) => {
  if (String(value) === "[object Object]") {
    //if pass objects inside array will use index as key
    return index;
  }
  return value as string | number;
};
/**
 * Returns an object where if the value is undefined will return 0
 * @param initialValues [Optional] any Iterable such as strings, sets and arrays.
 * @param arrayKeyTranform [Optional] a function that takes an individual value and returns the key to be used.
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
const getCounter: <T>(
  initialValues?: Iterable<T>,
  arrayKeyTranform?: (value: T, index: number) => string | number,
) => Dictionary<number> = (
  initialValues,
  arrayKeyTranform,
) => {
  const dic = new Dictionary<number>();
  const getArrayKey = typeof arrayKeyTranform !== "undefined"
    ? arrayKeyTranform
    : getKey;

  if (initialValues) {
    if (Array.isArray(initialValues)) {
      for (let i = 0; i < initialValues.length; i++) {
        let key = getArrayKey(initialValues[i], i);
        dic[key] = dic[key] + 1;
      }
    } else {
      for (let val of initialValues) {
        dic[val as any] = dic[val as any] + 1;
      }
    }
  }
  return dic;
};

export default getCounter;
