import axios from 'axios'

const api = axios.create({
  baseURL: '',  // vite proxy handles /journal and /user → localhost:8080
  headers: { 'Content-Type': 'application/json' },
})
// journal.js — make consistent
export const loginUser = ({ userName, password }) => axios.post('/user/login', { userName, password })

// Add a request interceptor to include authentication headers
api.interceptors.request.use(config => {
  const userName = localStorage.getItem('mnemos_auth_user')
  const password = localStorage.getItem('mnemos_auth_password')

  if (userName && password) {
    const base64Credentials = btoa(`${userName}:${password}`)
    config.headers.Authorization = `Basic ${base64Credentials}`
  }

  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

// ─── Journal Endpoints ────────────────────────────────────────────────────────

/** GET /journal — fetch all entries */
export const getAllEntries = () => api.get('/journal')

/** GET /journal/:id — fetch single entry */
export const getEntryById = (id) => api.get(`/journal/${id}`)

/** POST /journal — create new entry  { title, content } */
export const createEntry = (entry) => api.post('/journal', entry)

/** PUT /journal/:id — update entry { title?, content? } */
export const updateEntry = (id, entry) => api.put(`/journal/${id}`, entry)

/** DELETE /journal/:id — delete entry */
export const deleteEntry = (id) =>  api.delete(`/journal/${id.toString()}`)

// ─── User Endpoints ───────────────────────────────────────────────────────────

/** POST /user/register — register { userName, password } */
export const registerUser = (user) => api.post('/user/register', user)

/** PUT /user — update user { userName, password } */
export const updateUser = (user) => api.put('/user', user)
