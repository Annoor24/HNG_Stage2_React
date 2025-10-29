import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import ProtectedRoute from './components/ProtectedRoute'
import Toast from './components/Toast'

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets" element={<Tickets />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  )
}

