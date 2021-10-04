from flask import Blueprint, request
import json
import bcrypt

from server.users.models import User
from server.auth.decorators import require_access_token
from server.utils.helpers.routes import create_response

users = Blueprint('users', __name__)


@users.route('/', methods=['POST'])
def create_user():
    body = request.get_json()
    email, password = body.get('email'), body.get('password'),
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode(), salt).hex()
    newUser = User(email=email, password=hashed_password, salt=salt.hex())
    return create_response(payload=json.loads(newUser.to_json()), code=201)


@users.route('/<string:user_id>', methods=['GET'])
# @require_access_token
def get_user_by_id(user_id: str):
    matchingUser = User.objects.get(id=user_id).to_json()
    return create_response(json.loads(matchingUser))
