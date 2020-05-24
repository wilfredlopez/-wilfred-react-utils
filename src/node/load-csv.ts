import fs from "fs"
import { dropRightWhile } from "../lodash/dropRightWhile"
import { organizeData } from "./orginizeData"
// import { map } from "../lodash/map"
// import { pullAt } from "../lodash/pullAt"

interface Options {
  converters?: { [key: string]: (val: string) => boolean }
  // dataColums: string[]
  // labelColums: string[]
}

/**
 * Loads a CSV File in a Node Enviroment.
 * @param filename path to file. example path.join(__dirname, 'data.csv')
 * @param {Options} options Optional if you want to convert the values to a different type.
 * @example {
    converters: {
        'nameOfLabelToConvert': (value:string) => value === 'TRUE' ? true: false 
    }
       @deprecated dataColums: ['title', 'id'],
   @deprecated labelColums: ['name of label1', 'name of label2'],
  }
 */
export function loadCsv(
  filename: string,
  {
    converters,
  }: // labelColums, dataColums
  Options = {
    // dataColums: [],
    // labelColums: [],
  },
) {
  const data = fs.readFileSync(filename, { encoding: "utf-8" })

  let rows = data.split("\n").map((row) => {
    return row.split(",")
  })
  rows = rows.map((row) => dropRightWhile(row, (val) => val === ""))

  const headers = [...rows[0]]

  let parsedRows = rows.map((row, index) => {
    if (index === 0) {
      return row
    }
    return row.map((element, index) => {
      if (converters && converters[headers[index]]) {
        const converted = converters[headers[index]](element)
        return Number.isNaN(converted) ? element : converted
      }
      const num = parseFloat(element)
      if (Number.isNaN(num)) {
        return element
      } else {
        return num
      }
    })
  })

  // const labels = extractColumns(parsedRows as any, labelColums);
  // const rawData = extractColumns(parsedRows as any, dataColums);
  // labels.shift();
  // rawData.shift();
  parsedRows = parsedRows.map((row) => row.filter((v) => v !== "\r"))
  const output = {
    labels: parsedRows[0],
    rows: parsedRows.slice(1),
  }
  return {
    // labels: labels,
    // data: rawData,
    labels: output.labels,
    rows: output.rows,
    table: organizeData(output.rows, output.labels),
  }
}

// function extractColumns(data: string[][], columsNames: string[]) {
//   const headers = [...data[0]]
//   const indexes = map(columsNames, (col) => headers.indexOf(col))
//   const extracted = map(data, (row) => pullAt(row, indexes))
//   return extracted
// }
