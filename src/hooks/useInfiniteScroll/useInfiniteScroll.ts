import { useCallback, useEffect, useRef, useState } from 'react'

import { getScrollMargin } from './utils'

export type UseInfiniteScrollProps<T extends HTMLElement> = {
  data: any[]
  increment: number
  initialCount: number
  listRef?: React.RefObject<T>
  rootRef?: React.RefObject<T>
  scrollMargin?: number | `${number}%`
  delay?: number
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
  delay = 0,
  scrollMargin
}: UseInfiniteScrollProps<T>) => {
  const [count, setCount] = useState(initialCount)
  const [isLoading, setLoading] = useState(false)
  const timeout = useRef<NodeJS.Timer>()
  const listHeight = useRef<number>()
  const [listHeightResized, setListHeightResized] = useState<number>()
  const [params, setParams] = useState<Params>()

  const getIsEndOfList = useCallback(() => {
    if (params) {
      const { list, root } = params

      if (list !== root) {
        const distanceToTopFromList = list.getBoundingClientRect().top + root.scrollTop
        const calculatedScrollHeight =
          root.clientHeight + root.scrollTop - distanceToTopFromList

        let margin = 0

        if (scrollMargin) {
          margin = getScrollMargin(scrollMargin, list)
        }

        if (calculatedScrollHeight >= list.scrollHeight - margin) {
          return true
        }
        return false
      }

      const calculatedScrollHeight = list.scrollTop + list.clientHeight
      let margin = 0

      if (scrollMargin) {
        margin = getScrollMargin(scrollMargin, list)
      }

      console.log('margin', margin)

      if (calculatedScrollHeight >= list.scrollHeight - margin) {
        return true
      }
      return false
    }
  }, [params])

  const loadMore = () => {
    setLoading(true)
  }

  const handler = () => {
    const isEndOfList = getIsEndOfList()
    if (isEndOfList) {
      loadMore()
    }
  }

  const calculateCount = () => {
    if (count + increment >= data.length) {
      return data.length
    } else {
      return count + increment
    }
  }

  const onLoading = (cb: (...args: any[]) => void) => {
    if (!isLoading) return
    cb()
  }

  const updateCountIfHasMore = () => {
    const count = calculateCount()
    if (count) {
      setCount(count)
    }
  }

  useEffect(
    delay
      ? () => {
          clearTimeout(timeout.current)
          timeout.current = setTimeout(() => {
            onLoading(updateCountIfHasMore)
            setLoading(false)
          }, delay)

          return () => {
            clearTimeout(timeout.current)
          }
        }
      : () => {
          onLoading(updateCountIfHasMore)
          setLoading(false)
        },
    [isLoading]
  )

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      const newListHeight = entries[0].target.scrollHeight
      listHeight.current = newListHeight
      setListHeightResized(newListHeight)
    })

    const list = listRef?.current || document.documentElement

    const getRoot = () => {
      const root = rootRef?.current
      if (!root) {
        return list
      }
      return root
    }

    const root = getRoot()

    setParams({
      root,
      list,
      resizeObserver
    })
  }, [])

  useEffect(() => {
    if (params) {
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
      handler()
    }
  }, [listHeightResized])

  return { isLoading, count }
}

export default useInfiniteScroll
