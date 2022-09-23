import Button from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import Stack from '@/components/shared/Stack'
import Typography from '@/components/shared/Typography'
import { useLayoutContext } from '@/components/wrappers/Layout'

export default function Main() {
  const { switchTheme } = useLayoutContext()
  return (
    <Container
      maxWidth='md'
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: 40,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <Typography variant='h3'>
        Hey! 👋 I am Daniil, and I am a Frontend Software Engineer
      </Typography>
      <Stack direction='column' spacing={10}>
        <Button onClick={switchTheme}>Switch theme</Button>
        {/*<Stack spacing={10}>
          <Button variant='primary'>Primary</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='action'>Action</Button>
          <Button variant='info'>Info</Button>
        </Stack>
        <Stack spacing={10}>
          <Button variant='action.secondary'>Action.secondary</Button>
          <Button variant='info.secondary'>Info.secondary</Button>
        </Stack>*/}
      </Stack>
    </Container>
  )
}
