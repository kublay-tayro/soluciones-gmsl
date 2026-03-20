import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import PublicLayout from './components/PublicLayout.jsx'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import AboutUs from './pages/AboutUs.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/soluciones-gmsl">
      <AuthProvider>
        <Routes>
          {/* Tienda pública */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="catalogo" element={<Catalog />} />
            <Route path="nosotros" element={<AboutUs />} />
          </Route>

          {/* Panel de administración */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
