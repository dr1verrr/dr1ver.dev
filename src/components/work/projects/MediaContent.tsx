import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

import { Box, Button, Stack } from '@/components/shared'
import ModalFancy from '@/components/ui/interact/ModalFancy'
import { useTheme } from '@/components/wrappers/Layout/theme'
import { ColorScheme } from '@/theme/types'

type MediaContentProps = {
  children?: ReactNode
  mobile: boolean
}

const useStyles = createUseStyles<'MediaContentInner', unknown, ColorScheme>(theme => ({
  MediaContentInner: {
    position: 'relative',
    border: `clamp(1px, 0.05vw, 0.05vw) solid ${theme.divider}`,
    borderRadius: 'clamp(12px, 0.1vw + 0.1vh, 0.1vw + 0.1vh)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 'fit-content',
    minWidth: 0,
    cursor: 'pointer',
    '&:after': {
      transitionDuration: '.15s',
      transitionProperty: 'opacity',
      background: theme.hover,
      opacity: 0,
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%'
    },
    '& > *': {
      transition: 'scale .3s ease'
    },
    '&:hover': {
      '& > *': {
        scale: 1.3
      },
      '&:after': {
        opacity: 0.35
      }
    }
  }
}))

const MediaContent = ({ mobile, children }: MediaContentProps) => {
  const theme = useTheme()
  const classes = useStyles({ theme })

  return (
    <ModalFancy
      renderOpenElement={open => (
        <Box className={classes.MediaContentInner} onClick={open}>
          {children}
        </Box>
      )}
    >
      {close => (
        <Stack
          direction='column'
          spacing='clamp(10px, 0.5vh, 0.5vh)'
          sx={{
            overflow: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              zIndex: 2
            }}
            onClick={close}
          ></Box>
          <Box
            style={{
              position: 'relative',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex'
            }}
          >
            <Box
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                zIndex: 2
              }}
              onClick={close}
            ></Box>
            <Button
              style={{
                width: '100%',
                maxWidth: '50%',
                position: 'relative',
                minWidth: 'fit-content',
                zIndex: 3
              }}
              variant='action.secondary'
              onClick={close}
            >
              Close
            </Button>
          </Box>

          <Box
            {...(!mobile && { onClick: close })}
            sx={{
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'auto',
              borderRadius: 'clamp(15px, 1vw, 1vw)',
              border: `clamp(1px, 0.05vw, 0.05vw) solid ${theme.divider}`,
              maxWidth: '85%',
              maxHeight: '50%'
            }}
          >
            {children}
          </Box>
        </Stack>
      )}
    </ModalFancy>
  )
}

export default MediaContent
