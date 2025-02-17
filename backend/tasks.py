from flask import Flask, request, jsonify,Blueprint
from models import User,Task,db
from flask_login import login_required,current_user

tasks_blueprint = Blueprint('tasks',__name__)

@tasks_blueprint.route("/tasks",methods=['POST'])
def tasks():
    if request.method =='POST':
        data = request.json
        title = data.get('title')
        user_id = data.get('user_id')
        description = data.get('description')
        due_date = data.get('due_date')
        list_id = data.get('list_id')
        
        if not title or not user_id:
            return jsonify({'message': 'Title, UserID and username are required'}), 400
        
        existing_user = User.query.filter((User.id == user_id)).first()
        
        if not existing_user:
            return jsonify({'message':'User doesn\'t exist'}),409
        
        new_task = Task(
            title=title,
            user_id=user_id,
            description=description,
            due_date=due_date,
            list_id = list_id
            )

        db.session.add(new_task)
        try:
            db.session.commit()
            return jsonify({'message':'Task Added Successfully'}),201
        except Exception as e:
            db.session.rollback()
            return jsonify({'message':'Failed to add Task','error':str(e)}),500

@tasks_blueprint.route("/alltasks",methods=['GET'])
def get_all_tasks():
    tasks=Task.query.all()
    tasks_list = [{
        'id': task.id,
        'title': task.title,
        'user_id': task.user_id,
        'description': task.description,
        'due_date': task.due_date.isoformat() if task.due_date else None,
        'completed': task.completed,
        'created_at': task.created_at.isoformat(),
        'updated_at': task.updated_at.isoformat() if task.updated_at else None,
        'list_id': task.list_id
    } for task in tasks]

    return jsonify(tasks_list)

@tasks_blueprint.route("/tasks/<int:id>",methods=['GET','PUT','DELETE'])
@login_required
def tasks_id(id):
    task=Task.query.get(id)
    if not tasks:
        return jsonify({'message':'Failed to find task'}),404
    if request.method=='GET':
        return jsonify({
            'id':task.id,
            'title': task.title,
            'user_id': task.user_id,
            'description': task.description,
            'due_date': task.due_date.isoformat() if task.due_date else None,
            'completed': task.completed,
            'created_at': task.created_at.isoformat(),
            'updated_at': task.updated_at.isoformat() if task.updated_at else None,
            'list_id':task.list_id
        })
    if request.method=='PUT':
        if task.user_id != current_user.id:
            return jsonify({'message':'User not authorized'}),404
        else:
            data = request.json
            task.title = data.get('title',task.title)
            task.user_id = data.get('user_id',task.user_id)
            task.description = data.get('description',task.description)
            task.due_date = data.get('due_date',task.due_date)
            task.list_id = data.get('list_id',task.list_id)
            try:
                db.session.commit()
                return jsonify({'message':'Task Updated Successfully'}),200
            except Exception as e:
                db.session.rollback()
                return jsonify({'message':'Update Failed','error':str(e)}),500
    if request.method=='DELETE':
        if task.user_id != current_user.id:
            return jsonify({'message':'User not authorized'}),404
        else:
            try:
                db.session.delete(task)
                db.session.commit()
                return jsonify({'message':'Task Updated Successfully'}),200
            except Exception as e:
                db.session.rollback()
                return jsonify({'message':'Update Failed','error':str(e)}),500