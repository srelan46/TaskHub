# app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = (f"postgresql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}"
    f"@{os.getenv('DB_HOST')}:5432/{os.getenv('DB_NAME')}")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)    
bcrypt = Bcrypt(app)

from login import *
from user import *
from hello import *

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