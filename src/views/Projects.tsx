import { HTMLMotionProps, motion } from 'framer-motion'
import React, { memo, ReactNode, useRef } from 'react'

import IconGithub from '@/components/icons/Github'
import {
  Button as UIButton,
  Container,
  Highlighted as UIHighlighted,
  Stack,
  Typography as UITypography
} from '@/components/shared'
import Box from '@/components/shared/Box'
import type { ButtonProps } from '@/components/shared/Button'
import SpinnerCircle from '@/components/spinners/SpinnerCircle'
import List from '@/components/ui/List'
import { useLayoutContext } from '@/components/wrappers/Layout'
import { adaptive } from '@/hoc'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useTheme } from '@/theme/hooks'

const Typography = adaptive(UITypography)
const Button = adaptive(UIButton)
const Highlighted = adaptive(UIHighlighted)

const ProjectLinks = ({
  githubLink,
  appLink,
  ButtonProps,
  LinkProps
}: {
  githubLink: string
  appLink: string
  ButtonProps?: ButtonProps
  LinkProps?: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
}) => {
  return (
    <Stack
      spacing='clamp(10px, 0.5vw, 0.5vw)'
      sx={{
        flexWrap: 'wrap',
        maxWidth: 'fit-content',
        justifyContent: 'center'
      }}
    >
      <a href={githubLink} tabIndex={-1} target='_blank' {...LinkProps}>
        <Button icon={<IconGithub />} variant='action.secondary' {...ButtonProps}>
          Github
        </Button>
      </a>
      <a href={appLink} tabIndex={-1} target='_blank' {...LinkProps}>
        <Button variant='action.secondary' {...ButtonProps} style={{ height: '100%' }}>
          Application
        </Button>
      </a>
    </Stack>
  )
}

const MediaContent = ({ children }: { children?: ReactNode }) => {
  const theme = useTheme()
  return (
    <Box
      style={{
        border: `clamp(1px, 0.05vw, 0.05vw) solid ${theme.divider}`,
        borderRadius: 'clamp(12px, 0.1vw + 0.1vh, 0.1vw + 0.1vh)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 'fit-content',
        minWidth: 0
      }}
    >
      {children}
    </Box>
  )
}

const ProjectTitle = ({ children }: { children?: ReactNode }) => {
  return (
    <Typography size='md' sx={{ margin: 0, fontWeight: 400 }} variant='h2'>
      {children}
    </Typography>
  )
}

const ProjectTags = ({ tags }: { tags: string[] }) => {
  return (
    <Container maxWidth='sm' style={{ margin: 0, padding: 0 }}>
      <Stack spacing='clamp(5px, 0.3vw + 0.3vh, 0.3vw + 0.3vh)' sx={{ flexWrap: 'wrap' }}>
        {tags.map((t, idx) => (
          <Highlighted
            key={idx}
            style={{
              padding: `clamp(5px, 0.3vh, 0.3vh) clamp(10px, 0.3vh + 0.3vw, 0.3vh + 0.3vw)`,
              borderRadius: '0.5em'
            }}
            variant='lightContrast'
          >
            <Typography
              sx={{ color: 'inherit', fontWeight: 600, wordBreak: 'break-all' }}
            >
              {t}
            </Typography>
          </Highlighted>
        ))}
      </Stack>
    </Container>
  )
}

const ProjectHeader = ({
  title,
  links,
  tags
}: {
  title?: ReactNode
  tags?: string[]
  links?: {
    github: string
    app: string
  }
}) => {
  return (
    <Stack direction='column' spacing='clamp(35px, 1.3vh, 1.3vh)'>
      {(title || tags) && (
        <Stack direction='column' spacing='clamp(15px, 0.7vh, 0.7vh)'>
          {title && <ProjectTitle>{title}</ProjectTitle>}
          {tags && <ProjectTags tags={tags} />}
        </Stack>
      )}
      {links && <ProjectLinks appLink={links.app} githubLink={links.github} />}
    </Stack>
  )
}

const ProjectDescription = ({ children }: { children?: ReactNode }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        border: `1px solid ${theme.divider}`,
        maxWidth: 'fit-content',
        padding: 'clamp(15px, 1vw + 1vh, 1vw + 1vh)'
      }}
    >
      <Typography element='p' sx={{ fontWeight: 400 }}>
        {children}
      </Typography>
    </Box>
  )
}

