from flask import Flask
import os
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()

@app.route("/hello", methods=['GET'])
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/tasks", methods=['GET'])
def get_tasks():
    return "<p> Retuns Tasks! </p>"