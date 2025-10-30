from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from models.database import db, init_db
from models.user import User
from models.patient import Patient, PatientVitals
import bcrypt
from datetime import timedelta
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get(
    'SESSION_SECRET', 'dev-secret-key-change-in-production')
app.config['JWT_SECRET_KEY'] = os.environ.get(
    'SESSION_SECRET', 'dev-jwt-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///medilive.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
jwt = JWTManager(app)

db.init_app(app)

with app.app_context():
    init_db()


@app.route('/api/auth/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()

        if not data or not all(k in data for k in ['email', 'password', 'firstName', 'lastName', 'userType']):
            return jsonify({'error': 'Missing required fields'}), 400

        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already registered'}), 400

        hashed_password = bcrypt.hashpw(
            data['password'].encode('utf-8'), bcrypt.gensalt())

        new_user = User(
            email=data['email'],
            password=hashed_password.decode('utf-8'),
            first_name=data['firstName'],
            last_name=data['lastName'],
            user_type=data['userType']
        )

        db.session.add(new_user)
        db.session.commit()

        # access_token = create_access_token(identity={
        # 'id': new_user.id,
        # 'email': new_user.email,
        #     # 'user_type': new_user.user_type
        # })

        access_token = create_access_token(
            identity=str(new_user.id),  # must be string or int only
            additional_claims={
                'email': new_user.email,
                'user_type': new_user.user_type
            })

        return jsonify({
            'message': 'User created successfully',
            'access_token': access_token,
            'user': {
                'id': new_user.id,
                'email': new_user.email,
                'firstName': new_user.first_name,
                'lastName': new_user.last_name,
                'userType': new_user.user_type
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data or not all(k in data for k in ['email', 'password']):
            return jsonify({'error': 'Missing email or password'}), 400

        user = User.query.filter_by(email=data['email']).first()

        if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
            return jsonify({'error': 'Invalid email or password'}), 401

        # access_token= create_access_token(identity={
            # 'id': user.id,
            # 'email': user.email,
            # 'user_type': user.user_type
        # })
        access_token = create_access_token(
            identity=str(user.id),  # must be string or int only
            additional_claims={
                'email': user.email,
                'user_type': user.user_type
            })

        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'firstName': user.first_name,
                'lastName': user.last_name,
                'userType': user.user_type
            }
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user = get_jwt_identity()
    return jsonify(current_user), 200


@app.route('/api/patients', methods=['GET'])
@jwt_required()
def get_patients():
    try:
        # current_user = get_jwt_identity()
        current_user_id = get_jwt_identity()
        claims = get_jwt()
        current_user = {
            'id': current_user_id,
            'email': claims.get('email'),
            'user_type': claims.get('user_type')
        }

        if current_user['user_type'] == 'doctor':
            patients = Patient.query.filter_by(
                doctor_id=current_user['id']).all()
        elif current_user['user_type'] == 'caretaker':
            patients = Patient.query.filter_by(
                caretaker_id=current_user['id']).all()
        else:
            patients = Patient.query.all()

        return jsonify([{
            'id': p.id,
            'name': p.name,
            'age': p.age,
            'gender': p.gender,
            'diagnosis': p.diagnosis,
            'admissionDate': p.admission_date.isoformat() if p.admission_date else None,
            'status': p.status
        } for p in patients]), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/patients', methods=['POST'])
@jwt_required()
def create_patient():
    try:
        # current_user = get_jwt_identity()
        current_user_id = get_jwt_identity()
        claims = get_jwt()
        current_user = {
            'id': current_user_id,
            'email': claims.get('email'),
            'user_type': claims.get('user_type')
        }
        # print(current_user)
        print("Creating patient record")
        print(current_user)
        # print("User type:", current_user['user_type'])
        if current_user['user_type'] != 'doctor':
            return jsonify({'error': 'Only doctors can create patient records'}), 403

        data = request.get_json()

        new_patient = Patient(
            name=data.get('name'),
            age=data.get('age'),
            gender=data.get('gender'),
            diagnosis=data.get('diagnosis'),
            status=data.get('status', 'Active'),
            doctor_id=current_user['id']
        )

        db.session.add(new_patient)
        db.session.commit()

        return jsonify({
            'message': 'Patient created successfully',
            'patient': {
                'id': new_patient.id,
                'name': new_patient.name,
                'age': new_patient.age,
                'gender': new_patient.gender,
                'diagnosis': new_patient.diagnosis,
                'status': new_patient.status
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/patients/<int:patient_id>', methods=['GET'])
@jwt_required()
def get_patient(patient_id):
    try:
        patient = Patient.query.get_or_404(patient_id)
        vitals = PatientVitals.query.filter_by(patient_id=patient_id).order_by(
            PatientVitals.recorded_at.desc()).all()

        return jsonify({
            'id': patient.id,
            'name': patient.name,
            'age': patient.age,
            'gender': patient.gender,
            'diagnosis': patient.diagnosis,
            'admissionDate': patient.admission_date.isoformat() if patient.admission_date else None,
            'status': patient.status,
            'vitals': [{
                'id': v.id,
                'heartRate': v.heart_rate,
                'bloodPressure': v.blood_pressure,
                'temperature': v.temperature,
                'oxygenLevel': v.oxygen_level,
                'recordedAt': v.recorded_at.isoformat()
            } for v in vitals]
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/patients/<int:patient_id>/vitals', methods=['POST'])
@jwt_required()
def add_vitals(patient_id):
    try:
        # current_user = get_jwt_identity()
        current_user_id = get_jwt_identity()
        claims = get_jwt()
        current_user = {
            'id': current_user_id,
            'email': claims.get('email'),
            'user_type': claims.get('user_type')
        }

        if current_user['user_type'] != 'doctor':
            return jsonify({'error': 'Only doctors can add vitals'}), 403

        patient = Patient.query.get_or_404(patient_id)
        data = request.get_json()

        new_vitals = PatientVitals(
            patient_id=patient_id,
            heart_rate=data.get('heartRate'),
            blood_pressure=data.get('bloodPressure'),
            temperature=data.get('temperature'),
            oxygen_level=data.get('oxygenLevel')
        )

        db.session.add(new_vitals)
        db.session.commit()

        return jsonify({
            'message': 'Vitals added successfully',
            'vitals': {
                'id': new_vitals.id,
                'heartRate': new_vitals.heart_rate,
                'bloodPressure': new_vitals.blood_pressure,
                'temperature': new_vitals.temperature,
                'oxygenLevel': new_vitals.oxygen_level,
                'recordedAt': new_vitals.recorded_at.isoformat()
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/patients/<int:patient_id>/assign-caretaker', methods=['POST'])
@jwt_required()
def assign_caretaker(patient_id):
    try:
        # current_user = get_jwt_identity()
        current_user_id = get_jwt_identity()
        claims = get_jwt()
        current_user = {
            'id': current_user_id,
            'email': claims.get('email'),
            'user_type': claims.get('user_type')
        }

        if current_user['user_type'] != 'doctor':
            return jsonify({'error': 'Only doctors can assign caretakers'}), 403

        patient = Patient.query.get_or_404(patient_id)
        data = request.get_json()

        caretaker_email = data.get('caretakerEmail')
        caretaker = User.query.filter_by(
            email=caretaker_email, user_type='caretaker').first()

        if not caretaker:
            return jsonify({'error': 'Caretaker not found'}), 404

        patient.caretaker_id = caretaker.id
        db.session.commit()

        return jsonify({'message': 'Caretaker assigned successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
