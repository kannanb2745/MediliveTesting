import { Link } from 'react-router-dom'
import '../styles/dashboard.css'

function Dashboard({ user, logout }) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>🎉 Authentication Successful!</h1>
        <p>Welcome, {user?.firstName} {user?.lastName}!</p>
        <p>Account Type: <strong>{user?.userType}</strong></p>
        <p>If you are seeing this page, your login/signup worked correctly.</p>
        <div className="dashboard-actions">
          <Link to="/" className="btn">Go to Home</Link>
          <button onClick={logout} className="btn btn-logout">Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
