import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { patientAPI } from '../utils/api'
import '../styles/caretaker-dashboard.css'

function CaretakerDashboard({ user, logout }) {
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [loading, setLoading] = useState(true)

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

  const loadPatientDetails = async (patientId) => {
    try {
      const response = await patientAPI.getOne(patientId)
      setSelectedPatient(response.data)
    } catch (error) {
      console.error('Failed to load patient details:', error)
    }
  }

  return (
    <div className="caretaker-dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <Link to="/" className="logo">
            <div className="logo-icon"><span>M</span></div>
            <span className="logo-text">MediLive</span>
          </Link>
        </div>
        <div className="nav-user">
          <span>{user?.firstName} {user?.lastName}</span>
          <button onClick={logout} className="btn btn-sm">Logout</button>
        </div>
      </nav>

      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>Caretaker Dashboard</h1>
          <p>Monitor your patient's health status</p>
        </div>

        {loading ? (
          <div className="loading">Loading patients...</div>
        ) : (
          <div className="patients-grid">
            {patients.length === 0 ? (
              <div className="empty-state">
                <h3>No patients assigned</h3>
                <p>Please contact a doctor to be assigned to a patient</p>
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
                    onClick={() => loadPatientDetails(patient.id)}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {selectedPatient && (
          <div className="modal-overlay" onClick={() => setSelectedPatient(null)}>
            <div className="modal-content patient-details" onClick={e => e.stopPropagation()}>
              <h2>{selectedPatient.name} - Health Status</h2>
              <div className="patient-full-info">
                <div className="info-section">
                  <h3>Patient Information</h3>
                  <p><strong>Age:</strong> {selectedPatient.age}</p>
                  <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                  <p><strong>Diagnosis:</strong> {selectedPatient.diagnosis}</p>
                  <p><strong>Admission Date:</strong> {selectedPatient.admissionDate ? new Date(selectedPatient.admissionDate).toLocaleDateString() : 'N/A'}</p>
                  <p><strong>Status:</strong> <span className={`status status-${selectedPatient.status?.toLowerCase()}`}>{selectedPatient.status}</span></p>
                </div>

                {selectedPatient.vitals && selectedPatient.vitals.length > 0 ? (
                  <div className="info-section">
                    <h3>Latest Vitals</h3>
                    {selectedPatient.vitals.slice(0, 5).map(vital => (
                      <div key={vital.id} className="vital-record">
                        <p className="vital-time">{new Date(vital.recordedAt).toLocaleString()}</p>
                        <div className="vital-details">
                          {vital.heartRate && <span>❤️ {vital.heartRate} bpm</span>}
                          {vital.bloodPressure && <span>🩺 {vital.bloodPressure}</span>}
                          {vital.temperature && <span>🌡️ {vital.temperature}°F</span>}
                          {vital.oxygenLevel && <span>💨 {vital.oxygenLevel}%</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="info-section">
                    <h3>Vitals</h3>
                    <p>No vitals recorded yet</p>
                  </div>
                )}
              </div>
              <div className="modal-actions">
                <button onClick={() => setSelectedPatient(null)} className="btn btn-primary">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CaretakerDashboard
