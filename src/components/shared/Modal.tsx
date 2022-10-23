import { ReactNode, useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

import { useTheme } from '@/components/wrappers/Layout/theme'
import { ColorScheme } from '@/theme/types'
import { rgba } from '@/utils/styles'

import ReactPortal from '../helpers/ReactPortal'

export type ModalProps = {
  children: (onClose: ModalProps['handleClose']) => ReactNode
  open?: boolean
  handleClose: (...args: any[]) => void
  CSSTransitionProps?: CSSTransitionProps
  ModalProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
}

const useStyles = createUseStyles<
  'Modal' | 'Enter' | 'Exit' | 'ModalContent' | 'BackdropClose',
  unknown,
  ColorScheme
>(theme => ({
  Modal: {
    transition: 'opacity .15s ease',
    opacity: 0,
    background: rgba(theme.bg, 0.85),
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 5000
  },
  Enter: {
    opacity: 1
  },
  Exit: {
    transition: 'opacity 0.1s ease',
    opacity: 0
  },
  ModalContent: {
    position: 'relative',
    zIndex: 4000,
    maxHeight: '100%',
    maxWidth: '100%'
  },
  BackdropClose: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3500
  }
}))

export default function Modal({
  children,
  open = false,
  handleClose,
  CSSTransitionProps,
  ModalProps
}: ModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const classes = useStyles({ theme })

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? handleClose() : null
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])

  return (
    <ReactPortal wrapperId='modals'>
      {/*// @ts-ignore: Unreachable code error*/}
      <CSSTransition
        unmountOnExit
        classNames={{
          enter: classes.Enter,
          exit: classes.Exit,
          enterDone: classes.Enter
        }}
        in={open}
        timeout={{ appear: 150, exit: 100 }}
        {...CSSTransitionProps}
      >
        <div className={classes.Modal} {...ModalProps}>
          <div className={classes.BackdropClose} onClick={handleClose}></div>
          <div ref={modalContentRef} className={classes.ModalContent}>
            {children(handleClose)}
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  )
}
