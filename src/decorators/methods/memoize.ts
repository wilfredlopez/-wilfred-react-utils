
const cacheMap = new Map();

export interface MemoizeConfig {
	resolver?: (...args: any[]) => string | number;
	ttl?: number;
}

/**
 * Decorator for methods. it caches the results everytime called. and if called with same parameters returns from cache.
 * @param options [Optional] See below.
 * @param options.ttl [Optional] number in milliseconds for total live of the cache. example: @Memoize({ ttl: 10 * 60 * 1000 }) // The result is cached for at most 10 minutes
 * @param options.resolver [Optional] this function gets the arguments and should return the unique key to use for the cache.
 * You may also import the function clearMemoizeCache that Clears the cache belonging to a memoized function.
 * @example
```ts
import { Decorators } from "wilfredlopez/react-utils"
Decorators.clearMemoizeCache(myMemoizedFunction)
```
 * 
 * @example
 * ```
 * class Sorter{
 * 
```
@
 * ```
Memoize()
 *    sortReverse(arr:number[]){
 *        for (let i = 1; i < arr.length; i++) {
 *        const current = arr[i];
 *        for (let j = i - 1; j >= 0 && arr[j] < current; j--) {
 *            [arr[j+1], arr[j]] = [arr[j], arr[j+1]];
 *        }
 *        }
 *    return arr
 *    }
 *}
 *
 *const sorter = new Sorter()
 *
 *const TESTARR = Array.from({length: 900}, (_,index) => index+1)
 *console.time('sort1')
 *sorter.sortReverse(TESTARR) //result will be cached.
 *console.timeEnd('sort1') //APROX: 30.128ms
 *console.time('sort2')
 *sorter.sortReverse(TESTARR) //result already cached.
 *console.timeEnd('sort2') //APROX:  0.012ms ​​​​​
 ```
 */
export function Memoize(config: MemoizeConfig = {}) {
	return function(
		_target: object,
		_propertyName: string,
		propertyDescriptor: PropertyDescriptor
	): PropertyDescriptor {
		let timeout = Infinity;
		
		const prop = propertyDescriptor.value ? "value" : "get";

		const originalFunction = propertyDescriptor[prop];
		const map = new Map();

		propertyDescriptor[prop] = function(...args:any[]) {
			let key = config.resolver
				? config.resolver.apply(this, args)
				: JSON.stringify(args);

			if (map.has(key) && (!config.ttl || timeout > Date.now())) {
				return map.get(key);
			} else {
				const result = originalFunction.apply(this, args);
				map.set(key, result);
				if (config.ttl) {
					timeout = Date.now() + config.ttl;
				}
				return result;
			}
		};

		cacheMap.set(propertyDescriptor[prop], map);

		return propertyDescriptor;
	};
}

export function clearMemoizeCache(fn: () => any) {
	const map = cacheMap.get(fn);

	if (map) {
		map.clear();
	}
}





  
// class Sorter{
//     @Memoize()
//     sortReverse(arr:number[]){
//         for (let i = 1; i < arr.length; i++) {
//         const current = arr[i];
//         for (let j = i - 1; j >= 0 && arr[j] < current; j--) {
//             [arr[j+1], arr[j]] = [arr[j], arr[j+1]];
//         }
//         }
//     return arr
//     }
// }

// const sorter = new Sorter()

// const TESTARR = Array.from({length: 900}, (_,index) => index+1)
// console.time('sort1')
// sorter.sortReverse(TESTARR) //result will be cached.
// console.timeEnd('sort1') //APROX: 30.128ms
// console.time('sort2')
// sorter.sortReverse(TESTARR) //result already cached.
// console.timeEnd('sort2') //APROX:  0.012ms ​​​​​
