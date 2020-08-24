import { DateFormatter, getMonthFromInt } from "./index";

describe("DateFormatter", () => {
  it("returns the correct date", () => {
    const date = new DateFormatter("August 19, 1975 23:15:30");

    expect(date.formatedDate()).toEqual("19-Aug-1975");
  });

  it("formats to single month", () => {
    const today = new Date();
    const date = new DateFormatter(`September 19, ${today.getFullYear()}`);
    expect(date.formatedDate()).toEqual(`19-Sep-${today.getFullYear()}`);
  });

  it("formats to full month", () => {
    const today = new Date();
    const date = new DateFormatter(`September 19, ${today.getFullYear()}`);
    expect(date.formattedFullDate()).toEqual(
      `19-September-${today.getFullYear()}`,
    );
  });
});

describe("getMonthFromInt", () => {
  it("gets the correct month when the value is valid", () => {
    const jan = getMonthFromInt(0);
    expect(jan).toEqual("January");
    const feb = getMonthFromInt(1);
    expect(feb).toEqual("February");
    const dec = getMonthFromInt(11);
    expect(dec).toEqual("December");
  });

  it("returns null when the argument is valid", () => {
    const invalid: any = "0";
    const M = getMonthFromInt(invalid);
    expect(M).toEqual(null);
  });
});
