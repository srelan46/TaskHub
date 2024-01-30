from flask import Flask,Blueprint

hello = Blueprint('hello',__name__)
@hello.route("/tasks", methods=['GET'])
def get_tasks():
    return "<p> Retuns Tasks! </p>"