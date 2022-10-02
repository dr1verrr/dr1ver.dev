import { useEffect, useRef, useState } from 'react'

type useInfiniteScrollProps<T extends HTMLElement> = {
  data: any[]
  increment: number
  initialCount: number
  listRef?: React.RefObject<T>
  rootRef?: React.RefObject<T>
}

const useInfiniteScroll = <T extends HTMLElement>({
  data,
  increment = 1,
  initialCount = 1,
  listRef,
  rootRef
}: useInfiniteScrollProps<T>) => {
  const INITIAL_COUNT = initialCount
  const COUNT_INCREMENT = increment
  const [count, setCount] = useState(INITIAL_COUNT)
  const [isLoading, setLoading] = useState(false)
  const isMounted = useRef(false)
  const [listHeight, setListHeight] = useState<number>()
  const timeout = useRef<NodeJS.Timer>()

  const getLoadMoreFn = () => {
    if (rootRef && listRef) {
      return () => {
        const list = listRef.current
        const root = rootRef.current

        const distanceToTopFromList =
          list?.getBoundingClientRect().top! + root?.scrollTop!

        if (
          root &&
          list &&
          root?.offsetHeight >= 0 &&
          root?.scrollTop >= 0 &&
          list?.scrollHeight >= 0
        ) {
          const calculatedScrollHeight =
            root?.offsetHeight + root?.scrollTop - distanceToTopFromList

          if (calculatedScrollHeight >= list?.scrollHeight) {
            setLoading(true)
          }
        }
      }
    }
    if (listRef) {
      return () => {
        const list = listRef.current
        if (list && list?.scrollHeight) {
          if (
            document.documentElement.offsetHeight + document.documentElement.scrollTop >=
            list.scrollHeight - 300
          ) {
            setLoading(true)
          }
        }
      }
    }
    return () => {
      if (
        document.documentElement.offsetHeight <=
        document.documentElement.clientHeight + document.documentElement.scrollTop
      ) {
        setLoading(true)
      }
    }
  }

  const loadMore = getLoadMoreFn()

  useEffect(() => {
    const handler = (e: Event) => {
      loadMore()
    }

    if (!isMounted.current) {
      if (listRef) {
        const list = listRef.current!

        const ro = new ResizeObserver(entries => {
          setListHeight(entries[0].target.scrollHeight)
        })

        ro.observe(list)
      }
      if (rootRef) {
        const root = rootRef.current
        root?.addEventListener('scroll', handler)
      } else {
        window.addEventListener('scroll', handler)
      }

      isMounted.current = true
    }

    if (!isLoading) return

    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      if (count + COUNT_INCREMENT >= data.length) {
        setCount(data.length)
      } else {
        setCount(c => c + COUNT_INCREMENT)
      }
      setLoading(false)
    }, 250)

    return () => {
      if (rootRef) {
        return rootRef.current?.removeEventListener('scroll', handler)
      }
      window.removeEventListener('scroll', handler)
    }
  }, [isLoading])

  useEffect(() => {
    if (listHeight && listHeight > 0) {
      loadMore()
    }
  }, [listHeight])

  return { isLoading, count }
}

export default useInfiniteScroll
