import { Mapper } from "./Mapper";

const numbers = new Mapper<number>();

describe.skip("Mapper", () => {
  afterEach(() => {
    numbers.reset();
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
      expect(numbers.size).toBe(4);
      numbers.reset();
      expect(numbers.keys().length).toBe(0);
      expect(numbers.size).toBe(0);
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
      expect(data).toStrictEqual(
        [{ Walmart: 8556665545 }, { C21Stores: 5546659852 }],
      );
      const savedData = numbers.data;
      expect(savedData).toStrictEqual(
        { "C21Stores": 5546659852, "Walmart": 8556665545 },
      );
    });
  });
});
