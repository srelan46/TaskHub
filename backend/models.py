from app import db,bcrypt
from flask_login import UserMixin
from sqlalchemy import func

class User(UserMixin,db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    last_login = db.Column(db.DateTime(timezone=True),server_default=func.now())
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    boards = db.relationship('BoardMember', backref='user')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    due_date = db.Column(db.DateTime(timezone=True))
    completed = db.Column(db.Boolean, default=False)
    position = db.Column(db.Integer)  #for ordering position in list
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationship to User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='tasks')

    # Relationship to List
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'))
    list = db.relationship('List', backref='tasks')

class Board(db.Model):
    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    #owner
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    owner = db.relationship('User', backref='owned_boards')
    #Members of the board
    members = db.relationship('BoardMember', backref='board')

class BoardMember(db.Model):
    __tablename__ = 'board_members'

    board_id = db.Column(db.Integer, db.ForeignKey('boards.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    role = db.Column(db.String(50))

class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    position = db.Column(db.Integer)
    board_id = db.Column(db.Integer, db.ForeignKey('boards.id'), nullable=False)
    board = db.relationship('Board', backref='lists')