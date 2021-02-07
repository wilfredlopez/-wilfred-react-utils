/** 
 * Gets the container element and determines if the scroll is at the bottom before the new element gets inserted into the dom.
 If the scroll was at the bottom then it goes ahead and scrolls the user to the bottom so the the new inserted element is visible.
 * Usefull for Chat Applications. 
*/
export function autoscroll(containerElementId: string) {
  // New  element
  const $containerEl = document.getElementById(
    containerElementId,
  ) as HTMLElement
  const $newElement = $containerEl.lastElementChild as HTMLElement

  // Height of the new element
  const newElementStyles = getComputedStyle($newElement)
  const newElementMargin = parseInt(newElementStyles.marginBottom)
  const newElementHeight = $newElement.offsetHeight + newElementMargin

  // Visible height
  const visibleHeight = $containerEl.offsetHeight

  // Height of the container
  const containerHeight = $containerEl.scrollHeight

  // How far have I scrolled?
  const scrollOffset = $containerEl.scrollTop + visibleHeight

  if (containerHeight - newElementHeight <= scrollOffset) {
    $containerEl.scrollTop = $containerEl.scrollHeight
  }
}
