from models.database import db
from datetime import datetime

class Patient(db.Model):
    __tablename__ = 'patients'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    diagnosis = db.Column(db.Text)
    admission_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='Active')
    doctor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    caretaker_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    vitals = db.relationship('PatientVitals', backref='patient', lazy=True, cascade='all, delete-orphan')

class PatientVitals(db.Model):
    __tablename__ = 'patient_vitals'
    
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    heart_rate = db.Column(db.Integer)
    blood_pressure = db.Column(db.String(20))
    temperature = db.Column(db.Float)
    oxygen_level = db.Column(db.Integer)
    recorded_at = db.Column(db.DateTime, default=datetime.utcnow)
