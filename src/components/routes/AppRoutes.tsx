import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ROUTES } from './constants'

const Main = lazy(() => import('@/views/Main'))
const Projects = lazy(() => import('@/views/Projects'))
const Skills = lazy(() => import('@/views/Skills'))
const About = lazy(() => import('@/views/About'))

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route element={<About />} path={ROUTES.About} />
      <Route element={<Skills />} path={ROUTES.Skills} />
      <Route element={<Projects />} path={ROUTES.Projects} />
    </Routes>
  )
}
