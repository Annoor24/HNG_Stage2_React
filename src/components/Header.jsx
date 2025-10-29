import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSession, clearSession } from '../utils/auth'

export default function Header(){
  const navigate = useNavigate()
  const session = getSession()

  function handleLogout(){
    clearSession()
    navigate('/auth/login')
  }

  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <a className="brand" href="/">TicketApp</a>
        <nav aria-label="Main navigation">
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/tickets">Tickets</Link>
            {!session ? (
              <>
                <Link to="/auth/login">Login</Link>
                <Link to="/auth/signup">Sign up</Link>
              </>
            ) : (
              <button onClick={handleLogout} style={{ background:'transparent', border:'none', color:'#ef4444', cursor:'pointer' }}>
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
