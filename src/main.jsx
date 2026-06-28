import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.jsx'
import { MenuProvider } from './context/MenuContext.jsx'

createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <MenuProvider>
      <App />
    </MenuProvider>
  </AuthProvider>
)
