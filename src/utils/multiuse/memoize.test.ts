import { memoize } from "./memoize";
import { wait } from "@testing-library/react";

describe("memoize", () => {
  it("has the expected cache size", () => {
    const fib = memoize(function (n: number) {
      if (n < 3) return 1;
      let current = 1;
      let next = 1;
      for (let i = 3; i <= n; i++) {
        let temp = next;
        next = current + next;
        current = temp;
      }
      return next;
    });
    expect(fib(3)).toBe(2);
    expect(fib(20)).toBe(6765);
    expect(fib(20)).toBe(6765);
    expect(fib(3)).toBe(2);
    expect(fib.cache.size).toBe(2);
  });
  it("performs faster with cached version", async () => {
    const fibSlow = memoize(function (n: number): number {
      if (n < 3) return 1;
      return fibSlow(n - 1) + fibSlow(n - 2);
    });
    const lookUp = 600;
    const expectedVal = 1.1043307057295211e+125;
    const start1 = +new Date();
    const result1 = fibSlow(lookUp);
    expect(result1).toBe(expectedVal);
    const end1 = +new Date();
    const start2 = +new Date();
    const result2 = fibSlow(lookUp);
    expect(result2).toBe(expectedVal);
    const end2 = +new Date();
    const diff1 = end1 - start1;
    const diff2 = end2 - start2;
    expect(diff1).toBeGreaterThanOrEqual(diff2);
  });
  it("cache doesnt go over the specified maxCacheSize", () => {
    const sillyN = memoize(function (n: number) {
      return n;
    }, { maxCacheSize: 2 });
    expect(sillyN(3)).toBe(3);
    expect(sillyN(20)).toBe(20);
    expect(sillyN(20)).toBe(20);
    expect(sillyN(3)).toBe(3);
    expect(sillyN.cache.size).toBe(2);
    sillyN(4); //here cache will be reduced to half
    sillyN(5);
    sillyN(6);
    sillyN(7);
    expect(sillyN.cache.size).toBeLessThanOrEqual(2);
  });
  it("resolves the keys with custom function", () => {
    const users = [
      { id: 1, name: "W" },
      { id: 2, name: "J" },
      { id: 3, name: "A" },
    ];

    const getUser = memoize(function (id: number) {
      const user = users.find((u) => u.id === id);
      return user;
    }, {
      resolver: (uid) => uid,
    });

    expect(getUser(1).name).toBe("W");
    expect(getUser(2).name).toBe("J");
    expect(getUser(3).name).toBe("A");

    expect(getUser.cache.has(1)).toBe(true);
    expect(getUser.cache.has(2)).toBe(true);
    expect(getUser.cache.has(3)).toBe(true);
    expect(getUser.cache.has(4)).toBe(false);
    expect(getUser(1).name).toBe("W");
    expect(getUser(2).name).toBe("J");
    expect(getUser(3).name).toBe("A");
  });
  it("clears cache after ttl time passes", async () => {
    let users = [
      { id: 1, name: "W" },
      { id: 2, name: "J" },
      { id: 3, name: "A" },
    ];

    const getUser = memoize(function (id: number) {
      const user = users.find((u) => u.id === id);
      return user;
    }, {
      resolver: (uid) => uid,
      ttl: 100,
    });

    expect(getUser(1).name).toBe("W");
    expect(getUser(2).name).toBe("J");
    expect(getUser(3).name).toBe("A");
    users[0] = { id: 1, name: "WIL" };
    //cache still returns the cached value before ttl (100ms)
    expect(getUser(1).name).toBe("W");

    await wait(() => {
      //cache was updated after ttl (100ms) passed.
      expect(getUser(1).name).toBe("WIL");
    }, { timeout: 2000 }).then(() => {
    });
  });
});
