import { fib } from './index'

describe('fib', () => {
  it('Gets the right value in timely matter', () => {
    const fivOf10 = fib(10)
    expect(fivOf10).toBe(55)
    // const fivOf20 = fib(20)
    // expect(fivOf20).toBe(6765)
    // const fivOf100 = fib(100)
    // expect(fivOf100).toBe(354224848179262000000)
  })
  // it('handles super large numbers', () => {
  //   const fivOf1000 = fib(1000)
  //   const fibOf10000 = fib(10000);
  //   expect(fivOf1000).toBe(4.346655768693743e208)
  //   expect(fibOf10000).toBe(Infinity);
  // })
})
