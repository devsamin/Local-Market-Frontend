import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import {router} from './router/router.jsx'
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx'
import { CartProvider } from './contexts/CartContext/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <CartProvider>
      <RouterProvider router={router} />
      </CartProvider>
     </AuthProvider>

  </StrictMode>,
)
