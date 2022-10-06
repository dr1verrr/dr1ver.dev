import { useMediaQuery } from '@/hooks'

import Video, { VideoProps } from '../../media/video/Video'

export default function VideoContent(props: VideoProps) {
  const isMobile = useMediaQuery('(max-width: 460px)')

  const getVideoProps = (): VideoProps => {
    let props: VideoProps = {
      loop: true,
      muted: true,
      playsInline: true
    }

    if (isMobile) {
      props = { ...props, autoPlay: false, controls: true }
    } else {
      props = { ...props, autoPlay: true }
    }

    return props
  }

  const videoProps = getVideoProps()

  return <Video.ListItem {...videoProps} {...props} />
}
