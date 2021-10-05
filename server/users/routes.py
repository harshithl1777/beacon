from flask import Blueprint, request
from mongoengine.errors import DoesNotExist, ValidationError
import json
import bcrypt

from server.users.models import User
from server.auth.decorators import require_access_token
from server.utils.helpers.routes import create_response

users = Blueprint('users', __name__)


@users.route('/', methods=['POST'])
def create_user():
    body = request.get_json()
    email, password = body.get('email'), body.get('password')
    if (len(User.objects(email=email)) == 0):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode(), salt).hex()
        newUser = User(email=email, password=hashed_password)
        newUser.save()
        return create_response(payload=json.loads(newUser.to_json()), code=201)
    else:
        return create_response('Resource already exists', False, 409)


@users.route('/<string:user_id>', methods=['GET'])
@require_access_token
def get_user_by_id(user_id: str):
    try:
        matchingUser = User.objects.get(id=user_id).to_json()
        return create_response(json.loads(matchingUser))
    except ValidationError:
        return create_response('Invalid user ID', False, 400)
    except DoesNotExist:
        return create_response('User not found', False, 404)


@users.route('/<string:user_id>', methods=['DELETE'])
@require_access_token
def delete_user_by_id(user_id: str):
    try:
        matchingUser = User.objects.get(id=user_id)
        matchingUser.delete()
        return create_response()
    except ValidationError:
        return create_response('Invalid user ID', False, 400)
    except DoesNotExist:
        return create_response('User not found', False, 404)
