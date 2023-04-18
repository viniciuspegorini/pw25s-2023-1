import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import { UserSignupPage } from './UserSignupPage'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserSignupPage />
  </React.StrictMode>,
)
