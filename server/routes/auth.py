from flask import Blueprint, request
import os

from server.utils.helpers.routes import create_response
from server.utils.helpers.auth import create_jwt, check_jwt, validate_user, validate_social_login
from server.utils.types import Token

auth = Blueprint('auth', __name__)
REFRESH_MAX_AGE = 5184000


@auth.route('/session', methods=['GET'])
def get_session_status():
    refresh_token = request.cookies.get('refresh_token')
    if not refresh_token:
        return create_response('Unauthorized', False, 401)
    else:
        # if token exists, validate and return success
        decoded_token = check_jwt(refresh_token, Token.REFRESH.value)
        if decoded_token:
            return create_response()
        else:
            return create_response('Unauthorized', False, 401)


@auth.route('/session', methods=['POST'])
def new_session():
    body = request.get_json()
    email, password, social_token = body.get('email'), body.get('password'), body.get('social_token')

    matching_user, authorized = validate_social_login(
        email, social_token) if not password else validate_user(
        email, password)
    if not authorized:
        return create_response('Invalid username or password', False, 401)
    else:
        user = matching_user.copy()
        if password: user.pop('password')
        access_token = create_jwt(user, Token.ACCESS.value)
        refresh_token = create_jwt(user, Token.REFRESH.value)

        # create and return access and refresh tokens
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


@ auth.route('/session', methods=['PUT'])
def refresh_session():
    refresh_token = request.cookies.get('refresh_token')
    if not refresh_token:
        return create_response('Bad request', False, 400)
    else:
        # if token exists, validate and return new access token
        decoded_token = check_jwt(refresh_token, Token.REFRESH.value)
        if decoded_token:
            decoded_token.pop('exp')
            new_access_token = create_jwt(decoded_token, Token.ACCESS.value)
            return create_response({'access_token': new_access_token})
        else:
            return create_response('Invalid refresh token', False, 401)


@ auth.route('/session', methods=['DELETE'])
def delete_session():
    refresh_token = request.cookies.get('refresh_token')
    if not refresh_token:
        return create_response(request.cookies, False, 400)
    else:
        response = create_response(code=200)
        response.delete_cookie('refresh_token', path='/api/auth/session', httponly=True,
                               samesite=('None' if os.getenv('FLASK_ENV') == 'development' else 'Strict'), secure=True)
        return response
