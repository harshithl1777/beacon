from flask import Flask, render_template
from users.routes import users_bp
import jwt

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
app.register_blueprint(users_bp, url_prefix='/api/users')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/users')
def usersRoute():
    return 'No users available right now'

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
