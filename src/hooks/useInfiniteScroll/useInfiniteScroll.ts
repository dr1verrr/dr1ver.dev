import { useCallback, useEffect, useRef, useState } from 'react'

import { getScrollMargin } from './utils'

type useInfiniteScrollProps<T extends HTMLElement> = {
  data: any[]
  increment: number
  initialCount: number
  listRef?: React.RefObject<T>
  rootRef?: React.RefObject<T>
  scrollMargin?: number | `${number}%`
}

type Params = {
  root: HTMLElement
  list: HTMLElement
  resizeObserver: ResizeObserver
}

const useInfiniteScroll = <T extends HTMLElement>({
  data,
  increment = 1,
  initialCount = 1,
  listRef,
  rootRef,
  scrollMargin
}: useInfiniteScrollProps<T>) => {
  const [count, setCount] = useState(initialCount)
  const [isLoading, setLoading] = useState(false)
  const timeout = useRef<NodeJS.Timer>()
  const listHeight = useRef<number>()
  const [listHeightResized, setListHeightResized] = useState<number>()
  const [params, setParams] = useState<Params>()

  const loadMore = useCallback(() => {
    if (params) {
      const { list, root } = params

      const distanceToTopFromList = list.getBoundingClientRect().top + root.scrollTop
      const calculatedScrollHeight =
        root.clientHeight + root.scrollTop - distanceToTopFromList

      let margin = 0

      if (scrollMargin) {
        margin = getScrollMargin(scrollMargin, list)
      }

      if (calculatedScrollHeight >= list.scrollHeight - margin) {
        setLoading(true)
      }
    }
  }, [params])

  useEffect(() => {
    if (!isLoading) return

    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      if (count + increment >= data.length) {
        setCount(data.length)
      } else {
        setCount(c => c + increment)
      }
      setLoading(false)
    }, 200)

    return () => {
      clearTimeout(timeout.current)
    }
  }, [isLoading])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      const newListHeight = entries[0].target.scrollHeight
      listHeight.current = newListHeight
      setListHeightResized(newListHeight)
    })

    const root = rootRef?.current || document.documentElement
    const list = listRef?.current || document.documentElement

    setParams({
      root,
      list,
      resizeObserver
    })
  }, [])

  useEffect(() => {
    if (params) {
      const handler = loadMore
      const { resizeObserver, list, root } = params
      resizeObserver.observe(list)
      root.addEventListener('scroll', handler)

      return () => {
        resizeObserver.disconnect()
        resizeObserver.unobserve(list)
        root.removeEventListener('scroll', handler)
      }
    }
  }, [params])

  useEffect(() => {
    if (listHeightResized && listHeight.current) {
      loadMore()
    }
  }, [listHeightResized])

  return { isLoading, count }
}

export default useInfiniteScroll
