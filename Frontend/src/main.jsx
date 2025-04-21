import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StudentLandingPage from './Pages/StudentLandingPage/StudentLandingPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentLandingPage />
  </StrictMode>,
)
