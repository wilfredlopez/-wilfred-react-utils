import { EnhancedArray } from './EnhancedArray'
import { Validator } from '../validator'

describe("Enhanced Array", () => {
    describe("Default Value", () => {
        it("default value is returned when undefined.", () => {
            const array = new EnhancedArray<number>(0)
            for (let i = 1; i <= 10; i++)
            {
                //will never return undefined since default value is 0
                array[0] = array[0] + 1
            }
            expect(array[0]).toBe(10)
            expect(Validator.isSerializable(array)).toBe(true)
        })
    })
    describe("Deletes", () => {
        it("deletes with deep equality", () => {
            const defVal = 'Value is not there'
            const array = new EnhancedArray(defVal)
            array[0] = 'me'
            array[1] = 'to'
            const val = [1, 3]
            array[3] = val
            expect(array[200]).toBe(defVal)
            array.delete([1, 3], true) //true for deep equality delete.
            expect(array[3]).toBe(defVal)
        })
    })
    describe("clear", () => {
        it("clears all values in the array", () => {
            const array = new EnhancedArray<number>()
            const otherData = [1, 2, 2, 23, 3, 3, 4, 4]
            array.concat(otherData)
            expect(array.length).toBe(8)
            array.clear()
            expect(array.length).toBe(0)
            //but still returns the default value as [] if nothing is defined.
            expect(array[20]).toEqual([])

        })
    })
})