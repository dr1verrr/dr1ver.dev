const getScrollMargin = (margin: number | `${number}%`, list: HTMLElement) => {
  if (typeof margin === 'string') {
    const scrollPercentageNum = Number(margin.slice(0, -1))
    const scrollMargin = list.scrollHeight * (scrollPercentageNum / 100)

    return scrollMargin
  }

  return margin
}

export { getScrollMargin }
