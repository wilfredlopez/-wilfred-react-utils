import getCounter from './getCounter'

describe("getCounter", () => {
    it('works with initial values', () => {
        const count = getCounter([1, 3, 2, 4, 1, 1, 1])
        expect(count).toEqual({ '1': 4, '2': 1, '3': 1, '4': 1 })
        const data = [['fiesta'], ['p'], ['p'], ['fiesta']]
        const count2 = getCounter(data) //{ fiesta: 2, p: 2 }
        expect(count2).toEqual({ fiesta: 2, p: 2 })
    })
})