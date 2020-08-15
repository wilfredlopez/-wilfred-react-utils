import getCounter from "./getCounter";

describe("getCounter", () => {
  it("works with initial values", () => {
    let count = getCounter([1, 3, 2, 4, 1, 1, 1]);
    expect(count).toEqual({ "1": 4, "2": 1, "3": 1, "4": 1 });
    const data = [["fiesta"], ["p"], ["p"], ["fiesta"]];
    count = getCounter(data); //{ fiesta: 2, p: 2 }
    expect(count).toEqual({ fiesta: 2, p: 2 });
    count = getCounter("wilfred lopez wilfred lopez".split(" "));
    expect(count).toEqual({ wilfred: 2, lopez: 2 });
    count = getCounter("@wilfreddonaldlo");
    expect(Object.values(count).reduce((pre, cu) => Math.max(pre, cu))).toBe(3);
  });
});
