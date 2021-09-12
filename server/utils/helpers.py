from datetime import datetime, timedelta
from flask import make_response
import jwt
import os

def create_response(payload='OK', success=True, code=200):
    body = {
        'payload': payload,
        'success': success,
    }
    return make_response(body, code)

def create_jwt(user, type):
    payload = user.copy()
    if type == 'ACCESS':
        time_until_expiry = timedelta(seconds=10)
    else:
        time_until_expiry = timedelta(days=60)
    payload['exp'] = datetime.utcnow() + time_until_expiry
    token = jwt.encode(payload, os.getenv(f'{type}_TOKEN_SECRET'))
    return token

def check_jwt(token, type):
    try:
        secret = os.getenv(f'{type}_TOKEN_SECRET')
        return jwt.decode(token, secret, ['HS256'])
    except:
        return False
