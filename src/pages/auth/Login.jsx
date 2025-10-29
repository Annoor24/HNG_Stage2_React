import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSession, fakeToken } from '../../utils/auth'
import { toast } from 'react-toastify'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const demo = { email: 'demo@ticket.app', password: 'password123' }

  function validate(){
    const e = {}
    if (!email.trim()) e.email = 'Email is required'
    if (!password.trim()) e.password = 'Password is required'
    return e
  }

  function handleSubmit(e){
    e.preventDefault()
    setErrors({})
    const eobj = validate()
    if (Object.keys(eobj).length) { setErrors(eobj); return }

    // Simulate API/auth
    if (email === demo.email && password === demo.password) {
      const session = { token: fakeToken(), user: { email: demo.email, name: 'Demo User' } }
      setSession(session)
      toast.success('Logged in')
      navigate('/dashboard')
    } else {
      toast.error('Invalid credentials')
    }
  }

  return (
    <div style={{ maxWidth:600, margin:'24px auto', background:'white', padding:20, borderRadius:10 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          {errors.email && <div className="error" role="alert">{errors.email}</div>}
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {errors.password && <div className="error" role="alert">{errors.password}</div>}
        </div>

        <button className="btn" type="submit">Login</button>
      </form>

      <p style={{ marginTop:12 }}>Demo credentials: <strong>demo@ticket.app / password123</strong></p>
    </div>
  )
}
