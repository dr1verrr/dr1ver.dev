import ContainerBackground from '@/components/containers/container-background'
import ReactPortal from '@/components/helpers/ReactPortal'
import { LAYOUT_CONSTANTS } from '@/components/wrappers/Layout/constants'

export const CONSTANTS = {
  ContainerBackground: {
    wrapperId: 'container-background',
    backgroundComponentId: 'container-background-component'
  }
}

export default function FullscreenMediaBackground() {
  return (
    <ReactPortal wrapperId={LAYOUT_CONSTANTS.LayoutId}>
      <ContainerBackground
        BackgroundProps={{
          style: {
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }
        }}
        backgroundComponentId={CONSTANTS.ContainerBackground.backgroundComponentId}
        wrapperId={CONSTANTS.ContainerBackground.wrapperId}
      />
    </ReactPortal>
  )
}
