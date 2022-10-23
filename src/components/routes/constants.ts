import { lazy } from 'react'

const Projects = lazy(() => import('@/views/Projects'))
const Skills = lazy(() => import('@/views/Skills'))
const About = lazy(() => import('@/views/About'))
const Contact = lazy(() => import('@/views/Contact'))
const Test = lazy(() => import('@/views/Test'))

const ROUTES = {
  About: {
    element: About,
    path: '/about'
  },
  Work: {
    element: Projects,
    path: '/work'
  },
  Skills: {
    element: Skills,
    path: '/skills'
  },
  Contact: {
    element: Contact,
    path: '/contact'
  },
  Test: {
    element: Test,
    path: '/test'
  }
}

export { ROUTES }
