import { lazy } from 'react'
import { Route, Routes, RoutesProps } from 'react-router-dom'

import { ROUTES } from './constants'

const Main = lazy(() => import('@/views/Main'))

const routes = Object.keys(ROUTES).map(r => ({
  element: ROUTES[r as keyof typeof ROUTES].element,
  path: ROUTES[r as keyof typeof ROUTES].path
}))

export default function AppRoutes(props?: RoutesProps) {
  return (
    <Routes {...props}>
      <Route index element={<Main />} />
      {routes.map(({ element: ViewComponent, path }, idx) => (
        <Route key={idx} element={<ViewComponent />} path={path} />
      ))}
    </Routes>
  )
}
