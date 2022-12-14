import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { useLayoutContext } from '../wrappers/Layout'

function ScrollToTop() {
  const location = useLocation()
  const { LayoutInner } = useLayoutContext()
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      LayoutInner.ref.current?.scrollTo(0, 0)
    }
  }, [location])

  return null
}

export default ScrollToTop
