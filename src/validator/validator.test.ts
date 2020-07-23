import { Validator } from "./Validator";

const invalidEmails = [
  "test",
  "test@",
  "test@test",
  "",
  "@do.com",
  "test.com",
  "mysite@.com.my",
  "@you.me.net",
  "mysite123@gmail.b",
  "mysite@.org.org",
  ".mysite@mysite.org",
  "mysite()*@gmail.com",
  "mysite..1234@yahoo.com",
  "Constantine.Mary-Ann.Elizabeth.Hyacinth.Gwendoline-Anne-Marie@test.",
];
const validEmails = [
  "test@test.com",
  "test-1@testing.site.com",
  "_me@google.com",
  "wilfredlopez@outlook.com",
  "shared_email@hotmail.net",
  "admin@wilfredlopez.net",
  "mysite@ourearth.com",
  "mysite@you.me.net",
  "my.ownsite@ourearth.org",
  "jhon@example.online",
];

describe.skip("Validator", () => {
  describe("isEmail", () => {
    it("Returns false when email is not valid", () => {
      for (let email of invalidEmails) {
        let isValid = Validator.isEmail(email);
        expect(isValid).toBe(false);
      }
      expect(Validator.isEmail(null)).toBe(false);
      expect(Validator.isEmail([])).toBe(false);
      expect(Validator.isEmail({})).toBe(false);
      expect(Validator.isEmail(undefined)).toBe(false);
      expect(Validator.isEmail(false)).toBe(false);
      expect(Validator.isEmail(true)).toBe(false);
      expect(Validator.isEmail(100)).toBe(false);
      expect(Validator.isEmail(Symbol("data"))).toBe(false);
    });
    it("Returns true when email is valid", () => {
      for (let email of validEmails) {
        let isValid = Validator.isEmail(email);
        expect(isValid).toBe(true);
      }
    });
  });
  describe("isNotEmptyString", () => {
    it("Returns false when any data besides a string with more than 1 character is passed", () => {
      expect(Validator.isNotEmptyString("")).toBe(false);
      expect(Validator.isNotEmptyString(Symbol("string"))).toBe(false);
      expect(Validator.isNotEmptyString(200)).toBe(false);
      expect(Validator.isNotEmptyString(false)).toBe(false);
      expect(Validator.isNotEmptyString(true)).toBe(false);
      expect(Validator.isNotEmptyString(null)).toBe(false);
      expect(Validator.isNotEmptyString([])).toBe(false);
      expect(Validator.isNotEmptyString({})).toBe(false);
      expect(Validator.isNotEmptyString(undefined)).toBe(false);
    });
    it("Returns true when a not empty string is passed as argument", () => {
      expect(Validator.isNotEmptyString("1")).toBe(true);
      expect(Validator.isNotEmptyString("wilfred")).toBe(true);
      expect(Validator.isNotEmptyString("some data")).toBe(true);
    });
  });

  describe("minLength", () => {
    it("Returns false the length is less than the specified", () => {
      expect(Validator.minLength("", 2)).toBe(false);
      expect(Validator.minLength("1", 2)).toBe(false);
      expect(Validator.minLength("wilfred", 29)).toBe(false);
    });
    it("Returns true the length is greater of equal to the specified", () => {
      expect(Validator.minLength("1", 1)).toBe(true);
      expect(Validator.minLength("wilfred", 4)).toBe(true);
      expect(Validator.minLength("austria castillo", 10)).toBe(true);
    });
    it("works with numbers as args", () => {
      expect(Validator.minLength(1, 1)).toBe(true);
      expect(Validator.minLength(0, 1)).toBe(true);
      expect(Validator.minLength(1000, 4)).toBe(true);
      expect(Validator.minLength(1000000000, 10)).toBe(true);
      expect(Validator.minLength(100000000, 10)).toBe(false);
    });
  });
  describe("maxLength", () => {
    it("Returns false the length is greater than the specified", () => {
      expect(Validator.maxLength("33333333", 2)).toBe(false);
      expect(Validator.maxLength("something more", 2)).toBe(false);
    });
    it("Returns true the length is less than or equal to the specified", () => {
      expect(Validator.maxLength("hi", 2)).toBe(true);
      expect(Validator.maxLength("something", 20)).toBe(true);
    });
    it("works with numbers as args", () => {
      expect(Validator.maxLength(1, 1)).toBe(true);
      expect(Validator.maxLength(0, 1)).toBe(true);
      expect(Validator.maxLength(10000, 4)).toBe(false);
      expect(Validator.maxLength(10000000000, 10)).toBe(false);
      expect(Validator.maxLength(10000000, 10)).toBe(true);
    });
  });
  describe("isLowerCase", () => {
    it("returns true if the entire string is lowercase", () => {
      expect(Validator.isLowerCase("wilfred")).toBe(true);
      expect(Validator.isLowerCase("h")).toBe(true);
      expect(Validator.isLowerCase("1 hour")).toBe(true);
      expect(Validator.isLowerCase("1minute")).toBe(true);
      expect(Validator.isLowerCase("1")).toBe(true);
    });
    it("returns false if any character on the string is not lowercase", () => {
      expect(Validator.isLowerCase("")).toBe(false);
      expect(Validator.isLowerCase("wilfRed")).toBe(false);
      expect(Validator.isLowerCase("Z")).toBe(false);
    });
    it("returns false invalid parameters are passed", () => {
      expect(Validator.isLowerCase(undefined)).toBe(false);
      expect(Validator.isLowerCase(null)).toBe(false);
      expect(Validator.isLowerCase([])).toBe(false);
      expect(Validator.isLowerCase(1)).toBe(false);
      expect(Validator.isLowerCase({})).toBe(false);
      expect(Validator.isLowerCase(false)).toBe(false);
      expect(Validator.isLowerCase(true)).toBe(false);
      expect(Validator.isLowerCase(Symbol("string"))).toBe(false);
    });
  });
  describe("isAfter", () => {
    it("returns a boolean ", () => {
      const before = "10/20/2020";
      const after = "11/20/2020";
      expect(Validator.isAfter(before, after)).toBe(false);
      expect(Validator.isAfter(after, before)).toBe(true);
      expect(Validator.isAfter("1/1/9000")).toBe(true);
      expect(Validator.isAfter(new Date().toString())).toBe(false);
    });
  });

  describe("isBefore", () => {
    it("check if the string is a date that's before the specified date.", () => {
      const before = "10/20/2020";
      const after = "11/20/2020";
      expect(Validator.isBefore(before, after)).toBe(true);
      expect(Validator.isBefore(after, before)).toBe(false);
      expect(Validator.isBefore("1/1/9000")).toBe(false);
      expect(Validator.isBefore("1/1/1900")).toBe(true);
    });
  });
  describe("contains", () => {
    it("check if the fullString contains the value.", () => {
      expect(Validator.contains("wilfred lopez", "wilfred")).toBe(true);
      expect(Validator.contains("wilfred lopez", "WILFRED")).toBe(false);
      expect(
        Validator.contains("wilfred lopez", "WILFRED", { ignoreCase: true }),
      )
        .toBe(true);
    });
  });
  describe("isDate", () => {
    it("Check if the input is a valid date.", () => {
      expect(Validator.isDate("wilfred lopez", "wilfred")).toBe(false);
      expect(Validator.isDate("invalid")).toBe(false);
      expect(Validator.isDate("1/20/20")).toBe(false);
      expect(Validator.isDate("10/20/2020", "MM/DD/YYYY")).toBe(true);
      expect(Validator.isDate("2020/01/01")).toBe(true);
      expect(Validator.isDate("2020/1/1", "YYYY/M/D")).toBe(true);
    });
  });
  describe("isInt", () => {
    it("Check if string or number is integer.", () => {
      //VALID
      expect(Validator.isInt(10)).toBe(true);
      //INVALID
      expect(Validator.isInt(10.1)).toBe(false);
      expect(Validator.isInt("2.1")).toBe(false);
      expect(Validator.isInt("w")).toBe(false);
    });
  });

  describe("isPort", () => {
    it("Check if is a valid port.", () => {
      //VALID
      expect(Validator.isPort(5000)).toBe(true);
      //INVALID
      expect(Validator.isPort(10.1)).toBe(false);
      expect(Validator.isPort(80000000)).toBe(false);
      expect(Validator.isPort("2.1")).toBe(false);
      expect(Validator.isPort("w")).toBe(false);
    });
  });
  describe("isURL", () => {
    it("Check if the string is an URL.", () => {
      expect(Validator.isURL("http://wilfredlopez.net")).toBe(true);
      expect(Validator.isURL("https://wilfredlopez.net")).toBe(true);
      expect(Validator.isURL("https://www.wilfredlopez.net")).toBe(true);
      expect(Validator.isURL("www.test.com")).toBe(true);

      expect(Validator.isURL("http:www.test.com")).toBe(false);
      expect(Validator.isURL("www.test.")).toBe(false);
      expect(Validator.isURL("mr")).toBe(false);
      expect(Validator.isURL("http")).toBe(false);
    });
  });

  describe("isIP", () => {
    it("should return true for valid ips", () => {
      const valid = [
        "127.0.0.1",
        "0.0.0.0",
        "255.255.255.255",
        "1.2.3.4",
        "::1",
        "2001:db8:0000:1:1:1:1:1",
        "2001:41d0:2:a141::1",
        "::ffff:127.0.0.1",
        "::0000",
        "0000::",
        "1::",
        "1111:1:1:1:1:1:1:1",
        "fe80::a6db:30ff:fe98:e946",
        "::",
        "::ffff:127.0.0.1",
        "0:0:0:0:0:ffff:127.0.0.1",
      ];

      for (let ip of valid) {
        expect(Validator.isIP(ip)).toBe(true);
      }
    });
    it("should return false for invalid ips", () => {
      const invalid = [
        "abc",
        "256.0.0.0",
        "0.0.0.256",
        "26.0.0.256",
        "0200.200.200.200",
        "200.0200.200.200",
        "200.200.0200.200",
        "200.200.200.0200",
        "::banana",
        "banana::",
        "::1banana",
        "::1::",
        "1:",
        ":1",
        ":1:1:1::2",
        "1:1:1:1:1:1:1:1:1:1:1:1:1:1:1:1",
        "::11111",
        "11111:1:1:1:1:1:1:1",
        "2001:db8:0000:1:1:1:1::1",
        "0:0:0:0:0:0:ffff:127.0.0.1",
        "0:0:0:0:ffff:127.0.0.1",
      ];

      for (let ip of invalid) {
        expect(Validator.isIP(ip)).toBe(false);
      }
    });
  });
  describe("matches", () => {
    it("check if string matches the pattern.", () => {
      expect(Validator.matches("abcde", /[abc]/)).toBe(true);
      expect(Validator.matches("123abc", /[abc]/)).toBe(true);
      expect(Validator.matches("something", /[0-9]/)).toBe(false);
      expect(Validator.matches("acd", "abc")).toBe(false);
    });
  });
  describe("isPositive", () => {
    it("Check if number is positive or not", () => {
      expect(Validator.isPositive(20)).toBe(true);
      expect(Validator.isPositive(1)).toBe(true);
      expect(Validator.isPositive(20.3)).toBe(true);
      expect(Validator.isPositive(-1)).toBe(false);
      expect(Validator.isPositive(0)).toBe(false);
    });
  });
});
