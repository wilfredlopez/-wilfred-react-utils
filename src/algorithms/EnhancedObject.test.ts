import {EnhancedObject} from './EnhancedObject'


describe.skip("EnhancedObject", () => {
    it('sets and gets value', () => {
        const myObj = new EnhancedObject<string, {name: string, year: number}>()
        myObj.setValue('1', {'name': 'car 1', year: 1977})
        myObj.setValue('2', {'name': 'car 2', year: 2019})
        expect(myObj.getValue('1').year).toBe(1977)
        expect(myObj.getValue('2').year).toBe(2019)
    })
    it('creates from initial values from array', () => {
        const myObj = new EnhancedObject<string, {name: string, year: number}>([{'1':{ name:'car 1', year:1977}},{'2':{name: 'car 2',year:2019}}])
        expect(myObj.getValue('1').year).toBe(1977)
        expect(myObj.getValue('2').year).toBe(2019)
    })
    it('creates from initial values from object', () => {
        const myObjInitial = new EnhancedObject<string, {name: string, year: number}>({'1':{ name:'car 1', year:1977},'2':{name: 'car 2',year:2019}})
        const myObj = new EnhancedObject<string, {name: string, year: number}>(myObjInitial)
        expect(myObj.getValue('1').year).toBe(1977)
        expect(myObj.getValue('2').year).toBe(2019)
    })
    it('deletes values', () => {
        const myObj = new EnhancedObject<number, string>()
        myObj.setValue(29, 'Lucky Number')
        myObj.setValue(22, 'Try it')
        myObj.setValue(3, 'Dont even try')
        myObj.setValue(13, 'Bad Luck')
        expect(myObj.getValue(29)).toBe('Lucky Number')
        expect(myObj.delete(29)).toBe('Lucky Number')
        expect(myObj.getValue(29, 'sorry')).toBe('sorry')
        myObj.delete(3)
        expect(myObj.getValue(3)).toBe(null)
    })
    it('has utility functions', () => {
        const myObj = new EnhancedObject<number, string>()
        expect(myObj.isEmpty()).toBe(true)
        myObj.setValue(29, 'Lucky Number')
        myObj.setValue(22, 'Try it')
        myObj.setValue(3, 'Dont even try')
        myObj.setValue(13, 'Bad Luck')
        expect(myObj.has(29)).toBe(true)
        expect(myObj.has(100)).toBe(false)
        const result = []
        myObj.forEach(o => {
            result.push(o)
        })
        expect(result).toEqual(['Dont even try','Bad Luck','Try it','Lucky Number'])
        expect(myObj.isEmpty()).toBe(false)
        expect(myObj.keys()).toEqual([ '3', '13', '22', '29' ])
        expect(myObj.length).toBe(4)
        expect(myObj.values()).toEqual(['Dont even try','Bad Luck','Try it','Lucky Number'])
    })
    it('resets and maps object', () => {
        const myObj = new EnhancedObject<number, string>()
        myObj.setValue(30,'september')
        myObj.reset()
        expect(myObj.getValue(30)).toBe(null)
        myObj.setValue(29, 'Lucky Number')
        myObj.setValue(22, 'Try it')
        myObj.setValue(3, 'Dont even try')
        myObj.setValue(13, 'Bad Luck')
        const result = myObj.map((value) => {
            return value.toLowerCase()
        })
        expect(result).toEqual([ 'dont even try', 'bad luck', 'try it', 'lucky number' ])
    })
    it('turns itself into a promise or an array', async () => {
        const myObj = new EnhancedObject<string, {name: string, year: number}>([{'1':{ name:'car 1', year:1977}},{'2':{name: 'car 2',year:2019}}])
        const prom = await myObj.toPromise().then(val => {
            return val.map(v => ({...v, name: v.name.toUpperCase()}))
        })
        expect(prom).toEqual([ { name: 'CAR 1', year: 1977 }, { name: 'CAR 2', year: 2019 } ])
        const arr = myObj.toArray()
        expect(arr).toEqual([ { name: 'car 1', year: 1977 }, { name: 'car 2', year: 2019 } ])
    })
    it('returns a copy', async () => {
        const myObj = new EnhancedObject<string, {name: string, year: number}>([{'1':{ name:'car 1', year:1977}},{'2':{name: 'car 2',year:2019}}])
       const copy = myObj.copy()
       expect(copy).toEqual({ '1': { name: 'car 1', year: 1977 },
       '2': { name: 'car 2', year: 2019 } })
    })
})