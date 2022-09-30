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
  const timeout = useRef<NodeJS.Timer>()

  const getLoadMoreFn = () => {
    if (rootRef && listRef) {
      return () => {
        const list = listRef.current
        const root = rootRef.current
        if (root && root?.offsetHeight && root?.scrollTop && list?.scrollHeight) {
          if (root?.offsetHeight + root?.scrollTop >= list?.scrollHeight) {
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
      loadMore()
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

  return { isLoading, count }
}

export default useInfiniteScroll
