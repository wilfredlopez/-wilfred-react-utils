
const cacheMap = new Map();

export interface Config {
	resolver?: (...args: any[]) => string | number;
	ttl?: number;
}

export function Memoize(config: Config = {}) {
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




class Sorter{
    @Memoize()
    sortReverse(arr:number[]){
        for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        for (let j = i - 1; j >= 0 && arr[j] < current; j--) {
            [arr[j+1], arr[j]] = [arr[j], arr[j+1]];
        }
        }
    return arr
    }
}

const sorter = new Sorter()

const TESTARR = Array.from({length: 900}, (_,index) => index+1)
console.time('sort1')
sorter.sortReverse(TESTARR) //result will be cached.
console.timeEnd('sort1') //APROX: 30.128ms
console.time('sort2')
sorter.sortReverse(TESTARR) //result already cached.
console.timeEnd('sort2') //APROX:  0.012ms ​​​​​
