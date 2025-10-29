import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSession, fakeToken } from '../../utils/auth'
import { toast } from 'react-toastify'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function validate(){
    const e = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!email.includes('@') || !email.includes('.')) e.email = 'Enter a valid email'
    if (password.length < 6) e.password = 'Password must be at least 6 characters'
    return e
  }

  function handleSubmit(ev){
    ev.preventDefault()
    setErrors({})
    const eobj = validate()
    if (Object.keys(eobj).length) { setErrors(eobj); return }

    const session = { token: fakeToken(), user: { name, email } }
    setSession(session)
    toast.success('Account created')
    navigate('/dashboard')
  }

  return (
    <div style={{ maxWidth:600, margin:'24px auto', background:'white', padding:20, borderRadius:10 }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Full name</label>
          <input id="name" value={name} onChange={e=>setName(e.target.value)} />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <button className="btn" type="submit">Create account</button>
      </form>
    </div>
  )
}
