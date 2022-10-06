import { ReactNode, useState } from 'react'

import Modal, { ModalProps } from '@/components/shared/Modal'

export type ModalUIProps = Omit<ModalProps, 'handleClose'> & {
  renderOpenElement: (onOpen: (...args: any[]) => void) => ReactNode
  handleClose?: ModalProps['handleClose']
}

export default function ModalUI({
  renderOpenElement,
  handleClose,
  ...modalProps
}: ModalUIProps) {
  const [isOpen, setOpen] = useState(false)

  handleClose =
    handleClose ||
    (() => {
      setOpen(false)
    })

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      {renderOpenElement(handleOpen)}
      <Modal handleClose={handleClose} open={isOpen} {...modalProps} />
    </>
  )
}
