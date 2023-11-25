from flask import request, jsonify
from app import app
from models import User, Task,db
@app.route("/tasks",methods=['POST'])
def tasks():
    if request.method =='POST':
        data = request.json
        title = data.get('title')
        username = data.get('username')
        description = data.get('description')
        due_date = data.get('due_date')
        
        if not title or not username:
            return jsonify({'message': 'Title, UserID and username are required'}), 400
        
        existing_user = User.query.filter((User.username == username)).first()
        
        if not existing_user:
            return jsonify({'message':'User doesn\'t exist'}),409
        
        new_task = Task(
            title=title,
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
    if request.method =='GET':
        return "<p> Tasks <p>"

@app.route("/alltasks",methods=['GET'])
def get_all_tasks():
    tasks=Task.query.all()
    tasks_list = [{
        'id': task.id,
        'title': task.title,
        'username': task.username,
        'description': task.description,
        'due_date': task.due_date.isoformat() if task.due_date else None,
        'completed': task.completed,
        'created_at': task.created_at.isoformat(),
        'updated_at': task.updated_at.isoformat() if task.updated_at else None
    } for task in tasks]

    return jsonify(tasks_list)

@app.route("/tasks/{id}",methods=['GET','Update','Delete'])
def tasks_id():
    return "<p> Get,Update Delete Specific task ID<\p>"


