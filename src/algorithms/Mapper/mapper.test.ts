import { Mapper } from "./Mapper";

const numbers = new Mapper<number>();

describe("Mapper", () => {
  afterEach(() => {
    numbers.reset();
  });

  describe('from another mapper', () => {
    const map = new Mapper<number[]>({ "1": [20, 20, 20] })
    expect(map.get("1")).toEqual([20, 20, 20])
    const map2 = new Mapper(map)
    expect(map2.get("1")).toEqual([20, 20, 20])
    const mapFrom = Mapper.from(map)
    expect(mapFrom.get("1")).toEqual([20, 20, 20])
  })

  describe('Braket Notation Getters', () => {
    const map = new Mapper<any, any>()
    map.set("25", "25")
    map.set(2222, [20, 20, 20])
    expect(map['25']).toBe("25")
    expect(map[2222]).toEqual([20, 20, 20])
    expect(map['something']).toBeUndefined()
  })


  describe("Iterator function", () => {
    it("Returns an iterator that allows to do a for of loop", () => {
      numbers.set("first", 111);
      numbers.set("second", 222);
      numbers.set("last", 0);
      let data = [];
      for (const n of numbers)
      {
        data.push(n);
      }
      expect(data).toStrictEqual([111, 222, 0]);
    });
  });
  describe("pop and unshift", () => {
    it("deletes the last value", () => {
      numbers.set("first", 111);
      numbers.set("second", 222);
      numbers.set("last", 0);
      let last = numbers.pop();
      expect(last).toBe(0);
    });
    it("deletes the first value", () => {
      numbers.set("first", 111);
      numbers.set("second", 222);
      numbers.set("last", 0);
      let first = numbers.unshift();
      expect(first).toBe(111);
    });
  });

  describe("SET AND GET", () => {
    it("sets the value", () => {
      numbers.set("Wilfred", 5514442665);
      numbers.set("Austria", 1);
      expect(numbers.get("Wilfred")).toBe(5514442665);
    });
    it("sets the value and overrides if the same key is passed", () => {
      numbers.set("Wilfred", 5514442665);
      numbers.set("Wilfred", 1);
      expect(numbers.get("Wilfred")).toBe(1);
    });
    it("Returns null if value key doesnt exist", () => {
      expect(numbers.get("Unknown")).toBe(null);
    });
  });

  describe("delete", () => {
    it("deletes the value and returns it if value was found.", () => {
      let key = "Theudy";
      numbers.set(key, 2222);
      const deleted = numbers.delete(key);
      expect(deleted).toBe(2222);
      expect(numbers.get(key)).toBe(null);
    });
    it("returns null if the value doest exist", () => {
      const deleted = numbers.delete("other");
      expect(deleted).toBe(null);
    });
  });

  describe("reset and size", () => {
    it("clears the data", () => {
      numbers.set("1", 1);
      numbers.set("2", 1);
      numbers.set("3", 1);
      numbers.set("4", 4);
      expect(numbers.length).toBe(4);
      numbers.reset();
      expect(numbers.keys().length).toBe(0);
      expect(numbers.length).toBe(0);
    });
  });

  describe("keys", () => {
    it("Returns an array with all the keys", () => {
      const keys = numbers.keys();
      expect(Array.isArray(keys));
      expect(keys.length).toBe(0);
      numbers.set("Walmart", 8556665545);
      numbers.set("C21Stores", 5546659852);
      expect(numbers.keys()).toStrictEqual(["Walmart", "C21Stores"]);
    });
  });

  describe("map and data", () => {
    it("Calls the function with each value, key and index of the key", () => {
      const empty = numbers.map((val) => {
        return val;
      });
      expect(Array.isArray(empty)).toBeTruthy();
      numbers.set("Walmart", 8556665545);
      numbers.set("C21Stores", 5546659852);
      const values = numbers.map((val) => {
        return val;
      });
      const data = numbers.map((val, key) => {
        return {
          [key]: val,
        };
      });
      expect(values).toStrictEqual([8556665545, 5546659852]);
      expect(data).toStrictEqual([
        { Walmart: 8556665545 },
        { C21Stores: 5546659852 },
      ]);
      const savedData = numbers.data;
      expect(savedData).toStrictEqual({
        C21Stores: 5546659852,
        Walmart: 8556665545,
      });
    });
  });
});