const SpeedTyperDev = () => {
  return (
    <Box>
      <Stack direction='column' spacing='clamp(10px, 1vh, 1vh)'>
        <ProjectHeader
          links={{
            github: 'https://github.com/dr1verrr/keyboard-trainer.dev',
            app: 'https://keyboard-trainer-81670.web.app'
          }}
          tags={['TypeScript', 'React.js', 'Effector.js', 'JSS', 'Firebase']}
          title='⌨️ speedtyper.dev'
        />

        <ProjectDescription>
          This is a React.js speed-typer application.
        </ProjectDescription>
        <Box sx={{ margin: 'clamp(20px, 1.5vh, 1.5vh) 0 clamp(20px, 1.5vh, 1.5vh)' }}>
          <Typography sx={{ fontWeight: 600 }}>
            <Highlighted
              style={{ padding: '0.5em 1em', width: '100%' }}
              variant='secondary'
            >
              Features
            </Highlighted>
          </Typography>
          <Stack
            spacing='clamp(30px, 3vw, 3vw)'
            sx={{
              flexWrap: 'wrap',
              padding: 'clamp(15px, 0.3vw + 0.3vh, 0.3vw + 0.3vh)',
              marginTop: 'clamp(15px, 1.5vh, 1.5vh)',
              marginBottom: 'clamp(30px, 2vh, 2vh)'
            }}
          >
            <Stack
              direction='column'
              spacing='clamp(20px, 1.5vh, 1.5vh)'
              sx={{ flex: '0 1 auto' }}
            >
              <Typography>⌨ Speed Typer</Typography>
              <List
                ListProps={{
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(20px, 1.5vh, 1.5vh)',
                    padding: '0 clamp(15px, 1vw, 1vw)'
                  }
                }}
                data={[
                  'Large texts support',
                  'Code highlight',
                  'Language autodetect',
                  'Collect stats, and save them'
                ]}
                render={item => <Typography>{item}</Typography>}
              />
            </Stack>

            <Stack
              direction='column'
              spacing='clamp(20px, 1.5vh, 1.5vh)'
              sx={{ flex: '0 1 auto' }}
            >
              <Typography>⚙️ Preferences</Typography>
              <List
                ListProps={{
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(20px, 1.5vh, 1.5vh)',
                    padding: '0 clamp(15px, 1vw, 1vw)'
                  }
                }}
                data={[
                  'change font size',
                  'change font family',
                  'hide elements, which you may not need',
                  'disable collecting stats'
                ]}
                render={item => <Typography>{item}</Typography>}
              />
            </Stack>
          </Stack>
          <MediaContent>
            <video
              autoPlay
              loop
              muted
              playsInline
              poster='https://repository-images.githubusercontent.com/526196394/f64a3c75-d987-4a68-9e1d-f8ec1248d26a'
              src='https://user-images.githubusercontent.com/67706933/190857521-fa1d4098-30c0-4a6e-9d13-ef45ac70c1e5.mp4'
              style={{ maxWidth: '100%', height: 'auto', minWidth: 0 }}
            ></video>
          </MediaContent>
        </Box>
      </Stack>
    </Box>
  )
}

const ReactHookManager = () => {
  return (
    <Stack direction='column' spacing='clamp(10px, 1vh, 1vh)'>
      <ProjectHeader
        links={{
          github: 'https://github.com/dr1verrr/react-hook-create',
          app: 'https://react-hook-cheatsheet.web.app'
        }}
        tags={[
          'TypeScript',
          'React.js',
          'Redux.js',
          'React Query',
          'React Hook Form',
          'Material UI',
          'Zustand',
          'Firebase'
        ]}
        title='💼 React Hooks Manager'
      />
      <ProjectDescription>
        This is a React.js code manager application.
      </ProjectDescription>
      <Box sx={{ marginTop: 'clamp(20px, 1.5vh, 1.5vh)' }}>
        <Typography sx={{ fontWeight: 600 }}>
          <Highlighted
            style={{ padding: '0.5em 1em', width: '100%' }}
            variant='secondary'
          >
            Features
          </Highlighted>
        </Typography>
        <Box
          sx={{
            padding: 'clamp(10px, 1vw + 1vh)',
            marginTop: 'clamp(15px, 1.5vh, 1.5vh)',
            marginBottom: 'clamp(30px, 2vh, 2vh)'
          }}
        >
          <List
            ListProps={{
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(20px, 1.5vh, 1.5vh)',
                padding: '0 clamp(15px, 1vw, 1vw)'
              }
            }}
            data={[
              'Material Design',
              '🔍 Search hooks support',
              '💬 Description preview on type',
              '📝 CRUD operations with hooks',
              '🌈 Prettier support(in JSON)'
            ]}
            render={item => <Typography>{item}</Typography>}
          />
        </Box>
        <MediaContent>
          <video
            autoPlay
            loop
            muted
            playsInline
            src='https://user-images.githubusercontent.com/67706933/191988615-9c17a9b7-9055-495e-a7bb-c29c4b75ebe4.mp4'
            style={{ maxWidth: '100%', height: 'auto', minWidth: 0 }}
          ></video>
        </MediaContent>
      </Box>
    </Stack>
  )
}

