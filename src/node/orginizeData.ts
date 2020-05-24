// const TESTDATA = {
//   data: [
//     ["my title 1", 0, 20, true],
//     ["my title 2", 1, 21, false],
//     ["my title 3", 2, 22, true],
//   ],
//   labels: ["title", "id", "value", "isGood"],
// }

export function organizeData(data: Array<any[]>, labels: Array<any>) {
  const partial: {
    [key: string]: any
  }[] = []
  for (let dataRow = 0; dataRow < data.length; dataRow++) {
    let object: { [key: string]: any } = {}
    for (let col = 0; col < data[dataRow].length; col++) {
      const key = labels[col]
      object[key] = data[dataRow][col]
    }
    partial.push(object)
  }
  return partial
}
