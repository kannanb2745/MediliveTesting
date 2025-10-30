import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Index from './pages/Index'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import CaretakerDashboard from './pages/CaretakerDashboard'
import AIServices from './pages/AIServices'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = (token, userData) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index user={user} logout={logout} />} />
        <Route path="/index" element={<Index user={user} logout={logout} />} />
        <Route path="/login" element={!user ? <Login onLogin={login} /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!user ? <Signup onSignup={login} /> : <Navigate to="/dashboard" />} />
        <Route path="/ai-services" element={<AIServices user={user} logout={logout} />} />
        <Route 
          path="/dashboard" 
          element={
            user ? (
              user.userType === 'doctor' ? (
                <DoctorDashboard user={user} logout={logout} />
              ) : user.userType === 'caretaker' ? (
                <CaretakerDashboard user={user} logout={logout} />
              ) : (
                <Dashboard user={user} logout={logout} />
              )
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
