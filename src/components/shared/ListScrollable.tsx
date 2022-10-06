import ListInfinite from '@/features/infinite-list'
import { ListInfiniteProps } from '@/features/infinite-list/ListInfinite'

import { useLayoutContext } from '../wrappers/Layout/Layout'

function ListScrollable<Items extends any[], T extends HTMLElement>(
  props: ListInfiniteProps<Items, T>
) {
  const { LayoutInner } = useLayoutContext()
  return <ListInfinite rootRef={LayoutInner.ref} {...props} />
}

export default ListScrollable
