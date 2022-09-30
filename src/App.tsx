import './App.css'

import { BrowserRouter } from 'react-router-dom'

import ScrollToTop from './components/helpers/ScrollToTop'
import AppRoutes from './components/routes/AppRoutes'
import Layout from './components/wrappers/Layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ScrollToTop />
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  )
}

export default App
