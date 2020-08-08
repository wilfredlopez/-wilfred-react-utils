import {Validator} from '../../validator'
export default function deepCopy<T extends any>(data:T):T{
    //regex
    if(data instanceof RegExp){
        return data
    }
  //string | boolean | number | symbol | null | undefined
  if(Validator.isPrimitive(data)) return data
  //Array []
  if(Array.isArray(data)){
    const result = data.map(v => deepCopy(v))
    return result as T
  }
  //object {}
  if(typeof data === 'object'){
    let result:Record<any,any> = {}
    for(let key in data){
      result[key] = deepCopy(data[key])
    }
    return result
  }
  //if it gets here there is a type im not getting to on if statements.
throw new Error(`Unknown type ${typeof data}: ${data}`)
}



