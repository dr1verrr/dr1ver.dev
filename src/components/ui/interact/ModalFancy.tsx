import ModalUI, { ModalUIProps } from './ModalUI'

export default function ModalFancy({ ModalProps, ...props }: ModalUIProps) {
  return (
    <ModalUI
      ModalProps={{
        ...ModalProps,
        style: {
          ...ModalProps?.style,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'clamp(15px, 1vw + 1vh, 1vw + 1vh)'
        }
      }}
      {...props}
    ></ModalUI>
  )
}
