import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { loadTokenFromStorage } from './services/auth'

// Load any saved token before mounting app so api client has Authorization header
loadTokenFromStorage();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
