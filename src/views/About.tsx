import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import Highlighted from '@/components/shared/Highlighted'
import Stack from '@/components/shared/Stack'
import Typography from '@/components/shared/Typography'
import { useLayoutContext } from '@/components/wrappers/Layout'

export default function About() {
  const { switchTheme } = useLayoutContext()
  return (
    <Container maxWidth='md'>
      <Box sx={{ paddingTop: 50 }}>
        <Stack spacing={25} sx={{ flexWrap: 'wrap' }}>
          <Box>
            <Typography
              sx={{ fontSize: `clamp(24px, 2vw + 2vh, 2vw + 2vh)` }}
              variant='h1'
            >
              Highlighted
            </Typography>
            <Stack spacing={10} sx={{ flexWrap: 'wrap' }}>
              <Highlighted variant='primary'>I am Highlighted.primary</Highlighted>
              <Highlighted variant='secondary'>I am Highlighted.secondary</Highlighted>
              <Highlighted variant='action'>I am Highlighted.action</Highlighted>
              <Highlighted variant='action.secondary'>
                I am Highlighted.action.secondary
              </Highlighted>
              <Highlighted variant='info'>I am Highlighted.info</Highlighted>
              <Highlighted variant='info.secondary'>
                I am Highlighted.info.secondary
              </Highlighted>
            </Stack>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: `clamp(24px, 2vw + 2vh, 2vw + 2vh)` }}
              variant='h1'
            >
              Buttons
            </Typography>
            <Stack direction='column' spacing={10}>
              <Button onClick={switchTheme}>Switch theme</Button>
              <Stack spacing={10}>
                <Button variant='primary'>Primary</Button>
                <Button variant='secondary'>Secondary</Button>
                <Button variant='action'>Action</Button>
                <Button variant='info'>Info</Button>
              </Stack>
              <Stack spacing={10}>
                <Button variant='action.secondary'>Action.secondary</Button>
                <Button variant='info.secondary'>Info.secondary</Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Container>
  )
}
