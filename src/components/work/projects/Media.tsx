import React, { lazy } from 'react'

import { useMediaQuery } from '@/hooks'

import MediaContent from './MediaContent'

type MediaProps = {
  MediaComponent: React.ComponentType
  dimensions: {
    width: number
    height: number
  }
}

const MediaDesktop = lazy(() => import('./MediaDesktop'))

export default function Media({ MediaComponent, dimensions }: MediaProps) {
  const isMobile = useMediaQuery('(max-width: 460px)')

  return (
    <MediaContent mobile={isMobile}>
      {!isMobile ? <MediaDesktop MediaComponent={MediaComponent} /> : <MediaComponent />}
    </MediaContent>
  )
}
