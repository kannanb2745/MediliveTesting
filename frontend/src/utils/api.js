import axios from 'axios'

const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    const protocol = window.location.protocol
    
    if (hostname.includes('replit.dev')) {
      const backendHost = hostname.replace(/-\d{2,5}-/, '-8000-')
      return `${protocol}//${backendHost}/api`
    }
    
    if (hostname.includes('repl.co')) {
      const backendHost = hostname.replace(/^([^.]+)\./, '$1-8000.')
      return `${protocol}//${backendHost}/api`
    }
  }
  
  return 'http://localhost:8000/api'
}

const API_URL = getApiUrl()

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
}

export const patientAPI = {
  getAll: () => api.get('/patients'),
  getOne: (id) => api.get(`/patients/${id}`),
  create: (data) => api.post('/patients', data),
  addVitals: (id, data) => api.post(`/patients/${id}/vitals`, data),
  assignCaretaker: (id, data) => api.post(`/patients/${id}/assign-caretaker`, data),
}

export default api
