// auth helpers — uses localStorage key "ticketapp_session"
export const SESSION_KEY = 'ticketapp_session'

export function setSession(session){
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function getSession(){
  const s = localStorage.getItem(SESSION_KEY)
  return s ? JSON.parse(s) : null
}

export function clearSession(){
  localStorage.removeItem(SESSION_KEY)
}

export function fakeToken(){
  return Math.random().toString(36).slice(2)
}
