import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { patientAPI } from '../utils/api'
import '../styles/doctor-dashboard.css'

function DoctorDashboard({ user, logout }) {
  const [patients, setPatients] = useState([])
  const [showAddPatient, setShowAddPatient] = useState(false)
  const [showAddVitals, setShowAddVitals] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: 'male',
    diagnosis: '',
    status: 'Active'
  })
  const [newVitals, setNewVitals] = useState({
    heartRate: '',
    bloodPressure: '',
    temperature: '',
    oxygenLevel: ''
  })

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    try {
      const response = await patientAPI.getAll()
      setPatients(response.data)
    } catch (error) {
      console.error('Failed to load patients:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPatient = async (e) => {
    e.preventDefault()
    try {
      await patientAPI.create(newPatient)
      setNewPatient({ name: '', age: '', gender: 'male', diagnosis: '', status: 'Active' })
      setShowAddPatient(false)
      loadPatients()
    } catch (error) {
      alert('Failed to add patient: ' + (error.response?.data?.error || error.message))
    }
  }

  const handleAddVitals = async (e) => {
    e.preventDefault()
    try {
      await patientAPI.addVitals(selectedPatient.id, newVitals)
      setNewVitals({ heartRate: '', bloodPressure: '', temperature: '', oxygenLevel: '' })
      setShowAddVitals(false)
      setSelectedPatient(null)
      alert('Vitals added successfully!')
    } catch (error) {
      alert('Failed to add vitals: ' + (error.response?.data?.error || error.message))
    }
  }

  return (
    <div className="doctor-dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <Link to="/" className="logo">
            <div className="logo-icon"><span>M</span></div>
            <span className="logo-text">MediLive</span>
          </Link>
        </div>
        <div className="nav-user">
          <span>Dr. {user?.firstName} {user?.lastName}</span>
          <button onClick={logout} className="btn btn-sm">Logout</button>
        </div>
      </nav>

      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>Doctor Dashboard</h1>
          <button onClick={() => setShowAddPatient(true)} className="btn btn-primary">
            + Add New Patient
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading patients...</div>
        ) : (
          <div className="patients-grid">
            {patients.length === 0 ? (
              <div className="empty-state">
                <h3>No patients yet</h3>
                <p>Add your first patient to get started</p>
              </div>
            ) : (
              patients.map(patient => (
                <div key={patient.id} className="patient-card">
                  <h3>{patient.name}</h3>
                  <div className="patient-info">
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Diagnosis:</strong> {patient.diagnosis}</p>
                    <p><strong>Status:</strong> <span className={`status status-${patient.status?.toLowerCase()}`}>{patient.status}</span></p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedPatient(patient)
                      setShowAddVitals(true)
                    }}
                    className="btn btn-sm btn-outline"
                  >
                    Add Vitals
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {showAddPatient && (
        <div className="modal-overlay" onClick={() => setShowAddPatient(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Add New Patient</h2>
            <form onSubmit={handleAddPatient}>
              <div className="form-group">
                <label>Patient Name</label>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Diagnosis</label>
                <textarea
                  value={newPatient.diagnosis}
                  onChange={(e) => setNewPatient({...newPatient, diagnosis: e.target.value})}
                  rows="3"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddPatient(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Add Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddVitals && selectedPatient && (
        <div className="modal-overlay" onClick={() => setShowAddVitals(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Add Vitals for {selectedPatient.name}</h2>
            <form onSubmit={handleAddVitals}>
              <div className="form-group">
                <label>Heart Rate (bpm)</label>
                <input
                  type="number"
                  value={newVitals.heartRate}
                  onChange={(e) => setNewVitals({...newVitals, heartRate: e.target.value})}
                  placeholder="e.g., 72"
                />
              </div>
              <div className="form-group">
                <label>Blood Pressure</label>
                <input
                  type="text"
                  value={newVitals.bloodPressure}
                  onChange={(e) => setNewVitals({...newVitals, bloodPressure: e.target.value})}
                  placeholder="e.g., 120/80"
                />
              </div>
              <div className="form-group">
                <label>Temperature (°F)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newVitals.temperature}
                  onChange={(e) => setNewVitals({...newVitals, temperature: e.target.value})}
                  placeholder="e.g., 98.6"
                />
              </div>
              <div className="form-group">
                <label>Oxygen Level (%)</label>
                <input
                  type="number"
                  value={newVitals.oxygenLevel}
                  onChange={(e) => setNewVitals({...newVitals, oxygenLevel: e.target.value})}
                  placeholder="e.g., 98"
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddVitals(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Add Vitals</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorDashboard
