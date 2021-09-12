from flask import Blueprint, request
import jwt
import os

from utils.decorators import create_response

auth = Blueprint('auth', __name__)

database = {
    'users': [
        {'userID': '143509', 'username': 'hackthesouth', 'password': '123htn456'},
        {'userID': '345345', 'username': 'hackthenorth', 'password': '456htn123'}
    ]
}

@auth.route('/session', methods=['POST'])
def new_session():
    body = request.get_json()
    username, password = body.get('username'), body.get('password')
    matchingUser = list(filter(
        lambda user: user['username'] == username and user['password'] == password,
        database['users']
    ))
    if len(matchingUser) == 0:
        return create_response('Invalid username or password', False, 401)
    else:
        matchingUser[0].pop('password')
        token_payload = matchingUser[0]
        access_token = jwt.encode(token_payload, os.getenv('ACCESS_TOKEN_SECRET'))
