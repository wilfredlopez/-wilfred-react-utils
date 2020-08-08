import deepCopy from './deepCopy'

describe.skip('deepCopy', () => {
    it('makes a deepCopy of array', () => {
        const a1 = [1]
        const a2 = [2]
        const arrOnObj = [2]
        const obj = {'me': 1, 'you': arrOnObj}
        let sym = Symbol('wil')
        let t = true
        let f = false
        let n = 50
        let s = "Hola"
        const original = [a2,a1, s, n, sym, null, undefined, obj, t, f]

        const mutatedCopy = [...original]
        const copy = deepCopy(original)
        a1[0] = 100
        a2[0] = 500
        arrOnObj[0] = 1000
        obj.me = 200000
        n++
        s.concat('wWWW')
        f = true
        t = false
        const isDeepCopy = JSON.stringify(copy) === '[[2],[1],"Hola",50,null,null,null,{"me":1,"you":[2]},true,false]'
        //Values change dont affect copy because its all new.
        expect(isDeepCopy).toBe(true)
        //copy is not original because original has changed due to mutation.
        expect(copy).not.toEqual(original)
        //copy is not equal to the  mutatedCopy.
        expect(copy).not.toEqual(mutatedCopy)
        //mutatedCopy is same as original because is not deep
        expect(mutatedCopy).toEqual(original)
    })
    it('works with all data types', () => {
        expect(deepCopy.bind(null, 'Im String')).not.toThrow()
        expect(deepCopy.bind(null, 11111)).not.toThrow()
        expect(deepCopy.bind(null,false)).not.toThrow()
        expect(deepCopy.bind(null,true)).not.toThrow()
        expect(deepCopy.bind(null,Symbol('me'))).not.toThrow()
        expect(deepCopy.bind(null,{})).not.toThrow()
        expect(deepCopy.bind(null,[])).not.toThrow()
        expect(deepCopy.bind(null,null)).not.toThrow()
        expect(deepCopy.bind(null,undefined)).not.toThrow()
        expect(deepCopy.bind(null,/w[regex]/)).not.toThrow()
        expect(deepCopy.bind(null,new Map())).not.toThrow()
        expect(deepCopy.bind(null,new Set())).not.toThrow()
        const fn = (name:string) => name
        expect(deepCopy.bind(null,fn)).not.toThrow()
        expect(deepCopy.bind(null,function(){
        })).not.toThrow()
      
    })
    it('goes as deep as necesary', () => {
        const user = {
            'name': "SOMEONE"
        }
        const data = {
            api: {
                db: {
                    users:[ {
                        user: user
                    }]
                }
            }
        }
        const copy = deepCopy(data)
        const regularCopy = Object.assign({}, data)
        user.name = "FULANO"
        expect(copy).not.toEqual(data)
        expect(regularCopy.api.db.users[0].user.name).toBe("FULANO")
        expect(data.api.db.users[0].user.name).toBe("FULANO")
        expect(copy.api.db.users[0].user.name).toBe("SOMEONE")
      
    })
})