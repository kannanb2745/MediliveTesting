import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../utils/api'
import '../styles/login.css'

function Login({ onLogin }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password
      })
      
      onLogin(response.data.access_token, response.data.user)
      navigate('/dashboard')
    } catch (error) {
      setErrors({
        general: error.response?.data?.error || 'Invalid email or password'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="bg-overlay"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span>M</span>
            </div>
            <span className="logo-text">MediLive</span>
          </Link>
          <h1>Welcome Back</h1>
          <p>Sign in to your MediLive account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="error-banner">{errors.general}</div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="show-text">{showPassword ? '🙈' : '👁️'}</span>
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            <span className="btn-text">{loading ? 'Signing In...' : 'Sign In'}</span>
            {loading && (
              <span className="btn-loader">
                <div className="spinner"></div>
              </span>
            )}
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="login-footer">
            <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
          </div>
        </form>
      </div>

      <Link to="/" className="back-home">
        ← Back to Home
      </Link>
    </div>
  )
}

export default Login
