import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/index.css'

function Index({ user, logout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleContactSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for contacting us! We will get back to you soon.')
    e.target.reset()
  }

  return (
    <div>
      <nav id="navigation" className="fixed top-0 left-0 right-0 z-50 transition-smooth">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-icon">
                <span>M</span>
              </div>
              <span className="logo-text">MediLive</span>
            </div>

            <div className="nav-desktop">
              <a href="#about" className="nav-link">About</a>
              <a href="#features" className="nav-link">Features</a>
              <a href="#system" className="nav-link">System</a>
              <a href="#users" className="nav-link">Users</a>
              <a href="#ai" className="nav-link">AI Integration</a>
              <a href="#contact" className="nav-link">Contact</a>
              <div className="nav-buttons">
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

            <button 
              className="mobile-menu-btn" 
              id="mobileMenuBtn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="hamburger"></span>
            </button>
          </div>
          
          <div className={`nav-mobile ${mobileMenuOpen ? 'active' : ''}`} id="mobileNav">
            <a href="#about" className="nav-link-mobile">About</a>
            <a href="#features" className="nav-link-mobile">Features</a>
            <a href="#system" className="nav-link-mobile">System</a>
            <a href="#users" className="nav-link-mobile">Users</a>
            <a href="#ai" className="nav-link-mobile">AI Integration</a>
            <a href="#contact" className="nav-link-mobile">Contact</a>
            <div className="nav-buttons-mobile">
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
        </div>
      </nav>

      <section className="hero">
        <div className="hero-bg"></div>

        <div className="hero-content">
          <div className="hero-container">
            <h1 className="hero-title animate-fade-in-up">MediLive</h1>
            <p className="hero-tagline animate-fade-in-up">AI-Driven Platform for Patient Log Tracking and Healthcare Analysis</p>

            <div className="hero-features animate-fade-in-up">
              <div className="feature-grid">
                <div className="feature-card">
                  <p>✓ Provide real-time updates on patient health to authorized caretakers</p>
                </div>
                <div className="feature-card">
                  <p>✓ Ensure secure and controlled access to sensitive medical information</p>
                </div>
                <div className="feature-card">
                  <p>✓ Maintain and share patient medical records with automated discharge summaries</p>
                </div>
                <div className="feature-card">
                  <p>✓ Improve transparency and reduce stress during restricted hospital visits</p>
                </div>
              </div>
            </div>

            <div className="hero-buttons animate-fade-in-up">
              <Link to="/signup" className="btn btn-hero-primary">
                Get Started Today
                <span className="arrow">→</span>
              </Link>
              <Link to="/ai-services" className="btn btn-hero-outline">
                <span className="play">▶</span>
                Watch Demo
              </Link>
            </div>
          </div>

          <div className="scroll-indicator animate-float">
            <div className="scroll-mouse">
              <div className="scroll-wheel"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section section-about">
        <div className="container">
          <div className="section-header">
            <h2>About MediLive</h2>
            <p>Revolutionizing healthcare with AI-powered patient management and real-time monitoring solutions</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>MediLive is a comprehensive healthcare platform that bridges the gap between patients, healthcare providers, and families through advanced AI technology. Our platform ensures seamless communication, secure data sharing, and intelligent health insights.</p>
              <div className="about-stats">
                <div className="stat">
                  <div className="stat-number">10000</div>
                  <div className="stat-label">Patients Served</div>
                </div>
                <div className="stat">
                  <div className="stat-number">500</div>
                  <div className="stat-label">Healthcare Providers</div>
                </div>
                <div className="stat">
                  <div className="stat-number">99</div>
                  <div className="stat-label">Uptime %</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Key Features</h2>
            <p>Comprehensive healthcare solutions powered by cutting-edge AI technology</p>
          </div>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">📡</div>
              <h3>Real-time Updates</h3>
              <p>WebSocket-powered live updates ensure caretakers receive instant notifications about patient status changes and vital signs.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔐</div>
              <h3>Secure Access</h3>
              <p>Advanced JWT authentication and RBAC ensure only authorized personnel can access sensitive medical information.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📋</div>
              <h3>Automated Summaries</h3>
              <p>AI-generated discharge summaries and medical reports save time and ensure comprehensive documentation.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">☁️</div>
              <h3>Cloud Storage</h3>
              <p>Secure cloud-based medical record management with 99.9% uptime and automated backups.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🤖</div>
              <h3>AI Reports</h3>
              <p>Intelligent health insights and predictive analytics help healthcare providers make informed decisions.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Mobile Access</h3>
              <p>Full-featured mobile app ensures healthcare providers can access patient data anywhere, anytime.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="system" className="section section-system">
        <div className="container">
          <div className="section-header">
            <h2>System Architecture</h2>
            <p>Enterprise-grade infrastructure designed for scalability, security, and reliability</p>
          </div>
          <div className="system-content">
            <div className="system-details">
              <div className="system-layer">
                <h4>Authentication Layer</h4>
                <p>Multi-factor authentication with JWT tokens and RBAC for secure access control</p>
              </div>
              <div className="system-layer">
                <h4>Patient Records Database</h4>
                <p>HIPAA-compliant encrypted database with real-time synchronization capabilities</p>
              </div>
              <div className="system-layer">
                <h4>Caretaker Access Portal</h4>
                <p>Intuitive dashboard for family members and authorized caretakers</p>
              </div>
              <div className="system-layer">
                <h4>Cloud Storage</h4>
                <p>Scalable cloud infrastructure with automated backups and disaster recovery</p>
              </div>
              <div className="system-layer">
                <h4>AI Services</h4>
                <p>Machine learning models for predictive analytics and automated report generation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="users" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Users & Benefits</h2>
            <p>Connecting all stakeholders in the healthcare ecosystem</p>
          </div>
          <div className="users-grid">
            <div className="user-card">
              <div className="user-icon">👨‍⚕️</div>
              <h3>Doctors</h3>
              <ul>
                <li>Real-time patient monitoring</li>
                <li>AI-assisted diagnosis</li>
                <li>Automated documentation</li>
                <li>Secure communication</li>
              </ul>
            </div>
            <div className="user-card">
              <div className="user-icon">🏥</div>
              <h3>Hospitals</h3>
              <ul>
                <li>Streamlined operations</li>
                <li>Compliance management</li>
                <li>Resource optimization</li>
                <li>Analytics dashboard</li>
              </ul>
            </div>
            <div className="user-card">
              <div className="user-icon">💊</div>
              <h3>Pharmacies</h3>
              <ul>
                <li>Prescription management</li>
                <li>Drug interaction alerts</li>
                <li>Inventory tracking</li>
                <li>Insurance verification</li>
              </ul>
            </div>
            <div className="user-card">
              <div className="user-icon">👨‍👩‍👧‍👦</div>
              <h3>Families</h3>
              <ul>
                <li>Real-time health updates</li>
                <li>Secure messaging</li>
                <li>Visit scheduling</li>
                <li>Care coordination</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="ai" className="section section-ai">
        <div className="container">
          <div className="section-header">
            <h2>AI Integration</h2>
            <p>Advanced artificial intelligence features for enhanced healthcare delivery</p>
          </div>
          <div className="ai-features">
            <div className="ai-feature">
              <div className="ai-icon">🔮</div>
              <h3>Predictive Analytics</h3>
              <p>Machine learning algorithms analyze patient data to predict health risks and suggest preventive measures before issues arise.</p>
              <Link to="/ai-services" className="feature-link">Learn More →</Link>
            </div>
            <div className="ai-feature">
              <div className="ai-icon">📊</div>
              <h3>Health Insights</h3>
              <p>AI-powered analysis of medical records provides actionable insights for personalized treatment plans and care optimization.</p>
              <Link to="/ai-services" className="feature-link">Learn More →</Link>
            </div>
            <div className="ai-feature">
              <div className="ai-icon">💬</div>
              <h3>Chatbot Assistance</h3>
              <p>24/7 AI chatbot provides instant support to families, answering questions and providing guidance when needed.</p>
              <Link to="/ai-services" className="feature-link">Learn More →</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Get Started Today</h2>
            <p>Ready to transform your healthcare experience? Contact us or sign up now</p>
          </div>
          <div className="contact-content">
            <form className="contact-form" id="contactForm" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="organization">Organization</label>
                <input type="text" id="organization" name="organization" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-full">Send Message</button>
            </form>
            <div className="contact-info">
              <h3>Contact Information</h3>
              <div className="contact-item">
                <strong>Email:</strong> info@medilive.ai
              </div>
              <div className="contact-item">
                <strong>Phone:</strong> +1 (555) 123-4567
              </div>
              <div className="contact-item">
                <strong>Address:</strong> 123 Healthcare Ave, Medical District, CA 90210
              </div>
              <div className="cta-section">
                <h4>Ready to get started?</h4>
                <div className="cta-buttons">
                  <Link to="/signup" className="btn btn-primary">Sign Up Free</Link>
                  <Link to="/ai-services" className="btn btn-outline">View AI Services</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <div className="logo-icon">
                  <span>M</span>
                </div>
                <span className="logo-text">MediLive</span>
              </div>
              <p>AI-Driven Platform for Patient Log Tracking and Healthcare Analysis</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 MediLive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index
