import {
  turnSecondsToFormatedMinutes,
  formatDuration,
  formatCentsToDollars,
} from "./index";

describe.skip("Numbers Module", () => {
  describe("turnSecondsToFormatedMinutes", () => {
    it("return the formated value in hours and minutes when a value doenst exceed to hours", () => {
      const value = turnSecondsToFormatedMinutes(1000);
      expect(value).toEqual("16:40");
    });
    it("return the formated value in hours and minutes even if the value exceeds to hours", () => {
      const value = turnSecondsToFormatedMinutes(10000);
      expect(value).toEqual("166:40");
    });
  });

  describe("formatDuration", () => {
    it("hours is 00 when the output is in minutes", () => {
      const value = formatDuration(1000);
      expect(value).toEqual("00:16:40");
    });
    it("return the formated value in hours, minutes, and seconds", () => {
      const value = formatDuration(10000);
      expect(value).toEqual("02:46:40");
    });
    describe("formatCentsToDollars", () => {
      it("works with valid input", () => {
        const cents = 50759;

        const dolars = formatCentsToDollars(cents);
        expect(dolars).toBe(507.59);
      });
      it("can handle negative numbers", () => {
        const cents = -1;

        const dolars = formatCentsToDollars(cents);
        expect(dolars).toBe(-0.01);
      });
      it("returns cero for 0 cents", () => {
        const cents = 0;
        const dolars = formatCentsToDollars(cents);
        expect(dolars).toBe(0);
      });
    });
  });
});
