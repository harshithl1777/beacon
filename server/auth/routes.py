from flask import Blueprint, request
import os

from server.utils.helpers.routes import create_response
from server.utils.helpers.auth import create_jwt, check_jwt, validate_user

auth = Blueprint('auth', __name__)
REFRESH_MAX_AGE = 5184000


@auth.route('/session', methods=['POST'])
def new_session():
    body = request.get_json()
    email, password = body.get('email'), body.get('password')

    matchingUser, authorized = validate_user(email, password)
    if not authorized:
        return create_response('Invalid username or password', False, 401)
    else:
        user = matchingUser.copy()
        user.pop('password')
        access_token = create_jwt(user, 'ACCESS')
        refresh_token = create_jwt(user, 'REFRESH')

        # create and return access and refresh tokens
        response = create_response({'access_token': access_token}, code=201)
        response.set_cookie(
            'refresh_token',
            refresh_token,
            max_age=REFRESH_MAX_AGE,
            samesite='strict',
            httponly=True,
            path='/api/auth/session',
            secure=(True if os.getenv('FLASK_ENV')
                    == 'production' else False)
        )
        return response


@auth.route('/session', methods=['PUT'])
def refresh_session():
    refresh_token = request.cookies.get('refresh_token')
    if not refresh_token:
        return create_response('Bad request', False, 400)
    else:
        # if token exists, validate and return new access token
        decoded_token = check_jwt(refresh_token, 'REFRESH')
        if decoded_token:
            decoded_token.pop('exp')
            new_access_token = create_jwt(decoded_token, 'ACCESS')
            return create_response({'access_token': new_access_token})
        else:
            return create_response('Invalid refresh token', False, 401)


@auth.route('/session', methods=['DELETE'])
def delete_session():
    refresh_token = request.cookies.get('refresh_token')
    if not refresh_token:
        return create_response(request.cookies, False, 400)
    else:
        response = create_response(code=200)
        response.delete_cookie(
            'refresh_token', path='/api/auth/session', httponly=True, samesite='strict', secure=False)
        return response
