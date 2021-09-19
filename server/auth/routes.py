from flask import Blueprint, request
import os

from server.utils.decorators import create_response
from server.utils.helpers import create_jwt, check_jwt

auth = Blueprint('auth', __name__)

database = {
    'users': [
        {'userID': '143509', 'username': 'hackthesouth', 'password': '123htn456'},
        {'userID': '345345', 'username': 'hackthenorth', 'password': '456htn123'}
    ]
}
REFRESH_MAX_AGE = 5184000


@auth.route('/session', methods=['POST'])
def new_session():
    body = request.get_json()
    username, password = body.get('username'), body.get('password')
    matchingUser = list(filter(
        lambda user: user['username'] == username and user['password'] == password,
        database['users']
    ))
    if username is None or password is None:
        return create_response('Bad request', False, 400)
    elif len(matchingUser) == 0:
        return create_response('Invalid username or password', False, 401)
    user = matchingUser[0].copy()
    user.pop('password')
    access_token, refresh_token = create_jwt(
        user, 'ACCESS'), create_jwt(user, 'REFRESH')
    response = create_response(
        {'access_token': access_token}, code=201)
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
        return create_response('Bad request', False, 400)
    else:
        response = create_response(code=200)
        response.delete_cookie('refresh_token', path='/api/auth/session')
        return response
