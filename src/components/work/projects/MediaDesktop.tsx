import { motion } from 'framer-motion'
import { createUseStyles } from 'react-jss'

import ReactPortal from '@/components/helpers/ReactPortal'
import { Box } from '@/components/shared'
import { useTheme } from '@/theme/hooks'
import { ColorScheme } from '@/theme/types'
import { rgba } from '@/utils/styles'

import { CONSTANTS } from './FullscreenMediaBackground'
import { useProjectContext } from './Project'

const useStyles = createUseStyles<
  'MediaBackground' | '@keyframes rotate',
  unknown,
  ColorScheme
>(theme => ({
  '@keyframes rotate': {
    '0%': {
      rotate: '0deg'
    },
    '100%': {
      rotate: '360deg'
    }
  },
  MediaBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
    '& > video, img': {
      filter: 'blur(clamp(10px, 0.1vw + 0.1vh, 0.1vw + 0.1vh))',
      objectFit: 'cover',
      width: '100% !important',
      height: '100% !important',
      animation: '$rotate 60s ease infinite'
    },
    '&:after': {
      position: 'absolute',
      display: 'block',
      zIndex: 5,
      content: "''",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      background: rgba(theme.bg, 0.8)
    }
  }
}))

const MediaDesktop = ({ MediaComponent }: { MediaComponent: React.ComponentType }) => {
  const { inView } = useProjectContext()
  const theme = useTheme()
  const classes = useStyles({ theme })

  return (
    <>
      <ReactPortal wrapperId={CONSTANTS.ContainerBackground.backgroundComponentId}>
        {inView && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <Box className={classes.MediaBackground}>
              <MediaComponent />
            </Box>
          </motion.div>
        )}
      </ReactPortal>
      <MediaComponent />
    </>
  )
}

export default MediaDesktop
