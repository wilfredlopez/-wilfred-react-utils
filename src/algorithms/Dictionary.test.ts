import { Dictionary } from "./Dictionary";

describe("Dictionary", () => {
  it("Behaves different that regular object since It returns 0 if a value is undefined", () => {
    function characterCounter(str: string, dict: object | Dictionary<number>) {
      if (!str) return {};
      const result = dict;
      for (let char of str)
      {
        char = char.toLowerCase();
        if (!(/[a-zA-Z0-9]/.test(char)))
        {
          continue;
        }
        //if result[char] is undefined it will return 0 using ++ wont cause a NAN.
        result[char] = ++result[char];
      }
      return result;
    }

    expect(characterCounter("abcabc", new Dictionary<number>())).toEqual(
      { a: 2, b: 2, c: 2 },
    );
    expect(characterCounter("abcabc", {})).toEqual({ a: NaN, b: NaN, c: NaN });
  });
});
