import { combineClasses } from "./combineClasses";

class Logger {
  log() {
    // console.log(this)
  }
}

describe("combineClasses", () => {
  it("combines two classes", () => {
    const CombinedArray = combineClasses<string[], Logger>(Array, Logger);
    const arrayAndLogger = CombinedArray();
    arrayAndLogger.push("wilfred");
    arrayAndLogger.push("austria");
    arrayAndLogger.log();
    expect(arrayAndLogger).toHaveProperty("log");
    expect(arrayAndLogger).toHaveProperty("push");
  });
});
