import { useNavigate } from 'react-router-dom'

import {
  Box,
  Button as UIButton,
  Container,
  Stack,
  Typography as UITypography
} from '@/components/shared'
import { adaptive } from '@/hoc'

const Typography = adaptive(UITypography)
const Button = adaptive(UIButton)

const assets = {
  video: {
    mp4: 'https://user-images.githubusercontent.com/67706933/193455191-87da7c7b-eeb1-4c49-9fda-e9d0b62634b7.mp4',
    webm: 'https://user-images.githubusercontent.com/67706933/193455217-5ecd95e8-8f9e-4c4a-945f-2065cfd29b2d.webm'
  }
}

const Video = (
  props: React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >
) => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{ maxWidth: '100%', height: 'auto', minWidth: 0 }}
      {...props}
    >
      <source src={assets.video.webm} type='video/webm' />
      <source src={assets.video.mp4} type='video/mp4' />
    </video>
  )
}

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <Container
        maxWidth='lg'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          zIndex: 3
        }}
      >
        <Stack
          direction='column'
          spacing='clamp(10px, 1vh, 1vh)'
          sx={{ zIndex: 1, padding: 'clamp(30px, 1.5vw, 1.5vw)', maxWidth: '75%' }}
        >
          <Stack
            spacing='clamp(10px, 1vh, 1vh)'
            sx={{ alignItems: 'center', background: 'transparent' }}
          >
            <Typography size='lg' sx={{ mixBlendMode: 'difference', fontWeight: 700 }}>
              404.
            </Typography>
            <Button
              size='md'
              variant='secondary'
              onClick={() => {
                navigate(-1)
              }}
            >
              Go back
            </Button>
          </Stack>
          <Typography size='md' sx={{ mixBlendMode: 'difference', fontWeight: 300 }}>
            There is nothing except of chips.
          </Typography>
          <Typography size='md' sx={{ mixBlendMode: 'difference', fontWeight: 300 }}>
            Do you wanna some chips ?
          </Typography>
          <Video />
        </Stack>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
          filter: 'blur(clamp(15px, 1vw + 1vh, 1vw + 1vh))',
          overflow: 'hidden'
        }}
      >
        <Video
          style={{
            height: '100vh',
            width: '100%',
            objectFit: 'cover',
            filter: 'saturate(0.7)'
          }}
        />
      </Box>
    </Box>
  )
}
