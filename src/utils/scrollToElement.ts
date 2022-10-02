const scrollToElement = (el: HTMLElement | Element, options?: ScrollIntoViewOptions) => {
  el.scrollIntoView({ behavior: 'smooth', block: 'end', ...options })
}

export default scrollToElement
