
  import { NumberHelper } from "./NumberHelper";
  const { getDigitAt, isPositive, switchSign, tryParseInt } = NumberHelper;

  describe("NumbersHelper", () => {
    describe("Math object functions", () => {
        expect(NumberHelper.round(20.6)).toBe(21)
        expect(NumberHelper.ceil(-20.6)).toBe(-20)
    })
    describe("isPositive", () => {
        expect(isPositive(-100)).toBe(false)
        expect(isPositive(50)).toBe(true)
    })
    describe("switchSign", () => {
        expect(switchSign(-100)).toBe(100)
        expect(switchSign(50)).toBe(-50)
    })
    describe("tryParseInt", () => {
        expect(tryParseInt('me').success).toBe(false)
        expect(tryParseInt('me').value).toBe(null)
        expect(tryParseInt('me').error).not.toBe(null)
        expect(tryParseInt('200').success).toBe(true)
        expect(tryParseInt('200').value).toBe(200)
        expect(tryParseInt('200').error).toBe(null)
    })
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
  });
  