const DriverShop = () => {
  return (
    <Stack direction='column' spacing='clamp(10px, 1vh, 1vh)'>
      <ProjectHeader
        links={{
          app: 'https://dr1ver-shop.vercel.app',
          github: 'https://github.com/dr1verrr/dr1ver.shop'
        }}
        tags={['JavaScript', 'Next.js', 'React.js', 'PostgreSQL']}
        title='🛒 Dr1ver.shop'
      />
      <ProjectDescription>
        This is a Next.js ecommerce web-application.
      </ProjectDescription>
      <Box sx={{ marginTop: 'clamp(20px, 1.5vh, 1.5vh)' }}>
        <Typography sx={{ fontWeight: 600 }}>
          <Highlighted
            style={{ padding: '0.5em 1em', width: '100%' }}
            variant='secondary'
          >
            Features
          </Highlighted>
        </Typography>
        <Box
          sx={{
            padding: 'clamp(10px, 1vw + 1vh)',
            marginTop: 'clamp(15px, 1.5vh, 1.5vh)',
            marginBottom: 'clamp(30px, 2vh, 2vh)'
          }}
        >
          <List
            ListProps={{
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(20px, 1.5vh, 1.5vh)',
                padding: '0 clamp(15px, 1vw, 1vw)'
              }
            }}
            data={[
              'Hard, unique design',
              'Shopping cart',
              'Authentication via Email (uses JWT, secure HTTP only cookies)'
            ]}
            render={item => <Typography>{item}</Typography>}
          />
        </Box>
        <MediaContent>
          <video
            autoPlay
            loop
            muted
            playsInline
            poster='https://repository-images.githubusercontent.com/417917436/0154a5f8-2eb4-4a3e-bb12-53c85ce0c6ac'
            src='https://user-images.githubusercontent.com/67706933/191988779-f0bbd2ae-15b8-4215-be3f-5d577e265572.mp4'
            style={{ maxWidth: '100%', height: 'auto', minWidth: 0 }}
          ></video>
        </MediaContent>
      </Box>
    </Stack>
  )
}

const projects = [SpeedTyperDev, ReactHookManager, DriverShop]

const ProjectItem = ({ children, ...props }: HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: '-15%' }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-15%' }}
      whileInView={{ opacity: 1, translateX: 0, translateY: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

const MemoizedProjectItem = memo(ProjectItem)

const ProjectsList = ({ data }: { data: React.FC[] }) => {
  const listRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const { Layout } = useLayoutContext()
  //const isListEnd = useRef(false)
  const { count, isLoading } = useInfiniteScroll({
    data,
    increment: 1,
    initialCount: 1,
    listRef,
    rootRef: Layout.ref
  })

  //useEffect(() => {
  //  if (isListEnd.current) return
  //  const list = listRef.current!
  //  const loader = loaderRef.current!
  //  const lastListElement = list.lastElementChild!
  //  const isEnd = list.children.length === data.length

  //  if (isEnd) {
  //    isListEnd.current = true
  //  }

  //  if (isLoading) {
  //    return scrollToElement(loader, { block: 'end' })
  //  }

  //  scrollToElement(lastListElement, { block: 'start' })
  //}, [isLoading])

  return (
    <Box sx={{ paddingBottom: 'clamp(75px, 15vh, 15vh)' }}>
      <Stack
        ref={listRef}
        direction='column'
        spacing='clamp(100px, 15vh, 15vh)'
        sx={{ scrollMargin: 'clamp(100px, 15vh, 15vh)' }}
      >
        {data.slice(0, count).map((Proj, idx) => {
          return (
            <MemoizedProjectItem
              key={idx}
              style={{ scrollMargin: 'clamp(100px, 15vh, 15vh)' }}
            >
              <Proj />
            </MemoizedProjectItem>
          )
        })}
      </Stack>
      {count !== projects.length && isLoading && (
        <Stack
          ref={loaderRef}
          sx={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 'clamp(30px, 1.5vh, 1.5vh) 0',
            paddingBottom: 'clamp(75px, 3vh, 3vh)'
          }}
        >
          <SpinnerCircle size='2vw + 2vh' speed={3} />
        </Stack>
      )}
    </Box>
  )
}

const memoizedProjects = projects.map(p => memo(p))

export default function Projects() {
  return (
    <Container
      maxWidth='md'
      style={{
        width: '100%'
      }}
    >
      <Typography
        size='lg'
        sx={{ fontWeight: 300, margin: 0, padding: 'clamp(50px, 3vh, 3vh) 0' }}
        variant='h1'
      >
        Work
      </Typography>
      <ProjectsList data={memoizedProjects} />
    </Container>
  )
}
