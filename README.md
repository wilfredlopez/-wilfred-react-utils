# React Utilify Functions and Types

#### Install

###### NPM

```
npm install @wilfredlopez/react-utils
```

###### Script Tag

```html
<script src="https://unpkg.com/@wilfredlopez/react-utils@1.0.6/dist/index.js"></script>
<script type="text/javascript">
  console.log(ReactUtils.Cipher)
</script>
```

### ES

```ts
import {
  AssertionError,
  assert,
  assertIsString,
  forceString,
} from "@wilfredlopez/react-utils"

const error = new AssertionError("message")

const n = 1
function doSomething(value) {
  assert(typeof n === "number")
  return n + 20
}
doSomething("string") //throws error

function sendMessage(message: any) {
  assertIsString(message) //throws error if not string
  message.trim() //will give you auto-complete for string type
}
```

## assertNever

```ts
import { assertNever } from "@wilfredlopez/react-utils"
enum AppActions {
  "SET_STATE",
  "ADD",
  "REMOVE",
}
interface Actions {
  type: AppActions
  payload: any
}

export function myReducer(state = {}, action: Actions): {} {
  switch (action.type) {
    case AppActions.SET_STATE:
      return { ...state, ...action.payload }
    case AppActions.ADD:
      return { ...state }
    case AppActions.REMOVE:
      return {
        ...state,
      }
    default:
      assertNever(action.type, "Not all actions are being handled.")
      return state
  }
}
```

## StringHelper & NumberHelper

```ts
import { StringHelper, NumberHelper } from "@wilfredlopez/react-utils"
StringHelper.slogify("hello world") //"hello-world";
StringHelper.toProperCase(" hello world 2") //" Hello World 2";
const pg = new PatternGenerator("'WL'-XXXXX")

const codes = []
console.log(pg.next) //WL-H2QDD
while (codes.length < 50) {
  codes.push(pg.next)
}
console.log(codes) //[ 'WL-H2QDD', 'WL-LHCO7', 'WL-0EFK6', 'WL-SQU7W',...,'WL-9NYHX' ] 


NumberHelper.formatDuration(10000) //"02:46:40";
const arr = [...NumberHelper.range({ start: 0, end: 10 })];
console.log(arr); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

const iter = ArrayHelper.createReverseArrayIterator([1, 2, 3, 4]);
    for (let i of iter) {
      console.log(i);// 4,3,2,1
    }
console.log(NumberHelper.isPrime(7)) //true
console.log(NumberHelper.isPrime(20)) //false
```
## Validator
```ts
import { Validator } from "@wilfredlopez/react-utils"

Validator.isEmail('bad@notemail'); //false
Validator.isEmail('test@gmail.com'); //true
Validator.isNotEmptyString(""); //false
Validator.isNotEmptyString("some data")); //true
Validator.isDate("10/20/2020", "MM/DD/YYYY") //true
Validator.isDate("2020/01/01") //true;
Validator.isDate("anyInvalidDate") //false;
Validator.isInt("2.1") //false
Validator.isPort(5000) //true
Validator.isPort(10.1) //false
Validator.isPort(80000000) //false
Validator.isURL("https://www.wilfredlopez.net") //true
Validator.isURL("www.test.com")//true
Validator.isURL("www.test.") //false
```


## memoize
```ts
import { memoize } from "@wilfredlopez/react-utils"
let slowfib = (n: number): number => {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
};

const fib = memoize(slowfib);

console.log(fib(20)); //6765
console.log(fib(30)); //832040
```

## Mapper
```ts
import { Mapper } from "@wilfredlopez/react-utils"

const initialData = {
  "test1": 1,
  "test2": 2,
};
const dataMap = new Mapper<number, string>(initialData);
console.log(dataMap.length) //2
console.log(dataMap.set("test3", 3).delete("test1")); //1
console.log(dataMap.has("test1")); //false
console.log(dataMap.get("test2")); //2
console.log(dataMap.isEmpty()); //false
dataMap.map((val) => {
  console.log(val); // 2, 3
});
```