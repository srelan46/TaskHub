from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models import db, Board, BoardMember, User
from sqlalchemy.exc import SQLAlchemyError

board_member_blueprint = Blueprint('board_member', __name__)

@board_member_blueprint.route('/boards/<int:board_id>/members', methods=['POST'])
@login_required
def add_member_to_board(board_id):
    board = Board.query.get_or_404(board_id)
    if board.owner_id != current_user.id:
        return jsonify({'message': 'Only the board owner can add members'}), 403

    data = request.json
    user_id = data.get('user_id')
    role = data.get('role')

    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    existing_member = BoardMember.query.filter_by(board_id=board_id, user_id=user_id).first()
    if existing_member:
        return jsonify({'message': 'User is already a member of the board'}), 409

    new_member = BoardMember(board_id=board_id, user_id=user_id, role=role)
    db.session.add(new_member)
    try:
        db.session.commit()
        return jsonify({'message': 'Member added successfully'}), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to add member', 'error': str(e)}), 500

@board_member_blueprint.route('/boards/<int:board_id>/members', methods=['GET'])
@login_required
def get_board_members(board_id):
    board = Board.query.get_or_404(board_id)
    if board.owner_id != current_user.id and not any(member.user_id == current_user.id for member in board.members):
        return jsonify({'message': 'Not authorized to view members of this board'}), 403

    members = board.members
    members_list = [{
        'user_id': member.user.id,
        'username': member.user.username,
        'role': member.role
    } for member in members]

    return jsonify(members_list)

@board_member_blueprint.route('/boards/<int:board_id>/members/<int:user_id>', methods=['DELETE'])
@login_required
def remove_member_from_board(board_id, user_id):
    board = Board.query.get_or_404(board_id)
    if board.owner_id != current_user.id:
        return jsonify({'message': 'Only the board owner can remove members'}), 403

    member = BoardMember.query.filter_by(board_id=board_id, user_id=user_id).first()
    if not member:
        return jsonify({'message': 'Member not found'}), 404

    db.session.delete(member)
    try:
        db.session.commit()
        return jsonify({'message': 'Member removed successfully'}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to remove member', 'error': str(e)}), 500
