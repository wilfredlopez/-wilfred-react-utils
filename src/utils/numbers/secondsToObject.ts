export default function secondsToObject(sec: number | string) {
  if (!sec) {
    sec = 0
  }
  if (typeof sec !== 'number' && typeof sec === 'string') {
    sec = parseInt(sec)
  }
  const WEEK = 7 * 86400
  let seconds = sec % 60
  let minutes = Math.floor((sec / 60) % 120)
  let hours = Math.floor(sec / 3600) % 24
  let days = Math.floor(sec / 86400) % 7
  let weeks = Math.floor(sec / WEEK)
  return {
    seconds,
    minutes,
    hours,
    days,
    weeks,
  }
}
