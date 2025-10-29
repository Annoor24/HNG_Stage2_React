import React from 'react'

export default function Footer(){
  return (
    <footer className="footer" role="contentinfo">
      <div className="app-container">
        <p>© {new Date().getFullYear()} TicketApp — Built with ❤️ • Accessible • Responsive</p>
      </div>
    </footer>
  )
}
