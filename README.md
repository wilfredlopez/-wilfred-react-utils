# React Utilify Functions and Types

#### Install

###### NPM

```
npm install @wilfredlopez/react-utils
```

###### Script Tag

```html
<script src="https://unpkg.com/@wilfredlopez/react-utils@0.0.6/dist/index.umd.js"></script>
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
