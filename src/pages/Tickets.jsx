import React, { useEffect, useState } from 'react'
import { loadTickets, createTicket, updateTicket, deleteTicket, saveTickets } from '../utils/tickets'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'

const VALID_STATUSES = ['open','in_progress','closed']

function TicketForm({ onSubmit, initial = {}, onCancel }){
  const [title, setTitle] = useState(initial.title || '')
  const [status, setStatus] = useState(initial.status || 'open')
  const [description, setDescription] = useState(initial.description || '')
  const [errors, setErrors] = useState({})

  useEffect(()=> {
    setTitle(initial.title || '')
    setStatus(initial.status || 'open')
    setDescription(initial.description || '')
  }, [initial])

  function validate(){
    const e = {}
    if (!title.trim()) e.title = 'Title is required'
    if (!VALID_STATUSES.includes(status)) e.status = 'Invalid status'
    if (description && description.trim().length > 0 && description.trim().length < 10) e.description = 'Description must be at least 10 characters'
    return e
  }

  function handleSubmit(ev){
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length){ setErrors(e); return }
    onSubmit({ title: title.trim(), status, description: description.trim() })
    setTitle(''); setStatus('open'); setDescription(''); setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} style={{ background:'white', padding:12, borderRadius:10 }}>
      <div className="form-row">
        <label htmlFor="t-title">Title</label>
        <input id="t-title" value={title} onChange={e=>setTitle(e.target.value)} />
        {errors.title && <div className="error">{errors.title}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="t-status">Status</label>
        <select id="t-status" value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="open">open</option>
          <option value="in_progress">in_progress</option>
          <option value="closed">closed</option>
        </select>
        {errors.status && <div className="error">{errors.status}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="t-desc">Description (optional)</label>
        <textarea id="t-desc" rows="3" value={description} onChange={e=>setDescription(e.target.value)} />
        {errors.description && <div className="error">{errors.description}</div>}
      </div>

      <div style={{ display:'flex', gap:8 }}>
        <button className="btn" type="submit">Save</button>
        {onCancel && <button type="button" onClick={onCancel} style={{ padding:'10px 12px', borderRadius:8 }}>Cancel</button>}
      </div>
    </form>
  )
}

export default function Tickets(){
  const [tickets, setTickets] = useState([])
  const [editing, setEditing] = useState(null)
  const [showCreate, setShowCreate] = useState(false)

  useEffect(()=> {
    setTickets(loadTickets())
  },[])

  function refresh(){ setTickets(loadTickets()) }

  function handleCreate(data){
    try {
      const t = { id: uuidv4(), ...data, createdAt: Date.now(), updatedAt: Date.now() }
      createTicket(t)
      toast.success('Ticket created')
      setShowCreate(false)
      refresh()
    } catch {
      toast.error('Failed to create ticket')
    }
  }

  function handleUpdate(id, updates){
    try {
      updateTicket(id, updates)
      toast.success('Ticket updated')
      setEditing(null)
      refresh()
    } catch {
      toast.error('Failed to update ticket')
    }
  }

  function handleDelete(id){
    if (!confirm('Delete this ticket?')) return
    try {
      deleteTicket(id)
      toast.success('Ticket deleted')
      refresh()
    } catch {
      toast.error('Failed to delete ticket')
    }
  }

  return (
    <div style={{ maxWidth:1100, margin:'24px auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h2>Ticket Management</h2>
        <div>
          <button className="btn" onClick={()=> setShowCreate(s=>!s)} aria-expanded={showCreate}>{showCreate ? 'Close' : 'Create Ticket'}</button>
        </div>
      </div>

      {showCreate && <div style={{ marginTop:12 }}><TicketForm onSubmit={handleCreate} onCancel={()=>setShowCreate(false)} /></div>}

      <div className="tickets-grid" style={{ marginTop:16 }}>
        {tickets.length === 0 && <p>No tickets yet — create one to get started.</p>}
        {tickets.map(t=>(
          <div key={t.id} className="ticket" role="article" aria-labelledby={`ticket-${t.id}`}>
            <div className="meta">
              <strong id={`ticket-${t.id}`}>{t.title}</strong>
              <span className={`status status--${t.status}`}>{t.status}</span>
            </div>

            <div>
              <small>Created: {new Date(t.createdAt).toLocaleString()}</small>
            </div>

            <p>{t.description}</p>

            <div style={{ display:'flex', gap:8 }}>
              <button onClick={()=> setEditing(t)} style={{ padding:'8px 10px' }}>Edit</button>
              <button onClick={()=> handleDelete(t.id)} style={{ padding:'8px 10px' }}>Delete</button>
            </div>

            {editing && editing.id === t.id && (
              <div style={{ marginTop:10 }}>
                <TicketForm initial={editing} onSubmit={(u)=> handleUpdate(t.id, u)} onCancel={()=> setEditing(null)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
