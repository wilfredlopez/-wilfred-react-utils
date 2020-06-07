/**
 * Abstract class with a sort method.
 * most implement lenght, compare and swap.
 * @example
 *  export class Characters extends BubleSorter {
*      constructor(public data: string) {
*          super()
*      }
*      get length() {
*          return this.data.length
*      }
*     compare(leftIndex: number, rightIndex: number): boolean {
*          return this.data[leftIndex]
                    .toLowerCase() > this.data[rightIndex]
                    .toLowerCase()
*      }
*      wrap(leftIndex: number, rightIndex: number): void {
*          const chars = this.data.split('')
*          const leftHand = chars[leftIndex]
*          chars[leftIndex] = chars[rightIndex]
*          chars[rightIndex] = leftHand
*          this.data = chars.join('')
*      }
*  }
 */
export abstract class BubleSorter {
    abstract length: number
    abstract compare(leftIndex: number, rightIndex: number): boolean
    abstract wrap(leftIndex: number, rightIndex: number): void

    sort() {
        const { length } = this
        for (let i = 0; i < length; i++)
        {
            for (let j = 0; j < length - i - 1; j++)
            {
                if (this.compare(j, j + 1))
                {
                    this.wrap(j, j + 1)
                }
            }
        }
    }
}



// export class Characters extends BubleSorter {
//   constructor(public data: string) {
//     super()
//   }
//   get length() {
//     return this.data.length
//   }

//   compare(leftIndex: number, rightIndex: number): boolean {
//     return this.data[leftIndex].toLowerCase() > this.data[rightIndex].toLowerCase()
//   }
//   wrap(leftIndex: number, rightIndex: number): void {
//     const chars = this.data.split('')
//     const leftHand = chars[leftIndex]
//     chars[leftIndex] = chars[rightIndex]
//     chars[rightIndex] = leftHand
//     this.data = chars.join('')
//   }
// }

// export class NumberCollection extends BubleSorter {
//   constructor(public data: number[]) {
//     super()
//   }
//   get length() {
//     return this.data.length
//   }

//   compare(leftIndex: number, rightIndex: number): boolean {
//     return this.data[leftIndex] > this.data[rightIndex]
//   }
//   wrap(leftIndex: number, rightIndex: number): void {
//     const leftHand = this.data[leftIndex]
//     this.data[leftIndex] = this.data[rightIndex]
//     this.data[rightIndex] = leftHand
//   }
// }

// export class CharCollection extends BubleSorter {
//   constructor(public data: string[]) {
//     super()
//   }
//   get length() {
//     return this.data.length
//   }

//   compare(leftIndex: number, rightIndex: number): boolean {
//     return this.data[leftIndex].toLowerCase() > this.data[rightIndex].toLowerCase()
//   }
//   wrap(leftIndex: number, rightIndex: number): void {
//     const leftHand = this.data[leftIndex]
//     this.data[leftIndex] = this.data[rightIndex]
//     this.data[rightIndex] = leftHand
//   }
// }


// const coll = new Characters('zabWyZdelggX')
// const chatArr = new CharCollection(['z', 'a', 'b', "W", "y", "Z", "d", "e", "l", "g", "g", "X"])
// const nCol = new NumberCollection([1, 5, 3, 55, 7, 3])
// coll.sort()
// nCol.sort()
// chatArr.sort()
// console.log(coll.data) //abdegglWXyzZ
// console.log(chatArr.data) //  [ 'a', 'b', 'd', 'e', 'g', 'g', 'l', 'W', 'X', 'y', 'z', 'Z' ]
// console.log(nCol.data) //  [ 1, 3, 3, 5, 7, 55 ]