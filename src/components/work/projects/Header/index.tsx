import { lazy, ReactNode } from 'react'

import { Stack } from '@/components/shared'

const Links = lazy(() => import('./Links'))
const Title = lazy(() => import('./Title'))
const Tags = lazy(() => import('./Tags'))

const Header = ({
  title,
  links,
  tags
}: {
  title?: ReactNode
  tags?: string[]
  links?: {
    github?: string
    app?: string
  }
}) => {
  return (
    <Stack direction='column' spacing='clamp(35px, 1.3vh, 1.3vh)'>
      {(title || tags) && (
        <Stack direction='column' spacing='clamp(15px, 0.7vh, 0.7vh)'>
          {title && <Title>{title}</Title>}
          {tags && <Tags tags={tags} />}
        </Stack>
      )}
      {links && <Links appLink={links.app} githubLink={links.github} />}
    </Stack>
  )
}

export default Header
