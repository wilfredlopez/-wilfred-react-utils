import {
  turnSecondsToFormatedMinutes,
  formatDuration,
  formatCentsToDollars,
} from "./index";
import { NumberHelper } from "./NumberHelper";
const { getDigitAt } = NumberHelper;

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
  describe("getDigit", () => {
    it("returns the right number of the specified place", () => {
      const d = getDigitAt(12345, 0);
      expect(d).toBe(5);
    });
    it("Works for short and long numbers", () => {
      const d = getDigitAt(123456789, 0);
      expect(d).toBe(9);
      const d2 = getDigitAt(123456789, 1);
      expect(d2).toBe(8);
      const d3 = getDigitAt(1, 0);
      expect(d3).toBe(1);
    });
    it("Returns the 0 if the place doesnt exist on the number", () => {
      const d = getDigitAt(12, 3);
      expect(d).toBe(0);
      const d2 = getDigitAt(12345, 7);
      expect(d2).toBe(0);
      const d3 = getDigitAt(1, 4);
      expect(d3).toBe(0);
    });
    it("Works for negative numbers but only returns a positive one", () => {
      const dbad = getDigitAt(-12, 3);
      expect(dbad).toBe(0);
      const dgood = getDigitAt(-12, 0);
      expect(dgood).toBe(2);
      const first = getDigitAt(-12, 1);
      expect(first).toBe(1);
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
