import React, { createContext, lazy, useContext, useRef } from 'react'

import {
  Box,
  Highlighted as UIHighlighted,
  Stack,
  Typography as UITypography
} from '@/components/shared'
import { adaptive } from '@/hoc'

const Typography = adaptive(UITypography)
const Highlighted = adaptive(UIHighlighted)

export type ProjectProps = {
  header?: {
    title?: string
    links?: {
      github?: string
      app?: string
    }
    tags?: string[]
  }
  description?: string
  features?: {
    title?: string
    Component?: React.ComponentType
  }
  media?: {
    dimensions: {
      width: number
      height: number
    }
    Component?: React.ComponentType
  }
}

const Header = lazy(() => import('./Header'))
const Description = lazy(() => import('./Description'))
const Media = lazy(() => import('./Media'))

type TProjectContext = {
  ProjectItemRef: React.RefObject<HTMLDivElement>
}

const ProjectContext = createContext<TProjectContext>({} as TProjectContext)

const useProjectContext = () => useContext(ProjectContext)

export { ProjectContext, useProjectContext }

const Project = ({ description, features, header, media }: ProjectProps) => {
  const BoxRef = useRef(null)

  return (
    <ProjectContext.Provider value={{ ProjectItemRef: BoxRef }}>
      <Box ref={BoxRef}>
        <Stack direction='column' spacing='clamp(10px, 1vh, 1vh)'>
          {header && (
            <Header
              {...(header && {
                links: {
                  app: header.links?.app,
                  github: header.links?.github
                },
                tags: header.tags,
                title: header.title
              })}
            />
          )}

          {description && <Description>{description}</Description>}
          <Box sx={{ margin: 'clamp(20px, 1.5vh, 1.5vh) 0 clamp(20px, 1.5vh, 1.5vh)' }}>
            <Typography sx={{ fontWeight: 600 }}>
              <Highlighted
                style={{ padding: '0.5em 1em', width: '100%' }}
                variant='secondary'
              >
                {features?.title || 'Features'}
              </Highlighted>
            </Typography>
            {features?.Component && <features.Component />}
            {media && media.Component && (
              <Media MediaComponent={media.Component} dimensions={media.dimensions} />
            )}
          </Box>
        </Stack>
      </Box>
    </ProjectContext.Provider>
  )
}

export default Project
