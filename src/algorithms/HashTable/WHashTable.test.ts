import { WHasTable, HashNode } from "./WHashTable";

describe.skip("WHasTable", () => {
  describe("constructor", () => {
    it("creates an empty hash table", () => {
      const table = new WHasTable(53);
      expect(table.bucketSize).toBe(53);
    });
  });
  describe("handles low bucket size", () => {
    const lowTable = new WHasTable(3);
    expect(lowTable.bucketSize).toBe(3);
    lowTable.set("one", 1);
    lowTable.set("two", 2);
    lowTable.set("three", 3);
    lowTable.set("four", 4);
    lowTable.set("five", 5);
    expect(lowTable.get("one")).toBe(1);
    expect(lowTable.get("two")).toBe(2);
    expect(lowTable.get("three")).toBe(3);
    expect(lowTable.get("five")).toBe(5);
  });
  describe("set", () => {
    it("sets the value and overrides if same key is used", () => {
      const table = new WHasTable(53);
      table.set("me", "Wilfred");
      table.set("me", "Lopez"); //override
      table.set("mom", "Austria");
      expect(table.get("me")).toBe("Lopez");
    });
  });

  describe("get", () => {
    let getTable: WHasTable<string> = null;
    beforeAll(() => {
      getTable = new WHasTable<string>(53);
      getTable.set("red", "#003344");
      getTable.set("blue", "#FF3344");
      getTable.set("yellow", "#CC3344");
      getTable.set("pink", "#00DD44");
      getTable.set("purple", "#55FFFF");
      getTable.set("prime", "#22ddcc");
    });
    it("Gets the correct value", () => {
      expect(getTable.get("red")).toBe("#003344");
      expect(getTable.get("prime")).toBe("#22ddcc");
    });
    it("returns null if there's no value at that key", () => {
      expect(getTable.get("idont")).toBe(null);
      expect(getTable.get("crazyColor")).toBe(null);
    });
    it("Gets the correct keys", () => {
      const keys = getTable.getKeys();
      expect(keys.includes("yellow")).toBeTruthy();
      expect(keys.includes("pink")).toBeTruthy();
      expect(keys.includes("blue")).toBeTruthy();
      expect(keys.includes("red")).toBeTruthy();
      expect(keys.includes("prime")).toBeTruthy();
      expect(keys.includes("purple")).toBeTruthy();
      expect(keys.length).toBe(6);
    });
  });
  describe("@getAll @getNodes @forEach", () => {
    let hTable: WHasTable<number>;
    beforeAll(() => {
      hTable = new WHasTable<number>();
      hTable.set("one", 1);
      hTable.set("two", 2);
      hTable.set("three", 3);
      hTable.set("four", 4);
    });
    it("gets all values", () => {
      const data = hTable.getAll();
      expect(data.includes(1)).toBeTruthy();
      expect(data.includes(2)).toBeTruthy();
      expect(data.includes(3)).toBeTruthy();
      expect(data.includes(4)).toBeTruthy();
      expect(Array.isArray(data)).toBeTruthy();
    });
    it("forEach returns and iterator", () => {
      const data = [];
      const indexes = [];
      hTable.forEach((v, inx) => {
        data.push(v);
        indexes.push(inx);
      });
      expect(data[indexes[0]]).toStrictEqual(data[0]);
      expect(data[indexes[1]]).toStrictEqual(data[1]);
    });
    it("gets all nodes", () => {
      const data = hTable.getNodes();
      expect(Array.isArray(data)).toBeTruthy();
      expect(data[0]).toBeInstanceOf(HashNode);
    });
  });
});
