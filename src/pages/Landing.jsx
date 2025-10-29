import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <h1 id="hero-title">Ticketo — Simple Ticket Manager</h1>
        <p>Track your issues, prioritize work, and ship faster. Built for clarity and accessibility.</p>

        <div className="hero-cta">
          <Link className="btn" to="/auth/login">Login</Link>
          <Link className="btn btn-ghost" to="/auth/signup">Get Started</Link>
        </div>

        <div className="stats" role="region" aria-label="Overview stats">
          <div className="card">
            <h3>Total tickets</h3>
            <p id="stat-total">—</p>
          </div>
          <div className="card">
            <h3>Open tickets</h3>
            <p id="stat-open">—</p>
          </div>
          <div className="card">
            <h3>Resolved tickets</h3>
            <p id="stat-closed">—</p>
          </div>
        </div>
      </div>

      <div className="decor-circle" aria-hidden="true"></div>

      {/* wave SVG (bottom) */}
      <svg className="hero-wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#ffffff" d="M0,0 C360,100 1080,0 1440,100 L1440,100 L0,100 Z"></path>
      </svg>
    </section>
  )
}
