from flask import request, jsonify
from app import app
from models import User, Task,db
@app.route("/tasks",methods=['POST'])
def tasks():
    if request.method =='POST':
        data = request.json
        create_task(data)
    if request.method == 'GET':
        get_task()

def create_task(data):
    title = data.get('title')
    user_id = data.get('user_id')
    username = data.get('username')
    description = data.get('description')
    due_date = data.get('due_date')
    
    if not title or not user_id or not username:
        return jsonify({'message': 'Title, UserID and username are required'}), 400
    
    existing_user = User.query.filter(
        (User.username == username)|(User.id == user_id)
    ).first()
    
    if not existing_user:
        return jsonify({'message':'User doesn\'t exist'}),409
    
    new_task = Task(
        title=title,
        user_id=user_id,
        username=username,
        description=description,
        due_date=due_date,
        )
    
    db.session.add(new_task)
    try:
        db.session.commit()
        return jsonify({'message':'Task Added Successfully'}),201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message':'Failed to add Task','error':str(e)}),500

def get_task():
    return None


