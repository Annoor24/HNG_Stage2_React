import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { getSession } from '../utils/auth'

export default function ProtectedRoute(){
  const session = getSession()
  return session ? <Outlet /> : <Navigate to="/auth/login" replace />
}
