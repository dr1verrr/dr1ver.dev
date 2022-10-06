import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ReactPortalProps = {
  children?: ReactNode
  wrapperId: string
}

function ReactPortal({ children, wrapperId = 'root' }: ReactPortalProps) {
  const wrapperElement = document.getElementById(wrapperId)

  if (wrapperElement) {
    return createPortal(children, wrapperElement)
  }

  return null
}

export default ReactPortal
