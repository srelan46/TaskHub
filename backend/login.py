from flask import Blueprint, request, jsonify, session
from flask_cors import CORS
from flask_login import login_user,logout_user, login_required
auth_blueprint = Blueprint('auth',__name__)

@auth_blueprint.route('/login', methods=['POST'])
def login():
    from models import User
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and Password are required'}), 400

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        login_user(user,remember=True)
        session['user_id'] = user.id
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@auth_blueprint.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message':'you have been logged out.'}),200

@auth_blueprint.route('/register',methods=['POST'])
def register():
    from models import User,db
    data=request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    first_name = data.get('first_name')
    last_name = data.get('last_name')

    if not username or not email or not password:
        return jsonify({'message': 'Username, email, and password are required'}), 400
    
    existing_user = User.query.filter(
        (User.username == username)|(User.email == email)
    ).first()
    if existing_user:
        return jsonify({'message':'User already exists'}),409
    
    new_user = User( 
        username = username, 
        email = email,
        first_name = first_name,
        last_name = last_name
    )
    new_user.set_password(password)
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message':'User Registered Successfully'}),201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message':'Registration failed','error':str(e)}),500