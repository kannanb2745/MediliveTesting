from models.database import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    user_type = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    patients_as_doctor = db.relationship('Patient', foreign_keys='Patient.doctor_id', backref='doctor', lazy=True)
    patients_as_caretaker = db.relationship('Patient', foreign_keys='Patient.caretaker_id', backref='caretaker', lazy=True)
