from flask import Flask
from app import app

@app.route("/tasks", methods=['GET'])
def get_tasks():
    return "<p> Retuns Tasks! </p>"