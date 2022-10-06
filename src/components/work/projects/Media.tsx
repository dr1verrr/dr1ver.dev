import React, { lazy } from 'react'

import { useMediaQuery } from '@/hooks'

import MediaContent from './MediaContent'

type MediaProps = {
  MediaComponent: React.ComponentType
}

const MediaDesktop = lazy(() => import('./MediaDesktop'))

export default function Media({ MediaComponent }: MediaProps) {
  const isMobile = useMediaQuery('(max-width: 460px)')

  return (
    <MediaContent>
      {!isMobile ? <MediaDesktop MediaComponent={MediaComponent} /> : <MediaComponent />}
    </MediaContent>
  )
}
