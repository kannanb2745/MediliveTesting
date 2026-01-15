import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { patientAPI, userAPI } from '../utils/api'
import '../styles/staff-dashboard.css'

function StaffDashboard({ user, logout }) {
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [caretakers, setCaretakers] = useState([])
  const [showAddPatient, setShowAddPatient] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newPatient, setNewPatient] = useState({
    name: '', age: '', gender: 'male', diagnosis: '', doctorId: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [pRes, dRes, cRes] = await Promise.all([
        patientAPI.getAll(),
        userAPI.getByRole('doctor'),
        userAPI.getByRole('caretaker')
      ])
      setPatients(pRes.data)
      setDoctors(dRes.data)
      setCaretakers(cRes.data)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPatient = async (e) => {
    e.preventDefault()
    try {
      await patientAPI.create(newPatient)
      setShowAddPatient(false)
      loadData()
    } catch (error) { alert('Failed to add patient') }
  }

  const handleAssign = async (patientId, field, value) => {
    try {
      await patientAPI.update(patientId, { [field]: value })
      loadData()
    } catch (error) { alert('Failed to assign') }
  }

  const handleRemove = async (patientId) => {
    if (window.confirm('Are you sure you want to remove this patient?')) {
      try {
        await patientAPI.delete(patientId)
        loadData()
      } catch (error) { alert('Failed to remove patient') }
    }
  }

  return (
    <div className="staff-dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand"><Link to="/" className="logo">MediLive</Link></div>
        <div className="nav-user"><span>{user?.firstName} (Staff)</span><button onClick={logout}>Logout</button></div>
      </nav>
      <div className="dashboard-main">
        <div className="header">
          <h1>Staff Management</h1>
          <button onClick={() => setShowAddPatient(true)} className="btn-primary">+ Add Patient</button>
        </div>
        <div className="patients-grid">
          {patients.map(p => (
            <div key={p.id} className="patient-card">
              <h3>{p.name}</h3>
              <p>Status: <span className={`status-${p.status.toLowerCase()}`}>{p.status}</span></p>
              <div className="assignment-controls">
                <label>Doctor:</label>
                <select value={p.doctorId || ''} onChange={(e) => handleAssign(p.id, 'doctorId', e.target.value)}>
                  <option value="">Unassigned</option>
                  {doctors.map(d => <option key={d.id} value={d.id}>Dr. {d.firstName}</option>)}
                </select>
                <label>Caretaker:</label>
                <select value={p.caretakerId || ''} onChange={(e) => handleAssign(p.id, 'caretakerId', e.target.value)}>
                  <option value="">Unassigned</option>
                  {caretakers.map(c => <option key={c.id} value={c.id}>{c.firstName}</option>)}
                </select>
              </div>
              <div className="card-actions">
                <button onClick={() => handleAssign(p.id, 'status', 'Discharged')}>Discharge</button>
                <button onClick={() => handleRemove(p.id)} className="btn-danger">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showAddPatient && (
        <div className="modal">
          <form onSubmit={handleAddPatient}>
            <h2>Add Patient</h2>
            <input placeholder="Name" onChange={e => setNewPatient({...newPatient, name: e.target.value})} required />
            <input placeholder="Age" type="number" onChange={e => setNewPatient({...newPatient, age: e.target.value})} required />
            <select onChange={e => setNewPatient({...newPatient, doctorId: e.target.value})}>
              <option value="">Select Doctor</option>
              {doctors.map(d => <option key={d.id} value={d.id}>Dr. {d.firstName}</option>)}
            </select>
            <button type="submit">Create</button>
            <button type="button" onClick={() => setShowAddPatient(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  )
}
export default StaffDashboard
