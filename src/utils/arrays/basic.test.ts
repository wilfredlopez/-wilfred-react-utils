import {
  bubleSort,
  insertionSort,
  mergeSort,
  mergeArr,
} from "./basic";

describe("Array Utils", () => {
  describe("bubleSort", () => {
    it("Sorts Ascending by default", () => {
      const set = [100, 50, 200, 20, 40, 30];
      const expected = [20, 30, 40, 50, 100, 200];
      const sorted = bubleSort(set);
      expect(sorted).toStrictEqual(expected);
    });
    it("Sorts Descending by when option is passed", () => {
      const set = [100, 50, 200, 20, 40, 30];
      const expected = [200, 100, 50, 40, 30, 20];
      const sorted = bubleSort(set, "DES");
      expect(sorted).toStrictEqual(expected);
    });
    it("Doesnt mutate the array by default", () => {
      const set = [100, 50, 200, 20, 40, 30];
      const sorted = bubleSort(set, "DES");
      expect(sorted).not.toEqual(set);
    });
    it("Mutates the array if the options is passed.", () => {
      const set = [100, 50, 200, 20, 40, 30];
      const sorted = bubleSort(set, "DES", false);
      expect(sorted).toEqual(set);
    });
  });
  describe("insertionSort", () => {
    it("sorts numbers ascending", () => {
      const testNumbers = [1, 2, 4, 0, 3, 10, 20];
      const expected = [0, 1, 2, 3, 4, 10, 20];
      const res = insertionSort(testNumbers);
      expect(res).not.toEqual(testNumbers);
      expect(res).toEqual(expected);
    });
    it("sorts numbers desending", () => {
      const testNumbers = [1, 2, 4, 0, 3, 10, 20];
      const expected = [20, 10, 4, 3, 2, 1, 0];
      const res = insertionSort(testNumbers, "DES");
      expect(res).not.toEqual(testNumbers);
      expect(res).toEqual(expected);
    });
    it("sorts strings", () => {
      const testStr = ["z", "d", "a", "y", "b", "c"];
      const expectedAsc = ["a", "b", "c", "d", "y", "z"];
      const expectedDes = ["z", "y", "d", "c", "b", "a"];
      const res = insertionSort(testStr);
      const des = insertionSort(testStr, "DES");

      expect(res).not.toEqual(testStr);
      expect(des).not.toEqual(testStr);
      expect(res).toEqual(expectedAsc);
      expect(des).toEqual(expectedDes);
    });
  });
  describe("mergeSort", () => {
    it("Returns the sorted array of string and numbers", () => {
      const testStr = ["z", "d", "a", "y", "b", "c"];
      const testNs = [100, 200, 400, 500, 50, 2, 1];
      const expectedAsc = ["a", "b", "c", "d", "y", "z"];
      const expectedNs = [1, 2, 50, 100, 200, 400];

      const sortedNumbers = mergeSort(testNs);
      const sortedStrings = mergeSort(testStr);

      expect(sortedNumbers).not.toEqual(testStr);
      expect(sortedNumbers).toEqual(expectedNs);
      expect(sortedStrings).not.toEqual(testStr);
      expect(sortedStrings).toEqual(expectedAsc);
    });
  });
  describe("mergeArr & splitArray", () => {
    it("Merges any 2 arrays no matter their length", () => {
      const a1 = [2, 4, 5, 6, 7, 7, 7];
      const a2 = ["what", "are", "you", "saying"];
      const expected = [2, 4, 5, 6, 7, 7, 7, "what", "are", "you", "saying"];
      const m = mergeArr(a1, a2);
      expect(m).toStrictEqual(expected);

      const b1 = [200, 300, 400, 500, 600, 2, 4, 5, 6, 7, 7, 7];
      const b2 = ["what", "are", "you", "saying", "?"];
      const expectedb = [
        200,
        300,
        400,
        500,
        600,
        2,
        4,
        5,
        6,
        7,
        7,
        7,
        "what",
        "are",
        "you",
        "saying",
        "?",
      ];
      const b = mergeArr(b1, b2);
      expect(b).toStrictEqual(expectedb);
    });
  });
});
