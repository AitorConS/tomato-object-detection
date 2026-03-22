import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/index.css";
import App from './App.jsx'

// Load react-scan only in development
if (import.meta.env.DEV) {
  import('https://cdn.jsdelivr.net/npm/react-scan/dist/auto.global.js')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
