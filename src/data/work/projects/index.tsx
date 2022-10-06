import { Box, Stack, Typography as UITypography } from '@/components/shared'
import List from '@/components/ui/List'
import VideoContent from '@/components/ui/video/VideoContent'
import { ProjectProps } from '@/components/work/projects/Project'
import { adaptive } from '@/hoc'

const Typography = adaptive(UITypography)

const data_projects: ProjectProps[] = [
  {
    description: 'This is a React.js speed typer application.',
    header: {
      links: {
        app: 'https://speedtyper-dev.web.app',
        github: 'https://github.com/dr1verrr/speedtyper.dev'
      },
      tags: ['TypeScript', 'React.js', 'Effector.js', 'JSS', 'Firebase'],
      title: 'speedtyper.dev'
    },
    media: {
      Component: () => (
        <VideoContent src='https://user-images.githubusercontent.com/67706933/190857521-fa1d4098-30c0-4a6e-9d13-ef45ac70c1e5.mp4' />
      )
    },
    features: {
      Component: () => {
        return (
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
        )
      }
    }
  },
  {
    description: 'This is a React.js hook(code) manager application.',
    header: {
      links: {
        app: 'https://react-hook-cheatsheet.web.app',
        github: 'https://github.com/dr1verrr/react-hook-create'
      },
      tags: [
        'TypeScript',
        'React.js',
        'Redux.js',
        'React Query',
        'React Hook Form',
        'Material UI',
        'Zustand',
        'Firebase'
      ],
      title: 'React Hook Manager'
    },
    media: {
      Component: () => (
        <VideoContent src='https://user-images.githubusercontent.com/67706933/191988615-9c17a9b7-9055-495e-a7bb-c29c4b75ebe4.mp4' />
      )
    },
    features: {
      Component: () => {
        return (
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
        )
      }
    }
  },
  {
    description: 'This is a Next.js ecommerce web-application.',
    header: {
      links: {
        app: 'https://dr1ver-shop.vercel.app',
        github: 'https://github.com/dr1verrr/dr1ver.shop'
      },
      tags: ['JavaScript', 'Next.js', 'React.js', 'PostgreSQL'],
      title: 'Dr1ver.shop'
    },
    media: {
      Component: () => (
        <VideoContent src='https://user-images.githubusercontent.com/67706933/191988779-f0bbd2ae-15b8-4215-be3f-5d577e265572.mp4' />
      )
    },
    features: {
      Component: () => {
        return (
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
        )
      }
    }
  }
]

export default data_projects
