from flask import Flask
from dotenv import load_dotenv
load_dotenv('./config/.env')

from users.routes import users
from auth.routes import auth

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
app.register_blueprint(users, url_prefix='/api/users')
app.register_blueprint(auth, url_prefix='/api/auth')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
