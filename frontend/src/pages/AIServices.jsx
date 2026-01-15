import { Link } from 'react-router-dom'
import '../styles/ai-services.css'
import '../styles/index.css'

function AIServices({ user, logout }) {
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="logo">
            <div className="logo-icon"><span>M</span></div>
            <span className="logo-text">MediLive</span>
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
                <button onClick={logout} className="btn btn-primary">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main>
        <section className="hero-ai">
          <div className="container">
            <h1>AI-Powered Healthcare Services</h1>
            <p>Advanced artificial intelligence solutions for better healthcare outcomes</p>
          </div>
        </section>

        <section className="ai-services">
          <div className="container">
            <div className="service-card">
              <div className="service-icon">🔮</div>
              <h2>Predictive Analytics</h2>
              <p>AI algorithms analyze patient data to predict health risks and suggest preventive measures.</p>
              <div className="service-features">
                <div className="feature">✓ Risk Assessment</div>
                <div className="feature">✓ Early Warning Systems</div>
                <div className="feature">✓ Treatment Optimization</div>
              </div>
              <button className="btn btn-primary">Coming Soon</button>
            </div>

            <div className="service-card">
              <div className="service-icon">📊</div>
              <h2>Health Insights</h2>
              <p>Comprehensive analysis of medical records for personalized treatment recommendations.</p>
              <div className="service-features">
                <div className="feature">✓ Pattern Recognition</div>
                <div className="feature">✓ Treatment Suggestions</div>
                <div className="feature">✓ Health Trends</div>
              </div>
              <button className="btn btn-primary">Coming Soon</button>
            </div>

            <div className="service-card">
              <div className="service-icon">💬</div>
              <h2>AI Chatbot Assistant</h2>
              <p>24/7 intelligent support for patients and families with instant responses to healthcare questions.</p>
              <div className="service-features">
                <div className="feature">✓ 24/7 Availability</div>
                <div className="feature">✓ Medical Q&A</div>
                <div className="feature">✓ Appointment Booking</div>
              </div>
              <button className="btn btn-primary">Coming Soon</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 MediLive. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default AIServices
