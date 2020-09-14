

/**
 * Dictionary that replaces the value with 0 if value is undefined.
 * @example
 * const dict = new Dict(0)
 * console.log(dict[2000]) // 0
 * dict.set('me', 29)
 * console.log(dict['me']) // 29
 */
export class Dict {
    [key: string]: number | Function

    constructor(
        undefinedReplacer: any = 0,
    ) {
        const replaceUndefinedWith = undefinedReplacer;
        const proxy = new Proxy<this>(this, {
            get(target, name, receiver) {
                const realValue = Reflect.get(target, name, receiver);
                if (
                    (typeof realValue !== "undefined") || (realValue === null) ||
                    (realValue === 0)
                )
                {
                    return realValue;
                } else
                {
                    return replaceUndefinedWith
                }
            },
        });
        return proxy;
    }

    get(key: string | number) {
        return this[key] as number
    }

    set(key: string | number, val: number) {
        this[key] = val
        return this
    }
    mode() {
        let max = Math.max(...Object.values(this) as number[])
        const mode = []
        for (let [key, value] of Object.entries(this))
        {
            if (value === max)
            {
                mode.push(parseInt(key))
            }
        }
        return mode
    }
}



const d = new Dict(0)
d.set('20', 25).set(23, 2)
const n = d.get(2)
const me = d[0]

const mode = d.mode()
