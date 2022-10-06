import { motion, MotionProps } from 'framer-motion'
import React, { useRef } from 'react'

type BackgroundContainerProps = {
  WrapperComponent?: React.ComponentType | keyof JSX.IntrinsicElements
  backgroundComponentId?: string
  motionProps?: MotionProps
  wrapperId?: string
}

const DEFAULTS = {
  wrapperId: 'background-container',
  backgroundComponentId: 'background-component'
}

export default function ContainerBackground({
  WrapperComponent,
  wrapperId = DEFAULTS.wrapperId,
  backgroundComponentId = DEFAULTS.backgroundComponentId,
  motionProps
}: BackgroundContainerProps) {
  const Wrapper = WrapperComponent || 'div'
  const backgroundComponentRef = useRef<HTMLDivElement>(null)

  return (
    <Wrapper id={wrapperId}>
      <motion.div
        ref={backgroundComponentRef}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        {...motionProps}
        id={backgroundComponentId}
      ></motion.div>
    </Wrapper>
  )
}
