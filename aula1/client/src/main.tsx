import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import { UserSignupPage } from './pages/UserSignupPage'
import { LoginPage } from './pages/LoginPage'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserSignupPage />
    <LoginPage />
  </React.StrictMode>,
)
