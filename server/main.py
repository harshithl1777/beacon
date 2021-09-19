from flask import Flask
from dotenv import load_dotenv
from datetime import datetime
import os
if os.getenv('FLASK_ENV') == 'development':
    load_dotenv('./config/.env.development')

from server.users.routes import users
from server.auth.routes import auth

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
app.register_blueprint(users, url_prefix='/api/users')
app.register_blueprint(auth, url_prefix='/api/auth')


@ app.route('/health', methods=['GET'])
def get_health():
    return {
        "uptime": f'{os.times()[4]}s',
        "code": 200,
        'success': True,
        'date': datetime.utcnow(),
    }


@app.errorhandler(404)
def other_routes(error):
    return app.send_static_file('index.html')
