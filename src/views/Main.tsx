import { motion } from 'framer-motion'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

import Photo from '/assets/transparent.png'
import { ROUTES } from '@/components/routes/constants'
import { Box, Stack } from '@/components/shared'
import UIButton from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import UITypography from '@/components/shared/Typography'
import adaptive from '@/hoc/adaptive'
import { useTheme } from '@/theme/hooks'
import { ColorScheme } from '@/theme/types'

const Button = adaptive(UIButton)
const Typography = adaptive(UITypography)

const useStyles = createUseStyles<'ViewWork', unknown, ColorScheme>(t => ({
  ViewWork: {
    background: t.bg,
    border: `0.05em solid ${t.divider}`,
    fontWeight: 300,
    color: t.palette.lightContrast.color,
    '& svg': {
      fill: t.palette.lightContrast.color
    },
    '&:hover': {
      color: t.color,
      background: t.hover,
      borderColor: t.color
    }
  }
}))

export default function Main() {
  const theme = useTheme()
  const classes = useStyles({ theme })

  return (
    <Container
      maxWidth='lg'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <Box sx={{ padding: 'clamp(35px, 5vh, 5vh) 0' }}>
        <motion.div
          initial={{ opacity: 0, translateX: '-15%' }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, translateX: 0 }}
        >
          <Stack direction='column'>
            <Stack direction='column' spacing='clamp(10px, 1vh, 1vh)'>
              <Stack
                spacing='clamp(20px, 0.75vw + 0.75vh, 0.75vw + 0.75vh)'
                sx={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}
              >
                <Container
                  style={{
                    maxWidth: 'clamp(300px, 50vw, 50vw)',
                    margin: 0
                  }}
                >
                  <Box
                    style={{
                      maxWidth: 'clamp(300px, 20vw, 20vw)',
                      background: theme.bg,
                      borderRadius: '100%',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `0.3em solid ${theme.divider}`
                    }}
                  >
                    <img
                      alt=''
                      src={Photo}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        height: '100%'
                      }}
                    />
                  </Box>
                </Container>
                <Stack direction='column' spacing='clamp(10px, 1vh, 1vh)'>
                  <Typography size='lg' sx={{ fontWeight: 700, letterSpacing: '.1em' }}>
                    HELLO,
                  </Typography>
                  <Typography size='lg' sx={{ fontWeight: 700, letterSpacing: '.1em' }}>
                    I AM DANIIL
                  </Typography>
                  <Typography
                    size='md'
                    sx={{ color: theme.palette.lightContrast.color, fontWeight: 300 }}
                  >
                    and I am a Frontend Software Engineer,
                  </Typography>
                  <Typography
                    size='md'
                    sx={{ color: theme.palette.lightContrast.color, fontWeight: 300 }}
                  >
                    currently located in Saint Petersburg.
                  </Typography>
                  <Link
                    style={{
                      maxWidth: 'fit-content',
                      marginTop: 'clamp(30px, 1.5vh, 1.5vh)'
                    }}
                    tabIndex={-1}
                    to={ROUTES.Work.path}
                  >
                    <Button className={classes.ViewWork} size='md' variant='secondary'>
                      View my work
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </motion.div>
      </Box>
    </Container>
  )
}
