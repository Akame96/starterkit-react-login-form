// src/main.jsx o src/main.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Importa il file CSS con Tailwind
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

