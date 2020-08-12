import { Decorators } from "../decorators";

/**
 * Simple Object that replaces undefined with a 0. 
 * For example if obj['foo'] is undefined it will return 0.
 * Usefull when using loops for counting data.
 * @example
 * function characterCounter(str: string) {
 *   if (!str) return {};
 *   const result = new Dictionary<number>();
 *   for (let char of str) {
 *     char = char.toLowerCase();
 *     if (!(/[a-zA-Z0-9]/.test(char))) {
 *       continue;
 *     }
 *     //if result[char] is undefined it will return 0 using ++ wont cause a NAN.
 *     result[char] = ++result[char];
 *   }
 *   return result;
 * }
 * console.log(characterCounter("abcabc"));
 */
@Decorators.ReplaceUndefined(0)
export class Dictionary<T extends any> {
  [key: string]: T
}
