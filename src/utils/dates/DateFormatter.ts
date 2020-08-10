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
    getFormattedFullDate() {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "Octover",
        "November",
        "December",
      ]
      return `${this.getDate()}-${months[this.getMonth()]}-${this.getFullYear()}`
    }
    timeDistance(start:Date){
      let distance = Math.abs(new Date().getTime() - start.getTime())
      const hours = Math.floor(distance / 3600000);
      distance -= hours * 3600000;
      const minutes = Math.floor(distance / 60000);
      distance -= minutes * 60000;
      const seconds = Math.floor(distance / 1000);
      return `${hours}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)} and ${distance}ms`;
    };
  }
  
  export type NMonthParam = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  /**
   * Returns the formated month in type string. @example: 'March'
   * @param n Month number. based 0. example for January=0, February=1
   */
  export function getMonthFromInt(n: NMonthParam) {
    switch (n) {
      case 0:
        return "January"
      case 1:
        return "February"
      case 2:
        return "March"
      case 3:
        return "April"
      case 4:
        return "May"
      case 5:
        return "June"
      case 6:
        return "July"
      case 7:
        return "August"
      case 8:
        return "September"
      case 9:
        return "October"
      case 10:
        return "November"
      case 11:
        return "December"
      default:
        return null
    }


  }
  