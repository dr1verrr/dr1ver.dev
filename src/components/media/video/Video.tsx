import React, { useState } from 'react'

export type VideoProps = React.DetailedHTMLProps<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
> & {}

export default function Video(props: VideoProps) {
  return (
    <video
      style={{
        maxWidth: '100%',
        height: 'auto'
      }}
      {...props}
    ></video>
  )
}

type VideoListItemProps = VideoProps & {
  styles?: {
    onError?: React.CSSProperties
    onLoad?: React.CSSProperties
    default?: React.CSSProperties
  }
  loadingElement?: JSX.Element
}

const defaultStyles: Record<'onError' | 'onLoad' | 'default', React.CSSProperties> = {
  default: {
    minHeight: 'clamp(350px, 3.5vh, 3.5vh)',
    maxWidth: '100%'
  },
  onLoad: {
    maxWidth: '100%',
    height: 'auto'
  },
  onError: {}
}

Video.ListItem = ({ styles, ...props }: VideoListItemProps) => {
  const [status, setStatus] = useState({ loadedData: false, error: false })

  styles = { ...defaultStyles, ...styles }

  return (
    <Video
      style={styles.default}
      {...(status.loadedData && { style: styles.onLoad })}
      {...(status.error && { style: styles.onError })}
      onError={() => {
        setStatus({ loadedData: false, error: true })
      }}
      onLoadedData={() => {
        setStatus({ ...status, loadedData: true })
      }}
      {...props}
    />
  )
}
