/**
 * add the getFormattedDate function to the Date Object.
 * @extends Date
 * @example
 * const date = new DateFormatter("August 19, 1975 23:15:30").getFormattedDate()
 */
export class DateFormatter extends Date {
  getFormattedDate() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
    return `${this.getDate()}-${months[this.getMonth()]}-${this.getFullYear()}`
  }
}
