import { ArrayHelper } from "./ArrayHelper";
const {
  arraysEqual,
  splitArray,
  swap,
  digitCount,
  mostDigits,
  mergeSort,
  quickSort,
  deepCopy,
  concat,
  isArray,
  arrayMoveMutate,
  move,
  createMap
} = ArrayHelper;

describe("ArrayHelper", () => {

  describe('createMap', () => {
    interface Data {
      name: string,
      count: number
    }
    const FAKE_DATA: Data[] = [{ count: 19, name: "BEST ONE" }, { count: 2, name: "SHORT ONE" }]
    const mapToLowerCase = createMap(
      (data: Data) => ({ ...data, name: data.name.toLocaleLowerCase() })
    )

    const data = mapToLowerCase(FAKE_DATA)
    expect(data[0].name).toBe(FAKE_DATA[0].name.toLowerCase())
    expect(data[0].name).not.toBe(FAKE_DATA[0].name)
    expect(data[1].name).toBe(FAKE_DATA[1].name.toLowerCase())
    expect(data[1].name).not.toBe(FAKE_DATA[1].name)
  })
  describe("arrayMoveMutate vs move", () => {
    const data = { name: 'some' }
    const myArray = [{ data: data }, 22, 44,]

    arrayMoveMutate(myArray, 0, 2)//move position 0(data) to position 2
    data.name = 'OTHER_NAME'
    //@ts-expect-error
    expect(myArray[2].data.name).toBe('OTHER_NAME')

    const myArray2 = [{ data: data }, 22, 44,]
    const moved = move(myArray2, 0, 2) //returns new array and myArray2 position doesnt change.
    data.name = 'CHANGED' //this should not affect the moved array since returns a new array.
    expect(myArray2[2]).toBe(44)
    //@ts-expect-error
    expect(moved[2].data.name).toBe('OTHER_NAME')
  })
  describe('concat', () => {
    const data = [1, 3, 4] as const
    const other = ['hi', 'hello']

    //type [1, 3, 4, ...string[]]
    const merge = concat(data, other)
    expect(merge).toEqual([1, 3, 4, "hi", 'hello'])


  })
  describe('is array', () => {
    expect(isArray([])).toBe(true)
    expect(isArray('')).toBe(false)
    expect(isArray(1)).toBe(false)
    expect(isArray(true)).toBe(false)
    expect(isArray(new Map())).toBe(false)
    expect(isArray(new Date())).toBe(false)
  })
  describe('deepCopy', () => {
    const data = { name: 'some' }
    const myArray = [22, 44, { data: data }] as const

    const copy = deepCopy(myArray)
    const notCopy = [...myArray] as const
    data.name = 'OTHER_NAME'
    expect(copy[2].data.name).toBe('some')
    expect(notCopy[2].data.name).toBe('OTHER_NAME')
  })
  describe("quickSort", () => {
    it("can sort numbers from greatest to least by default.", () => {
      const result = quickSort(
        [100, 99, 88, 45, 4, 6, 7],
      );
      expect(result).toStrictEqual([100, 99, 88, 45, 7, 6, 4]);
    });

    it("can sort numbers from least to greatest with custom function.", () => {
      const result = mergeSort(
        [100, 99, 88, 45, 4, 6, 7],
        (v1, v2) => v1 > v2,
      );
      expect(result).toStrictEqual([4, 6, 7, 45, 88, 99, 100]);
    });

    it("can sort strings with a custom compare function.", () => {
      const result = quickSort(
        ["A", "Z", "B", "a", "b", "D", "H", "G"],
        {
          compare: function compare(value1, value2) {
            return value1.toLowerCase() >= value2.toLowerCase();
          },
        },
      );
      expect(result).toStrictEqual(["a", "A", "b", "B", "D", "G", "H", "Z"]);
    });
  });

  describe("mergeSort", () => {
    it("can sort numbers from least to greatest by default.", () => {
      const result = mergeSort(
        [100, 99, 88, 45, 4, 6, 7],
      );
      expect(result).toStrictEqual([4, 6, 7, 45, 88, 99, 100]);
    });
    it("can sort strings with a custom compare function.", () => {
      const result = mergeSort(
        ["A", "Z", "B", "a", "b", "D", "H", "G"],
        function compare(value1, value2) {
          return value1.toLowerCase() >= value2.toLowerCase();
        },
      );
      expect(result).toStrictEqual(["a", "A", "b", "B", "D", "G", "H", "Z"]);
    });
  });
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

  describe("arraysEqual", () => {
    const testDataBig = Array.from({ length: 1000 }, () => 1).map(
      (_, index) => index,
    );
    const shouldTrue = arraysEqual(
      [testDataBig, testDataBig],
      [testDataBig, testDataBig],
    );
    expect(shouldTrue).toBeTruthy();
    const notEqual = arraysEqual([1, 2], [2, 4])
    expect(notEqual).toBeFalsy()
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
