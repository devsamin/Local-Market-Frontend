import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import {router} from './router/router.jsx'
import {AuthProvider} from './contexts/AuthContext/AuthProvider.jsx'
import { CartProvider } from './contexts/CartContext/CartProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { HelmetProvider } from 'react-helmet-async'
import PageLoader from './components/PageLoader.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
     <AuthProvider>
      <CartProvider>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
      </CartProvider>
     </AuthProvider>
     <ToastContainer />
    </HelmetProvider>

  </StrictMode>,
)
