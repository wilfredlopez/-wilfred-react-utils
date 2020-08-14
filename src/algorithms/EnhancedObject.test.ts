import { EnhancedObject } from './EnhancedObject'


describe("EnhancedObject", () => {
    it('maps the keys', () => {
        interface User {
            id: number
            name: string
            age: number
        }
        const users: User[] = [{ age: 30, id: 100, name: 'Wilfred' }, { age: 27, id: 325, name: 'Theudy' }]

        const mapUserToRecord = (data: User[]) => data
            .reduce((prev: Record<number, User>, curr) => Object
                .assign(prev, ({ [curr.id]: curr })), {})

        const obj = new EnhancedObject<number, User>(users,
            (data: User[]) => mapUserToRecord(data)
        )
        expect(obj.$getValue(100).id).toBe(100)
        expect(obj.$getValue(325).name).toBe('Theudy')
        const obj2 = new EnhancedObject<number, User>({ 100: { age: 30, id: 100, name: 'Wilfred' }, 325: { age: 27, id: 325, name: 'Theudy' } }, (values: Record<number, User>) => {
            return values
        })
        expect(obj2.$getValue(100).id).toBe(100)
        expect(obj2.$getValue(325).name).toBe('Theudy')
    })
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
                result[char] = result.$getValue(char, 0) + 1
            }
            return result;
        }
        expect(characterCounter("abcabc", new EnhancedObject<string, number>())).toEqual(
            { a: 2, b: 2, c: 2 },
        );
    });
    it('cannot modify built-in functions', () => {
        const myObj = new EnhancedObject<string, { name: string, year: number }>()
        expect(myObj.$isSaveKey('$setValue')).toBe(false)
        expect(() => myObj['$setValue'] = null).toThrow()
        //@ts-ignore
        expect(() => myObj.$length = 2000).toThrow()

        expect(myObj.$isSaveKey('$entries')).toBe(false)
        //@ts-ignore
        expect(() => myObj['$entries'] = 2000).toThrow()
        expect(myObj.$entries).toBeInstanceOf(Function)
        myObj.$setValue('$setValue', {} as any)
        myObj.$setValue('1', { 'name': 'car 1', year: 1977 })
        expect(myObj.$getValue('1').year).toBe(1977)

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
        myObj.$setValue('1', { 'name': 'car 1', year: 1977 })
        myObj.$setValue('2', { 'name': 'car 2', year: 2019 })
        expect(myObj.$getValue('1').year).toBe(1977)
        expect(myObj.$getValue('2').year).toBe(2019)
    })
    it('creates from initial values from array', () => {
        const myObj = new EnhancedObject<string, { name: string, year: number }>([{ name: 'car 1', year: 1977 }, { name: 'car 2', year: 2019 }])
        expect(myObj.$getValue('0').year).toBe(1977)
        expect(myObj.$getValue('1').year).toBe(2019)
    })
    it('creates from initial values from object', () => {
        const myObjInitial = new EnhancedObject<string, { name: string, year: number }>({ '1': { name: 'car 1', year: 1977 }, '2': { name: 'car 2', year: 2019 } })
        const myObj = new EnhancedObject<string, { name: string, year: number }>(myObjInitial)
        expect(myObj.$getValue('1').year).toBe(1977)
        expect(myObj.$getValue('2').year).toBe(2019)
    })
    it('deletes values', () => {
        const myObj = new EnhancedObject<number, string>()
        myObj.$setValue(29, 'Lucky Number')
        myObj.$setValue(22, 'Try it')
        myObj.$setValue(3, 'Dont even try')
        myObj.$setValue(13, 'Bad Luck')
        expect(myObj.$getValue(29)).toBe('Lucky Number')
        expect(myObj.$deleteValue(29)).toBe('Lucky Number')
        expect(myObj.$getValue(29, 'sorry')).toBe('sorry')
        myObj.$deleteValue(3)
        expect(myObj.$getValue(3)).toBe(null)
    })
    it('has utility functions', () => {
        const myObj = new EnhancedObject<number, string>()
        expect(myObj.$isEmpty()).toBe(true)
        myObj.$setValue(29, 'Lucky Number')
        myObj.$setValue(22, 'Try it')
        myObj.$setValue(3, 'Dont even try')
        myObj.$setValue(13, 'Bad Luck')
        expect(myObj.$has(29)).toBe(true)
        expect(myObj.$has(100)).toBe(false)
        const result = []
        myObj.$forEach(o => {
            result.push(o)
        })
        expect(result).toEqual(['Dont even try', 'Bad Luck', 'Try it', 'Lucky Number'])
        expect(myObj.$isEmpty()).toBe(false)

        expect(myObj.$keys()).toEqual(['3', '13', '22', '29'])
        expect(myObj.$length).toBe(4)
        expect(myObj.$values()).toEqual(['Dont even try', 'Bad Luck', 'Try it', 'Lucky Number'])
    })
    it('resets and maps object', () => {
        const myObj = new EnhancedObject<number, string>()
        myObj.$setValue(30, 'september')
        myObj.$reset()
        expect(myObj.$getValue(30)).toBe(null)
        myObj.$setValue(29, 'Lucky Number')
        myObj.$setValue(22, 'Try it')
        myObj.$setValue(3, 'Dont even try')
        myObj.$setValue(13, 'Bad Luck')
        const result = myObj.$map((value) => {
            return value.toLowerCase()
        })
        expect(result).toEqual(['dont even try', 'bad luck', 'try it', 'lucky number'])
    })
    it('turns itself into a promise or an array', async () => {
        const myObj = new EnhancedObject<string, { name: string, year: number }>({ '1': { name: 'car 1', year: 1977 }, '2': { name: 'car 2', year: 2019 } })
        const prom = await myObj.$toPromise().then(val => {
            return val.map(v => ({ ...v, name: v.name.toUpperCase() }))
        })
        expect(prom).toEqual([{ name: 'CAR 1', year: 1977 }, { name: 'CAR 2', year: 2019 }])
        const arr = myObj.$toArray()
        expect(arr).toEqual([{ name: 'car 1', year: 1977 }, { name: 'car 2', year: 2019 }])
    })
    it('returns a copy', async () => {
        const myObj = new EnhancedObject<string, { name: string, year: number }>([{ name: 'car 1', year: 1977 }, { name: 'car 2', year: 2019 }])
        const copy = myObj.$copy()
        expect(copy).toEqual({
            '0': { name: 'car 1', year: 1977 },
            '1': { name: 'car 2', year: 2019 }
        })
    })
})