import React from 'react'

type BackgroundContainerProps<T> = {
  WrapperComponent?: React.ComponentType | keyof JSX.IntrinsicElements
  WrapperProps?: T extends React.ComponentType<infer Props> ? Props : never
  BackgroundProps?: T extends React.ComponentType<infer Props> ? Props : never
  BackgroundComponent?: React.ComponentType | keyof JSX.IntrinsicElements
  backgroundComponentId?: string
  wrapperId?: string
}

const DEFAULTS = {
  wrapperId: 'background-container',
  backgroundComponentId: 'background-component'
}

export default function ContainerBackground<
  T extends React.ComponentType | JSX.IntrinsicElements
>({
  WrapperComponent,
  wrapperId = DEFAULTS.wrapperId,
  BackgroundComponent,
  WrapperProps,
  BackgroundProps,
  backgroundComponentId = DEFAULTS.backgroundComponentId
}: BackgroundContainerProps<T>) {
  const Wrapper = WrapperComponent || 'div'
  const Background = BackgroundComponent || 'div'

  return (
    <Wrapper id={wrapperId} {...WrapperProps}>
      <Background id={backgroundComponentId} {...BackgroundProps}></Background>
    </Wrapper>
  )
}
