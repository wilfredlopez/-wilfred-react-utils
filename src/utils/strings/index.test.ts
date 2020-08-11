import { StringHelper } from "./index";
const { reduceLongString, toProperCase, slogify, camelCase, objectFromCSS } =
  StringHelper;
describe("String Methods", () => {
  describe("objectFromCSS", () => {
    it("it turns regular css in to object", () => {
      const clasOb = objectFromCSS`
  background-color: red;
  position: absolute;
  flex-direction: column;
  `;
      expect(clasOb.backgroundColor).toEqual("red");
      expect(clasOb.flexDirection).toEqual("column");
      expect(clasOb.position).toEqual("absolute");
    });
  });
  describe("camelCase", () => {
    it("returns the camelCase version.", () => {
      const str = "hello-world";
      const s = camelCase`${str}`;
      expect(s).toEqual("helloWorld");
      expect(camelCase`home-games`).toEqual("homeGames");
      expect(camelCase`
      background-color: red;
      position: absolute;
      flex-direction: column;
      `).toEqual(
        `
      backgroundColor: red;
      position: absolute;
      flexDirection: column;
      `,
      );
      //backgroundColor: red; position: absolute; flexDirection: column;
    });
  });
  describe("slogify", () => {
    it("returns the slogified version.", () => {
      const str = "hello world";
      const s = slogify(str);
      expect(s).toEqual("hello-world");
      expect(slogify("wilfred donald lopez")).toEqual("wilfred-donald-lopez");
      expect(slogify("wilfred, donald lopez.")).toEqual("wilfred-donald-lopez");
      expect(slogify("home tools")).toEqual("home-tools");
    });
  });
  describe("reduceLongString", () => {
    it("returns the same string if its less than the maxLength", () => {
      const str = "hello";
      const s = reduceLongString(str, 10);
      expect(s).toEqual(str);
    });
    it("returns the string with ... at the end when its more than the maxLength", () => {
      const str = "hello world";
      const s = reduceLongString(str, 10);
      expect(s).toEqual("hello w...");
    });
  });
  describe("toProperCase", () => {
    it("returns the same string trimmed and with proper case", () => {
      const str = " hello world 2";
      const properStr = " Hello World 2";
      const s = toProperCase(str);
      expect(s).toEqual(properStr);
    });
    it("works with a single word", () => {
      const str = " hello";
      const properStr = " Hello";
      const s = toProperCase(str);
      expect(s).toEqual(properStr);
    });
    it("works with a multiline word. the output should be trimmed.", () => {
      const str = `hello yo se que si
      es bueno.`;
      const properStr = `Hello Yo Se Que Si
      Es Bueno.`;

      const s = toProperCase(str);
      expect(s).toEqual(properStr);
    });
  });
});
