from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models import db, Board, Lists
from sqlalchemy.exc import SQLAlchemyError

lists_blueprint = Blueprint('lists', __name__)

@lists_blueprint.route('/boards/<int:board_id>/lists', methods=['POST'])
@login_required
def create_list(board_id):
    board = Board.query.get_or_404(board_id)
    if board.owner_id != current_user.id:
        return jsonify({'message': 'Only the board owner can add lists'}), 403
    
    data = request.json
    title = data.get('title')
    if not title:
        return jsonify({'message': 'List title is required'}), 400
    
    new_list = Lists(title=title, board_id=board_id)
    db.session.add(new_list)
    try:
        db.session.commit()
        return jsonify({'message': 'List created successfully', 'list_id': new_list.id}), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create list', 'error': str(e)}), 500
    
@lists_blueprint.route('/boards/<int:board_id>/lists', methods=['GET'])
@login_required
def get_lists(board_id):
    Board.query.get_or_404(board_id)
    lists = Lists.query.filter_by(board_id=board_id).order_by(Lists.position).all()
    lists_data = [{
        'id': list.id, 
        'title': list.title, 
        'position': list.position} 
        for list in lists]
    return jsonify(lists_data)
   
@lists_blueprint.route('/lists/<int:list_id>', methods=['GET','PUT', 'DELETE'])
@login_required
def list_operations(list_id):
    list = Lists.query.get_or_404(list_id)
    board = Board.query.get_or_404(list.board_id)

    if board.owner_id != current_user.id and not any(member.user_id == current_user.id for member in board.members):
        return jsonify({'message': 'Not authorized to view this list'}), 403

    if request.method=='GET':
        return jsonify({
            'id': list.id,
            'title': list.title,
            'position': list.position,
            'board_id': list.board_id
        })

    if request.method == 'PUT':
        data = request.json
        list.title = data.get('title', list.title)
        list.position = data.get('position', list.position)
        try:
            db.session.commit()
            return jsonify({'message': 'List updated successfully'}), 200
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'message': 'Failed to update list', 'error': str(e)}), 500

    elif request.method == 'DELETE':
        try:
            db.session.delete(list)
            db.session.commit()
            return jsonify({'message': 'List deleted successfully'}), 200
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'message': 'Failed to delete list', 'error': str(e)}), 500