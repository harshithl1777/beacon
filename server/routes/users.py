from flask import Blueprint, request
from mongoengine.errors import DoesNotExist, ValidationError
import json
import bcrypt
import secrets
import os

from server.models.users import User
from server.utils.decorators import require_access_token
from server.utils.helpers.auth import create_jwt, validate_social_signup
from server.utils.helpers.routes import create_response

users = Blueprint('users', __name__)
REFRESH_MAX_AGE = 5184000


@users.route('/', methods=['POST'])
def create_user():
    body = request.get_json()
    email, auth_method = body.get('email'), body.get('method')
    if (len(User.objects(email=email)) != 0):
        return create_response('Resource already exists', False, 409)
    elif not auth_method:
        return create_response('Bad request', False, 400)
    else:
        if auth_method == 'CREDENTIALS':
            password = body.get('password')
            salt = bcrypt.gensalt()
            hashed_password = bcrypt.hashpw(password.encode(), salt).hex()
            newUser = User(id=secrets.token_hex(12), email=email,
                           password=hashed_password, auth_method=auth_method)
        else:
            social_token = body.get('socialToken')
            authorized = validate_social_signup(email, social_token)

            if not authorized:
                return create_response('Unauthorized', False, 401)

            newUser = User(id=secrets.token_hex(12), email=email, auth_method=auth_method)

        newUser.save()
        user = json.loads(newUser.to_json())
        if 'password' in user:
            user.pop('password')
        access_token = create_jwt(user, 'ACCESS')
        refresh_token = create_jwt(user, 'REFRESH')

        payload = user.copy()
        payload['access_token'] = access_token
        response = create_response(payload, code=201)
        response.set_cookie(
            'refresh_token',
            refresh_token,
            max_age=REFRESH_MAX_AGE,
            samesite=('None' if os.getenv('FLASK_ENV') == 'development' else 'Strict'),
            httponly=True,
            path='/api/auth/session',
            secure=True,
        )
        return response


@ users.route('/<string:user_id>', methods=['GET'])
@ require_access_token
def get_user_by_id(user_id: str):
    try:
        matchingUser = User.objects.get(id=user_id).to_json()
        return create_response(json.loads(matchingUser))
    except ValidationError:
        return create_response('Invalid user ID', False, 400)
    except DoesNotExist:
        return create_response('User not found', False, 404)


@ users.route('/<string:user_id>', methods=['DELETE'])
@ require_access_token
def delete_user_by_id(user_id: str):
    try:
        matchingUser = User.objects.get(id=user_id)
        matchingUser.delete()
        return create_response()
    except ValidationError:
        return create_response('Invalid user ID', False, 400)
    except DoesNotExist:
        return create_response('User not found', False, 404)
