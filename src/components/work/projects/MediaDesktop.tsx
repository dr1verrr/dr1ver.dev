import { createUseStyles } from 'react-jss'

import ReactPortal from '@/components/helpers/ReactPortal'
import { Box } from '@/components/shared'
import { useTheme } from '@/theme/hooks'
import { ColorScheme } from '@/theme/types'
import { rgba } from '@/utils/styles'

import { CONSTANTS } from './FullscreenMediaBackground'
import { useProjectContext } from './Project'

const useStyles = createUseStyles<'MediaBackground', unknown, ColorScheme>(theme => ({
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
      filter: 'blur(clamp(12px, 0.25vw + 0.25vh, 0.25vw + 0.25vh))',
      objectFit: 'cover',
      width: '100% !important',
      height: '100% !important',
      scale: 1.2
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
      background: rgba(theme.bg, 0.89)
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
          <Box className={classes.MediaBackground}>
            <MediaComponent />
          </Box>
        )}
      </ReactPortal>
      <MediaComponent />
    </>
  )
}

export default MediaDesktop
