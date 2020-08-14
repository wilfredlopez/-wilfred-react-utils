import { EnhancedObject } from './EnhancedObject'


describe("EnhancedObject", () => {

    it("Returns default value if asked for", () => {
        function characterCounter(str: string, dict: EnhancedObject<string, number>) {
            if (!str) return {};
            const result = dict;
            for (let char of str)
            {
                char = char.toLowerCase();
                if (!(/[a-zA-Z0-9]/.test(char)))
                {
                    continue;
                }
                //if result[char] is undefined it will return 0 using ++ wont cause a NAN.
                result[char] = result._getValue(char, 0) + 1
            }
            return result;
        }
        expect(characterCounter("abcabc", new EnhancedObject<string, number>())).toEqual(
            { a: 2, b: 2, c: 2 },
        );
    });
    it('cannot modify built-in functions', () => {
        const myObj = new EnhancedObject<string, { name: string, year: number }>()
        expect(myObj._isSaveKey('_setValue')).toBe(false)
        expect(() => myObj['_setValue'] = null).toThrow()
        //@ts-ignore
        expect(() => myObj._length = 2000).toThrow()

        expect(myObj._isSaveKey('_entries')).toBe(false)
        //@ts-ignore
        expect(() => myObj['_entries'] = 2000).toThrow()
        expect(myObj._entries).toBeInstanceOf(Function)
        myObj._setValue('_setValue', {} as any)
        myObj._setValue('1', { 'name': 'car 1', year: 1977 })
        expect(myObj._getValue('1').year).toBe(1977)

        myObj[Symbol.iterator] = null
        expect(() => {
            for (let o of myObj)
            {
                // console.log(o, 'works')
            }
        }).not.toThrow()


    })
    it('sets and gets value', () => {
        const myObj = new EnhancedObject<string, { name: string, year: number }>()
        myObj._setValue('1', { 'name': 'car 1', year: 1977 })
        myObj._setValue('2', { 'name': 'car 2', year: 2019 })
        expect(myObj._getValue('1').year).toBe(1977)
        expect(myObj._getValue('2').year).toBe(2019)
    })
    it('creates from initial values from array', () => {
        const myObj = new EnhancedObject<string, { name: string, year: number }>([{ name: 'car 1', year: 1977 }, { name: 'car 2', year: 2019 }])
        expect(myObj._getValue('0').year).toBe(1977)
        expect(myObj._getValue('1').year).toBe(2019)
    })
    it('creates from initial values from object', () => {
        const myObjInitial = new EnhancedObject<string, { name: string, year: number }>({ '1': { name: 'car 1', year: 1977 }, '2': { name: 'car 2', year: 2019 } })
        const myObj = new EnhancedObject<string, { name: string, year: number }>(myObjInitial)
        expect(myObj._getValue('1').year).toBe(1977)
        expect(myObj._getValue('2').year).toBe(2019)
    })
    it('deletes values', () => {
        const myObj = new EnhancedObject<number, string>()
        myObj._setValue(29, 'Lucky Number')
        myObj._setValue(22, 'Try it')
        myObj._setValue(3, 'Dont even try')
        myObj._setValue(13, 'Bad Luck')
        expect(myObj._getValue(29)).toBe('Lucky Number')
        expect(myObj._deleteValue(29)).toBe('Lucky Number')
        expect(myObj._getValue(29, 'sorry')).toBe('sorry')
        myObj._deleteValue(3)
        expect(myObj._getValue(3)).toBe(null)
    })
    it('has utility functions', () => {
        const myObj = new EnhancedObject<number, string>()
        expect(myObj._isEmpty()).toBe(true)
        myObj._setValue(29, 'Lucky Number')
        myObj._setValue(22, 'Try it')
        myObj._setValue(3, 'Dont even try')
        myObj._setValue(13, 'Bad Luck')
        expect(myObj._has(29)).toBe(true)
        expect(myObj._has(100)).toBe(false)
        const result = []
        myObj._forEach(o => {
            result.push(o)
        })
        expect(result).toEqual(['Dont even try', 'Bad Luck', 'Try it', 'Lucky Number'])
        expect(myObj._isEmpty()).toBe(false)
        expect(myObj._keys()).toEqual(['3', '13', '22', '29'])
        expect(myObj._length).toBe(4)
        expect(myObj._values()).toEqual(['Dont even try', 'Bad Luck', 'Try it', 'Lucky Number'])
    })
    it('resets and maps object', () => {
        const myObj = new EnhancedObject<number, string>()
        myObj._setValue(30, 'september')
        myObj._reset()
        expect(myObj._getValue(30)).toBe(null)
        myObj._setValue(29, 'Lucky Number')
        myObj._setValue(22, 'Try it')
        myObj._setValue(3, 'Dont even try')
        myObj._setValue(13, 'Bad Luck')
        const result = myObj._map((value) => {
            return value.toLowerCase()
        })
        expect(result).toEqual(['dont even try', 'bad luck', 'try it', 'lucky number'])
    })
    it('turns itself into a promise or an array', async () => {
        const myObj = new EnhancedObject<string, { name: string, year: number }>({ '1': { name: 'car 1', year: 1977 }, '2': { name: 'car 2', year: 2019 } })
        const prom = await myObj._toPromise().then(val => {
            return val.map(v => ({ ...v, name: v.name.toUpperCase() }))
        })
        expect(prom).toEqual([{ name: 'CAR 1', year: 1977 }, { name: 'CAR 2', year: 2019 }])
        const arr = myObj._toArray()
        expect(arr).toEqual([{ name: 'car 1', year: 1977 }, { name: 'car 2', year: 2019 }])
    })
    it('returns a copy', async () => {
        const myObj = new EnhancedObject<string, { name: string, year: number }>([{ name: 'car 1', year: 1977 }, { name: 'car 2', year: 2019 }])
        const copy = myObj._copy()
        expect(copy).toEqual({
            '0': { name: 'car 1', year: 1977 },
            '1': { name: 'car 2', year: 2019 }
        })
    })
})