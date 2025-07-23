import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider }from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster 
          toastOptions={{
            success : {
              duration: 4000,
              style: {
                background: '#78e83c',
                border: '2px solid grey',
                color: 'white'
              }
            },
            error: {
              duration: 4000,
              style: {
                background : 'red',
                border: '2px solid grey',
                color: 'white'
              }
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
