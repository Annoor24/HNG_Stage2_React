// tickets stored under ticketapp_tickets
const KEY = 'ticketapp_tickets'

export function loadTickets(){
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function saveTickets(tickets){
  localStorage.setItem(KEY, JSON.stringify(tickets))
}

export function createTicket(ticket){
  const tickets = loadTickets()
  tickets.unshift(ticket)
  saveTickets(tickets)
}

export function updateTicket(id, updates){
  const tickets = loadTickets().map(t => t.id === id ? {...t, ...updates, updatedAt: Date.now()} : t)
  saveTickets(tickets)
}

export function deleteTicket(id){
  const tickets = loadTickets().filter(t => t.id !== id)
  saveTickets(tickets)
}
