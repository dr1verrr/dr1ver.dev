import './App.css'

import { BrowserRouter } from 'react-router-dom'

import ErrorBoundary from './components/handlers/ErrorBoundary'
import ScrollToTop from './components/helpers/ScrollToTop'
import AppRoutes from './components/routes/AppRoutes'
import Layout from './components/wrappers/Layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ErrorBoundary>
          <ScrollToTop />
          <AppRoutes />
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  )
}

export default App
