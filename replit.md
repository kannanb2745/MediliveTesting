# MediLive - Healthcare Platform

## Overview
MediLive is a full-stack healthcare platform for patient log tracking and healthcare analysis. It enables doctors to manage patient records and allows caretakers/family members to monitor patient health status in real-time.

**Current State**: MVP completed with authentication, patient management, and dashboards for doctors and caretakers.

## Recent Changes (October 30, 2025)
- Built complete React + Flask application from scratch
- Converted all HTML templates from original MediLive GitHub repo to React components
- Implemented JWT-based authentication with role-based access control
- Created doctor dashboard for patient data entry and vitals tracking
- Created caretaker dashboard for viewing assigned patient information
- Set up SQLite database with User, Patient, and PatientVitals models
- Configured workflows for both frontend (port 5000) and backend (port 8000)

## Project Architecture

### Frontend (React + Vite)
- **Technology**: React 18, Vite, React Router, Axios
- **Port**: 5000 (exposed for web preview)
- **Pages**: Index, Login, Signup, Dashboard (role-based), AI Services
- **Styling**: Pure CSS matching original HTML designs exactly

### Backend (Python Flask)
- **Technology**: Flask, SQLAlchemy, JWT, Bcrypt
- **Port**: 8000 (internal)
- **Database**: SQLite (medilive.db)
- **Authentication**: JWT tokens with 24-hour expiration

## User Roles
1. **Doctor** - Create/update patient records, add vitals, assign caretakers
2. **Caretaker** - View assigned patients' health data and vitals
3. **Patient** - (Future) View own medical records
4. **Hospital Staff** - (Future) Administrative functions

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/auth/me` - Get current user info (protected)

### Patients
- `GET /api/patients` - List patients (filtered by role)
- `POST /api/patients` - Create patient (doctor only)
- `GET /api/patients/:id` - Get patient details with vitals
- `POST /api/patients/:id/vitals` - Add vitals (doctor only)
- `POST /api/patients/:id/assign-caretaker` - Assign caretaker (doctor only)

## Database Schema

### Users
- id, email, password (hashed), first_name, last_name, user_type, created_at

### Patients
- id, name, age, gender, diagnosis, admission_date, status, doctor_id, caretaker_id

### PatientVitals
- id, patient_id, heart_rate, blood_pressure, temperature, oxygen_level, recorded_at

## User Preferences
- **Styling**: Exact conversion from original HTML/CSS - no new designs
- **Stack**: React frontend + Flask backend only (no Java Spring Boot)
- **Simplicity**: SQLite database, no Docker/containerization

## How to Use

### As a Doctor
1. Sign up with "Doctor" account type
2. Login to access doctor dashboard
3. Add new patients with diagnosis information
4. Record patient vitals (heart rate, blood pressure, temperature, oxygen levels)
5. Assign caretakers to patients via email

### As a Caretaker
1. Sign up with "Caretaker" account type
2. Login to access caretaker dashboard
3. View assigned patients
4. Monitor patient vitals and health status

## Next Phase Features
- Real-time WebSocket updates for live patient status
- Medical document upload (reports, prescriptions, X-rays)
- Automated discharge summary generation with PDF export
- AI chatbot with actual NLP capabilities
- Patient appointment scheduling
- Notification system for critical health alerts
- Analytics dashboard with health trends

## Development Notes
- Frontend and backend run as separate workflows
- API communication uses dynamic URL detection for Replit environment
- CORS enabled for cross-origin requests
- JWT tokens stored in localStorage
- All original HTML/CSS designs preserved exactly
