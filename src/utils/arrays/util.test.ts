import {
  getDigit,
  arraysEqual,
  splitArray,
  swap,
  digitCount,
  mostDigits,
} from "./util";

describe.skip("Get Digit and arraysEqual", () => {
  describe("Swap", () => {
    it("Swaps the array at the specified indexes", () => {
      const dataSet = ["W", "L"];
      const expected = ["L", "W"];
      swap(dataSet, 0, 1);
      expect(dataSet).toStrictEqual(expected);
    });
    it("Array stays the same length", () => {
      const dataSet = ["W", "L"];
      const expected = ["L", "W"];
      swap(dataSet, 0, 1);
      expect(dataSet).toStrictEqual(expected);
      expect(dataSet.length).toEqual(2);
    });
    it("Handles big arrays", () => {
      const dataSet = ["W", "L", "I", "F", "R", "E", "D"];
      const expected = ["W", "I", "L", "F", "R", "E", "D"];
      swap(dataSet, 1, 2);
      expect(dataSet).toStrictEqual(expected);
      expect(dataSet.length).toEqual(7);
    });
  });
  describe("getDigit", () => {
    it("returns the right number of the specified place", () => {
      const d = getDigit(12345, 0);
      expect(d).toBe(5);
    });
    it("Works for short and long numbers", () => {
      const d = getDigit(123456789, 0);
      expect(d).toBe(9);
      const d2 = getDigit(123456789, 1);
      expect(d2).toBe(8);
      const d3 = getDigit(1, 0);
      expect(d3).toBe(1);
    });
    it("Returns the 0 if the place doesnt exist on the number", () => {
      const d = getDigit(12, 3);
      expect(d).toBe(0);
      const d2 = getDigit(12345, 7);
      expect(d2).toBe(0);
      const d3 = getDigit(1, 4);
      expect(d3).toBe(0);
    });
    it("Works for negative numbers but only returns a positive one", () => {
      const dbad = getDigit(-12, 3);
      expect(dbad).toBe(0);
      const dgood = getDigit(-12, 0);
      expect(dgood).toBe(2);
      const first = getDigit(-12, 1);
      expect(first).toBe(1);
    });
  });
  describe("arraysEqual", () => {
    const testDataBig = Array.from({ length: 1000 }, () => 1).map((_, index) =>
      index
    );
    const shouldTrue = arraysEqual(
      [testDataBig, testDataBig],
      [testDataBig, testDataBig],
    );
    expect(shouldTrue).toBeTruthy();
  });
  describe("splitArray", () => {
    it("Splits the array", () => {
      const joined = [1, 2];
      const [one, two] = splitArray(joined);
      expect(one).toStrictEqual([1]);
      expect(two).toStrictEqual([2]);

      const deepJoined = [1, 2, 100, 200, { data: null }, { data: "name" }];
      const [sideA, sideB] = splitArray(deepJoined);
      expect(sideA).toStrictEqual([1, 2, 100]);
      expect(sideB).toStrictEqual([200, { data: null }, { data: "name" }]);
    });
  });
  describe("digitCount", () => {
    it("Returns the count of digits in a number", () => {
      expect(digitCount(1)).toBe(1);
      expect(digitCount(0)).toBe(1);
      expect(digitCount(20)).toBe(2);
      expect(digitCount(12345)).toBe(5);
      expect(digitCount(123456789)).toBe(9);
      expect(digitCount(123456789123456)).toBe(15);
    });
  });

  describe("mostDigits", () => {
    it("returns the max digit count for the numbers in the array", () => {
      expect(mostDigits([22, 403, 12345678])).toBe(8);
      expect(mostDigits([22, 2, 30, 20, 30])).toBe(2);
      expect(mostDigits([1, 2, 3, 4])).toBe(1);
    });
  });
});
