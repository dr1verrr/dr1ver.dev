import './App.css'

import { BrowserRouter } from 'react-router-dom'

import AppRoutes from './components/routes/AppRoutes'
import Layout from './components/wrappers/Layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  )
}

export default App
