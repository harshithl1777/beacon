from flask import Flask
from dotenv import load_dotenv
from datetime import datetime
from mongoengine import connect
import os
import firebase_admin
import flask_cors

if os.getenv("FLASK_ENV") == "development":
    load_dotenv("./config/.env.development")

from server.routes.users import users
from server.routes.auth import auth
from server.routes.stores import stores


def create_app() -> Flask:
    app = Flask(__name__, static_folder="../client/build", static_url_path="/")
    app.url_map.strict_slashes = False
    app.register_blueprint(users, url_prefix="/api/users")
    app.register_blueprint(auth, url_prefix="/api/auth")
    app.register_blueprint(stores, url_prefix="/api/stores")
    return app


app = create_app()
if os.getenv("FLASK_ENV") == "development":
    flask_cors.CORS(app, supports_credentials=True)
connect(host=os.getenv("DATABASE_URI"))
firebase_admin.initialize_app()


@app.route("/api/health", methods=["GET"])
def get_health():
    return {
        "uptime": f"{os.times()[4]}s",
        "code": 200,
        "success": True,
        "date": datetime.utcnow(),
    }


@app.errorhandler(404)
def other_routes(error):
    return app.send_static_file("index.html")
