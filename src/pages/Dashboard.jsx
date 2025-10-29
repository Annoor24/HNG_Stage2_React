import React, { useEffect, useState } from 'react'
import { loadTickets } from '../utils/tickets'

export default function Dashboard(){
  const [tickets, setTickets] = useState([])

  useEffect(()=>{
    setTickets(loadTickets())
  },[])

  const total = tickets.length
  const open = tickets.filter(t => t.status === 'open').length
  const inProgress = tickets.filter(t => t.status === 'in_progress').length
  const closed = tickets.filter(t => t.status === 'closed').length

  return (
    <div style={{ maxWidth:1200, margin:'24px auto' }}>
      <h2>Dashboard</h2>

      <div className="stats" role="region" aria-label="Ticket summary">
        <div className="card">
          <h3>Total Tickets</h3>
          <p>{total}</p>
        </div>
        <div className="card">
          <h3>Open</h3>
          <p>{open}</p>
        </div>
        <div className="card">
          <h3>In Progress</h3>
          <p>{inProgress}</p>
        </div>
        <div className="card">
          <h3>Closed</h3>
          <p>{closed}</p>
        </div>
      </div>

      <div style={{ marginTop:20 }}>
        <p>Navigate to <strong>Tickets</strong> to manage issues.</p>
      </div>
    </div>
  )
}
