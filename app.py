# app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    load_dotenv()

    app.config['SQLALCHEMY_DATABASE_URI'] = (f"postgresql://{os.getenv('DB_USERNAME')}:"
                                             f"{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:"
                                             f"5432/{os.getenv('DB_NAME')}")
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default-secret-key')

    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    migrate = Migrate(app, db)

    from login import auth_blueprint
    app.register_blueprint(auth_blueprint)

    @login_manager.user_loader
    def load_user(user_id):
        from user import User
        return User.query.get(int(user_id))

    return app