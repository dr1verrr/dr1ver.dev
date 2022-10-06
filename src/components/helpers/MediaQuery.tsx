import { ReactNode } from 'react'

import { useMediaQuery } from '@/hooks'

type MediaQueryProps = {
  query: string
  children?: ReactNode
  showOnQuery?: boolean
}

export default function MediaQuery({
  query,
  children,
  showOnQuery = true
}: MediaQueryProps) {
  const isShow = useMediaQuery(query)
  if (showOnQuery) {
    if (isShow) {
      return <>{children}</>
    }
  } else {
    if (!isShow) {
      return <>{children}</>
    }
  }

  return null
}
