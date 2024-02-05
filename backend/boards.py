from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models import Board, db
from sqlalchemy.exc import SQLAlchemyError

boards_blueprint = Blueprint('boards', __name__)

@boards_blueprint.route("/boards", methods=['POST'])
@login_required
def create_board():
    data = request.json
    name = data.get('name')
    description = data.get('description')

    if not name:
        return jsonify({'message': 'Board name is required'}), 400

    new_board = Board(
        name=name,
        description=description,
        owner_id=current_user.id
    )

    db.session.add(new_board)
    try:
        db.session.commit()
        return jsonify({'message': 'Board created successfully'}), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create board', 'error': str(e)}), 500

@boards_blueprint.route("/boards", methods=['GET'])
@login_required
def get_boards():
    owned_boards = current_user.owned_boards
    member_boards = Board.query.join(BoardMember).filter(BoardMember.user_id == current_user.id).all()

    owned_boards_list = [{
        'id': board.id,
        'name': board.name,
        'description': board.description,
        'created_at': board.created_at.isoformat(),
        'role': 'owner'
    } for board in owned_boards]

    member_boards_list = [{
        'id': board.id,
        'name': board.name,
        'description': board.description,
        'created_at': board.created_at.isoformat(),
        'role': 'member'
    } for board in member_boards]

    return jsonify(owned_boards_list + member_boards_list)


@boards_blueprint.route("/boards/<int:id>", methods=['GET', 'PUT', 'DELETE'])
@login_required
def board_operations(id):
    board = Board.query.get_or_404(id)

    if board.owner_id != current_user.id and not any(member.user_id == current_user.id for member in board.members):
        return jsonify({'message': 'Not authorized to access this board'}), 403
    
    if request.method == 'GET':
        return jsonify({
            'id': board.id,
            'name': board.name,
            'description': board.description,
            'created_at': board.created_at.isoformat()
        })

    if request.method == 'PUT':
        data = request.json
        board.name = data.get('name', board.name)
        board.description = data.get('description', board.description)
        try:
            db.session.commit()
            return jsonify({'message': 'Board updated successfully'}), 200
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'message': 'Update failed', 'error': str(e)}), 500

    if request.method == 'DELETE':
        try:
            db.session.delete(board)
            db.session.commit()
            return jsonify({'message': 'Board deleted successfully'}), 200
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'message': 'Delete failed', 'error': str(e)}), 500
