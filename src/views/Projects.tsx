import { ReactNode } from 'react'

import Box from '@/components/shared/Box'
import Button, { ButtonProps } from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import Highlighted from '@/components/shared/Highlighted'
import Stack from '@/components/shared/Stack'
import Typography from '@/components/shared/Typography'
import List from '@/components/ui/List'
import { useTheme } from '@/theme/hooks'

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
    <Stack spacing='clamp(10px, 0.5vw, 0.5vw)'>
      <a href={githubLink} target='_blank' {...LinkProps}>
        <Button tabIndex={-1} variant='action.secondary' {...ButtonProps}>
          <Typography
            adaptive
            adaptiveProps={{ min: 16, mid: '0.3vw + 0.3vh' }}
            sx={{ color: 'inherit' }}
          >
            Github
          </Typography>
        </Button>
      </a>
      <a href={appLink} target='_blank' {...LinkProps}>
        <Button tabIndex={-1} variant='action.secondary' {...ButtonProps}>
          <Typography
            adaptive
            adaptiveProps={{ min: 16, mid: '0.3vw + 0.3vh' }}
            sx={{ color: 'inherit' }}
          >
            Application
          </Typography>
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
        border: `1px solid ${theme.divider}`,
        borderRadius: 10,
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
    <Typography adaptive adaptiveProps={{ min: 26, mid: '1.5vw + 1.5vh' }} variant='h2'>
      {children}
    </Typography>
  )
}

const SpeedTyperDev = () => {
  return (
    <Box>
      <Stack direction='column' spacing='clamp(10px, 1vh, 1vh)'>
        <ProjectTitle>⌨️ speedtyper.dev</ProjectTitle>
        <ProjectLinks
          appLink='https://keyboard-trainer-81670.web.app'
          githubLink='https://github.com/dr1verrr/keyboard-trainer.dev'
        />
        <Typography
          adaptive
          adaptiveProps={{ min: 18, mid: '0.2vw + 0.2vh' }}
          element='p'
        >
          <Highlighted variant='primary'>
            This is a React.js speed-typer application.
          </Highlighted>
        </Typography>
        <Box sx={{ marginTop: 'clamp(20px, 1.5vh, 1.5vh)' }}>
          <Typography adaptive>
            <Highlighted style={{ fontWeight: 600 }} variant='secondary'>
              Features
            </Highlighted>
          </Typography>
          <Box
            sx={{
              padding: 'clamp(10px, 1vw + 1vh)',
              marginTop: 'clamp(15px, 1.5vh, 1.5vh)',
              marginBottom: 'clamp(30px, 2vh, 2vh)',
              minWidth: 0
            }}
          >
            <Stack spacing='clamp(30px, 3vw, 3vw)' sx={{ flexWrap: 'wrap' }}>
              <Stack direction='column' spacing='clamp(20px, 1.5vh, 1.5vh)'>
                <Typography adaptive adaptiveProps={{ min: 24, mid: '1vw + 1vh' }}>
                  ⌨ Speed Typer
                </Typography>
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
                  render={item => <Typography adaptive>{item}</Typography>}
                />
              </Stack>
              <Stack direction='column' spacing='clamp(20px, 1.5vh, 1.5vh)'>
                <Typography adaptive adaptiveProps={{ min: 24, mid: '1vw + 1vh' }}>
                  ⚙️ Preferences
                </Typography>
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
                  render={item => <Typography adaptive>{item}</Typography>}
                />
              </Stack>
            </Stack>
          </Box>
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
      <ProjectTitle>💼 React Hooks Manager</ProjectTitle>
      <ProjectLinks
        appLink='https://react-hook-cheatsheet.web.app'
        githubLink='https://github.com/dr1verrr/react-hook-create'
      />
      <Typography adaptive adaptiveProps={{ min: 18, mid: '0.2vw + 0.2vh' }} element='p'>
        <Highlighted variant='primary'>
          This is a React.js code manager application.
        </Highlighted>
      </Typography>
      <Box sx={{ marginTop: 'clamp(20px, 1.5vh, 1.5vh)' }}>
        <Typography adaptive>
          <Highlighted style={{ fontWeight: 600 }} variant='secondary'>
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
            render={item => <Typography adaptive>{item}</Typography>}
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
      <ProjectTitle>🛒 Dr1ver.shop</ProjectTitle>
      <ProjectLinks
        appLink='https://dr1ver-shop.vercel.app/'
        githubLink='https://github.com/dr1verrr/dr1ver.shop'
      />
      <Typography adaptive adaptiveProps={{ min: 18, mid: '0.2vw + 0.2vh' }} element='p'>
        <Highlighted variant='primary'>
          This is a Next.js ecommerce web-application.
        </Highlighted>
      </Typography>
      <Box sx={{ marginTop: 'clamp(20px, 1.5vh, 1.5vh)' }}>
        <Typography adaptive>
          <Highlighted style={{ fontWeight: 600 }} variant='secondary'>
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
            render={item => <Typography adaptive>{item}</Typography>}
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

export default function Projects() {
  return (
    <Container maxWidth='md'>
      <Typography adaptive adaptiveProps={{ min: 34, mid: '2.5vw + 2.5vh' }} variant='h1'>
        Projects
      </Typography>
      <Stack
        direction='column'
        spacing='clamp(100px, 10vh, 10vh)'
        sx={{ paddingBottom: 150 }}
      >
        <SpeedTyperDev />
        <ReactHookManager />
        <DriverShop />
      </Stack>
    </Container>
  )
}
