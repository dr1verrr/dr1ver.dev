import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

import {
  IconFirebase,
  IconJSS,
  IconMUI,
  IconNodejs,
  IconPostgres,
  IconReact,
  IconVSC,
  NextjsIcon,
  ReduxjsIcon,
  TypescriptIcon
} from '@/components/icons'
import {
  Box,
  Button as UIButton,
  Container,
  Stack,
  Typography as UITypography
} from '@/components/shared'
import adaptive from '@/hoc/adaptive'
import { useTheme } from '@/theme/hooks'
import { ColorScheme } from '@/theme/types'

const Typography = adaptive(UITypography)
const Button = adaptive(UIButton)

type Tech = {
  label: string
  variant?: keyof ColorScheme['button']
  icon?: JSX.Element
}

const librariesStack: Tech[] = [
  { label: 'MUI', icon: <IconMUI /> },
  { label: 'JSS', icon: <IconJSS /> }
]

const mainTechStack: Tech[] = [
  { label: 'Typescript', icon: <TypescriptIcon /> },
  { label: 'React.js', icon: <IconReact /> },
  { label: 'Next.js', icon: <NextjsIcon /> },
  { label: 'Redux.js', icon: <ReduxjsIcon /> },
  { label: 'React Query' },
  { label: 'Firebase', icon: <IconFirebase /> },
  { label: 'Effector.js' }
]

const toolsStack: Tech[] = [{ label: 'Visual Studio Code', icon: <IconVSC /> }]

const secondaryTechStack: Tech[] = [
  { label: 'Node.js', icon: <IconNodejs /> },
  { label: 'Postgres / PostgreSQL', icon: <IconPostgres /> }
]

const useStyles = createUseStyles<'TechButton', unknown, ColorScheme>(theme => ({
  TechButton: {
    background: 'transparent',
    border: `0.12em solid ${theme.divider}`,
    color: theme.palette.lightContrast.color,
    '& svg': {
      fill: theme.palette.lightContrast.color
    },
    '&:hover': {
      background: theme.hover,
      borderColor: theme.color
    }
  }
}))

const TechStack = ({ data, title }: { data: Tech[]; title?: ReactNode }) => {
  const theme = useTheme()
  const classes = useStyles({ theme })

  return (
    <Stack direction='column' spacing='clamp(30px, 1vw + 1vh, 1vw + 1vh)'>
      {title && (
        <Box>
          <Typography size='md' sx={{ fontWeight: 300, margin: 0 }} variant='h3'>
            {title}
          </Typography>
        </Box>
      )}
      <Stack
        spacing='clamp(5px, 0.5vw, 0.5vw)'
        sx={{
          flexWrap: 'wrap',
          maxWidth: 'fit-content'
        }}
      >
        {data.map((t, idx) => (
          <Button
            key={idx}
            className={classes.TechButton}
            icon={t.icon}
            style={{
              gap: '0.5em',
              wordBreak: 'keep-all',
              whiteSpace: 'nowrap',
              flex: 1
            }}
            variant={t.variant}
          >
            {t.label}
          </Button>
        ))}
      </Stack>
    </Stack>
  )
}

export default function Skills() {
  const theme = useTheme()
  return (
    <Container
      maxWidth='md'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
      }}
    >
      <Stack
        direction='column'
        spacing='clamp(50px, 2vw + 2vh, 2vw + 2vh)'
        sx={{ padding: 'clamp(75px, 7vh, 7vh) 0' }}
      >
        <Typography size='lg' sx={{ fontWeight: 300, margin: 0 }} variant='h2'>
          Skills <span style={{ color: theme.accent }}>&</span>{' '}
          <span style={{ color: theme.palette.lightContrast.color }}>Experience</span>
        </Typography>
        <TechStack data={mainTechStack} title='Main tech stack: ' />
        <TechStack data={librariesStack} title='Components / Libraries I use: ' />
        <TechStack data={toolsStack} title='Tools I use: ' />
        <Stack direction='column' spacing='clamp(10px, 0.5vw + 0.5vh, 0.5vw + 0.5vh)'>
          <Typography element='p'>
            Also I had some experience with this technologies in projects:{' '}
          </Typography>
          <TechStack data={secondaryTechStack} />
        </Stack>
      </Stack>
    </Container>
  )
}
