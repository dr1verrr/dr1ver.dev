import { NavLink } from 'react-router-dom'

import { ROUTES } from '@/components/routes/constants'
import UIButton from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import Stack from '@/components/shared/Stack'
import UITypography from '@/components/shared/Typography'
import adaptive from '@/hoc/adaptive'

const Typography = adaptive(UITypography)
const Button = adaptive(UIButton)

export default function About() {
  return (
    <Container
      maxWidth='lg'
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Container maxWidth='md'>
        <Stack
          direction='column'
          spacing='clamp(20px, 2vh, 2vh)'
          sx={{ padding: 'clamp(50px, 3vw + 3vh, 3vw + 3vh) 0' }}
        >
          <Typography size='lg' sx={{ margin: 0, fontWeight: 300 }} variant='h2'>
            About me
          </Typography>
          <Stack
            direction='column'
            spacing='clamp(20px, 2vh, 2vh)'
            sx={{ lineHeight: 2 }}
          >
            <Typography element='p'>
              I'm a Front-End Developer located in Saint Petersburg. Creating scalable,
              performance optimized web applications and some other cool stuff for web
              with good UX and modern standards.
            </Typography>
            <Typography element='p'>Well-organized, punctual person.</Typography>
            <Typography element='p'>
              Interested in the entire frontend spectrum and working on ambitious projects
              with positive people.
            </Typography>
            <NavLink style={{ maxWidth: 'fit-content' }} to={ROUTES.Contact.path}>
              <Button variant='action.secondary'>Get Started</Button>
            </NavLink>
          </Stack>
        </Stack>
      </Container>
    </Container>
  )
}
