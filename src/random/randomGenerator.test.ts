import RandomGenetaror from './RandomGenetaror'

let gen: RandomGenetaror<any>
describe('randomGenerator', () => {
  describe('basic functionality', () => {
    beforeEach(() => {
      gen = new RandomGenetaror()
    })
    it('creates a generator without initial arguments', () => {
      const city = gen.from('')
      expect(city).toBe('')
      expect(gen.text('sm')).toBeDefined()
    })

    it('generates text', () => {
      const t1 = gen.text('sm')
      const t2 = gen.text('lg')
      const zip = gen.zipCode()
      expect(typeof t1).toBe('string')
      expect(t2.length).toBeGreaterThan(t1.length)
      expect(zip.length).toBe(5)
    })
  })

  describe('custom data', () => {
    it('generates random strings from custom data', () => {
      const frases = ['Wilfred', 'Im Great', 'You are perfect', 'Thank You!']
      const greetings = [
        'Hello',
        'Good Morning',
        'Good Evening',
        'Good Afternoon',
        'Hi!',
      ]
      const customGen = new RandomGenetaror({
        frases: frases,
        greetings,
      })

      const aFrase = customGen.from('frases')
      const great = customGen.from('greetings')
      expect(frases.includes(aFrase)).toBeTruthy()
      expect(greetings.includes(great)).toBeTruthy()
    })
  })
})
