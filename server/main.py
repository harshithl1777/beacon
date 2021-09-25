from flask import Flask
from dotenv import load_dotenv
from datetime import datetime
from mongoengine import connect
import os
if os.getenv('FLASK_ENV') == 'development':
    load_dotenv('./config/.env.development')

from server.users.routes import users
from server.auth.routes import auth


def create_app() -> Flask:
    app = Flask(__name__, static_folder='../client/build', static_url_path='/')
    app.register_blueprint(users, url_prefix='/api/users')
    app.register_blueprint(auth, url_prefix='/api/auth')
    return app


app = create_app()
connect(host=os.getenv('DATABASE_URI'))


@app.route('/api/health', methods=['GET'])
def get_health():
    return {
        "uptime": f'{os.times()[4]}s',
        "code": 200,
        'success': True,
        'date': datetime.utcnow(),
    }


@app.errorhandler(404)
def other_routes(error):
    if (os.getenv('FLASK_ENV') == 'development'):
        return 'URL Not Found', 404
    else:
        return app.send_static_file('index.html')
