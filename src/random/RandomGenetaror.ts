import { americanCities, states } from './default'
type Lorem = readonly [
  xs: readonly string[],
  sm: readonly string[],
  md: readonly string[],
  lg: readonly string[]
]

// type Lorem = readonly [
//   readonly string[],
//   readonly string[],
//   readonly string[],
//   readonly string[]
// ]

const loremIpsum: Lorem = [
  ['Lorem ipsum'],
  ['Lorem ipsum dolor sit amet.'],
  [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, dolorem.',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, quidem.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, vitae.',
  ],
  [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora nesciunt sit unde at magnam ducimus quos commodi maiores ratione? Magnam nemo aliquid at exercitationem eaque tempora perspiciatis pariatur quae?',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur fugit itaque asperiores eaque animi iusto saepe neque. Eaque iure non voluptatem neque labore, laborum error ad, eius saepe cum quo.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolores et earum. Facere qui non doloribus nostrum sapiente inventore labore, aspernatur amet blanditiis rerum atque incidunt. Sit laboriosam et earum.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quaerat saepe quia quibusdam minima, dolor, cupiditate recusandae obcaecati nihil reprehenderit nostrum nam perspiciatis expedita deserunt delectus possimus, totam voluptas. Placeat?',
  ],
] as const

export interface RandomConfig {
  [key: string]: string[]
}

/**
 * Random Text Generator
 * @param config Configuration object with different string arrays with data to generate.
 * @example
 * const dg = new RandomGenerator({
 *   animals: ['dog', 'panda', 'cat'],
 * })
 *
 * console.log(dg.from('animals')) //cat
 * console.log(dg.from('animals')) //dog
 */
export default class RandomGenerator<T extends RandomConfig> {
  private lorem: Lorem = loremIpsum
  cities: string[]
  states: string[]
  countries: string[]
  config: T
  /**
   *
   * @param config Configuration object with different string arrays with data to generate.
   */
  constructor(
    config: T = {} as T,
    locations?: { states?: string[]; cities?: string[]; countries?: string[] }
  ) {
    this.countries = ['US']
    this.states = states
    this.cities = americanCities
    this.config = config
    if (locations) {
      if (locations.states) {
        this.states = locations.states
      }
      if (locations.countries) {
        this.countries = locations.countries
      }
      if (locations.states) {
        this.states = locations.states
      }
    }
  }

  protected getRandom(max: number) {
    return Math.floor(Math.random() * max)
  }

  random(array: string[]) {
    return array[this.getRandom(array.length)]
  }

  /****************API*****************/

  text(size?: 'xs' | 'sm' | 'md' | 'lg') {
    const matchSize = {
      xs: this.lorem[0],
      sm: this.lorem[1],
      md: this.lorem[2],
      lg: this.lorem[3],
    }
    if (size) {
      return matchSize[size][this.getRandom(matchSize[size].length)]
    }

    const index = this.getRandom(this.lorem.length)
    const insideIndex = this.getRandom(this.lorem[index].length)
    return this.lorem[index][insideIndex]
  }

  address() {
    let address = ''
    for (let i = 0; i < 3; i++) {
      address += Math.floor(Math.random() * 9).toString()
    }
    address += ' ' + this.city().toLowerCase()
    const end = ['dr', 'st', 'av', 'pkwy', 'rd']
    address += ' ' + end[this.getRandom(end.length)]
    return address
  }

  city() {
    return this.random(this.cities)
  }

  zipCode() {
    let zip = ''
    for (let i = 1; i < 6; i++) {
      zip += Math.floor(Math.random() * 9).toString()
    }
    return zip
  }

  date() {
    return new Date()
  }

  randomBool() {
    return Math.random() > 0.5
  }

  protected getList(data: string[], max = 4) {
    const list: string[] = []
    let total = Math.floor(Math.random() * max)
    for (let i = 0; i <= total; i++) {
      list.push(this.random(data))
    }
    return this.removeDupplicates(list)
  }

  protected removeDupplicates<T>(array: T[]) {
    const set = new Set(array)
    return [...set.values()]
  }

  country() {
    return this.random(this.countries)
  }

  state() {
    return this.random(this.states)
  }

  location() {
    return {
      address: this.address(),
      city: this.city(),
      state: this.state(),
      zipcode: this.zipCode(),
      country: this.country(),
    }
  }

  from(key: keyof T) {
    if (!this.config[key]) {
      return ''
    }
    return this.random(this.config[key])
  }
}

// const dg = new RandomGenerator({
//   animals: ['dog', 'panda', 'cat'],
// })

// console.log(dg.from('animals')) //cat
// console.log(dg.from('animals')) //dog
