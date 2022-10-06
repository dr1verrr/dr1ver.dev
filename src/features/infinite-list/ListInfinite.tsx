import { ReactNode, useRef } from 'react'

import Stack, { StackProps } from '@/components/shared/Stack'
import useInfiniteScroll, { UseInfiniteScrollProps } from '@/hooks/useInfiniteScroll'

export type ListInfiniteProps<
  Items extends any[] = any[],
  T extends HTMLElement = HTMLElement
> = Omit<UseInfiniteScrollProps<T>, 'data' | 'listRef'> & {
  items: Items extends any[] ? Items : never
  render: (item: Items extends (infer Item)[] ? Item : never, index: number) => ReactNode
  ListProps?: Omit<StackProps, 'ref'>
  loadingElement?: JSX.Element
}

const ListInfinite = ({
  items,
  render,
  ListProps,
  loadingElement,
  ...scrollProps
}: ListInfiniteProps) => {
  const listRef = useRef<HTMLDivElement>(null)
  const { count, isLoading } = useInfiniteScroll({
    data: items,
    listRef,
    ...scrollProps
  })

  return (
    <>
      <Stack ref={listRef} direction='column' {...ListProps}>
        {items.slice(0, count).map((item, idx) => {
          return render(item, idx)
        })}
      </Stack>
      {count !== items.length && isLoading && (loadingElement ?? null)}
    </>
  )
}

export default ListInfinite
