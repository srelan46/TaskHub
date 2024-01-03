# run.py or similar file
from app import create_app
from flask_cors import CORS
from waitress import serve

app = create_app()
CORS(app)

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5000)
