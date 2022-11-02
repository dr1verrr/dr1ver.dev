import { motion } from 'framer-motion'
import { lazy, memo } from 'react'

import MediaQuery from '@/components/helpers/MediaQuery'
import { Box, Container, Typography as UITypography } from '@/components/shared'
import ListScrollable from '@/components/shared/ListScrollable'
import SpinnerCircle from '@/components/spinners/SpinnerCircle'
import Project from '@/components/work/projects'
import { ProjectProps } from '@/components/work/projects/Project'
import { useTheme } from '@/components/wrappers/Layout/theme'
import data_projects from '@/data/work/projects'
import { adaptive } from '@/hoc'
import { rgba } from '@/utils/styles'

const Typography = adaptive(UITypography)

const ProjectItem = (props: ProjectProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: '-15%' }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-15%' }}
      whileInView={{ opacity: 1, translateX: 0, translateY: 0 }}
    >
      <Project {...props} />
    </motion.div>
  )
}

const MemoizedProjectItem = memo(ProjectItem)

const FullscreenMediaBackground = lazy(
  () => import('@/components/work/projects/FullscreenMediaBackground')
)

export default function Projects() {
  const theme = useTheme()

  return (
    <>
      <MediaQuery query='(max-width: 460px)' showOnQuery={false}>
        <FullscreenMediaBackground />
      </MediaQuery>
      <Container
        maxWidth='md'
        style={{
          width: '100%',
          position: 'relative',
          zIndex: 50,
          background: rgba(theme.bg, 0.7),
          padding: '0 clamp(15px, 2vw + 2vh, 2vw + 2vh)',
          border: `0.1em solid ${theme.divider}`,
          borderTop: 0,
          borderBottom: 0
        }}
      >
        <Typography
          size='lg'
          sx={{
            fontWeight: 300,
            margin: 0,
            padding: 'clamp(50px, 3vh, 3vh) 0'
          }}
          variant='h1'
        >
          Work
        </Typography>
        <Box sx={{ paddingBottom: 'clamp(120px, 15vh, 15vh)' }}>
          <ListScrollable
            ListProps={{ spacing: 'clamp(75px, 10vh, 10vh)' }}
            delay={150}
            increment={1}
            initialCount={1}
            items={data_projects}
            loadingElement={
              <Box
                sx={{
                  padding: 'clamp(30px, 1.2vh, 1.2vh) 0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <SpinnerCircle lineWidth='0.4vw' size='1vw + 1vh' />
              </Box>
            }
            render={(props, idx) => <MemoizedProjectItem {...props} key={idx} />}
            scrollMargin='10%'
          />
        </Box>
      </Container>
    </>
  )
}
