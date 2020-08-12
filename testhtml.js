//JUST TO GET INTELISENCE.
//NEED TO COMMENT OUT FOR IT TO WORK.
// const ReactUtils = require("./dist");
console.log(
  "%c ALL CONSOLE LOGS SHOULD BE %c TRUE",
  "background:black ; color: white",
  "color: green; font-size:15px",
);
const { memoize } = ReactUtils;

const fibMemo = memoize(function (n) {
  if (n <= 2) return 1;
  return fibMemo(n - 1) + fibMemo(n - 2);
});

console.log(fibMemo(20) === 6765); //6765
console.log(ReactUtils.Validator.isEmail("test@test") === false);
const obj = new ReactUtils.EnhancedObject();
try {
  obj._setValue = null;
} catch (error) {
  console.log(error);
}
obj._setValue("WILFRED", "EL MEJOR");
console.log(obj._getValue("WILFRED") === "EL MEJOR");
