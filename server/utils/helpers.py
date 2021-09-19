from datetime import datetime, timedelta
from flask import make_response, Response
from typing import Union
import jwt
import os


def create_response(payload='OK', success: bool = True, code: int = 200) -> Response:
    body = {
        'payload': payload,
        'success': success,
    }
    return make_response(body, code)


def create_jwt(user: dict, type: str) -> str:
    payload = user.copy()
    if type == 'ACCESS':
        time_until_expiry = timedelta(seconds=10)
    else:
        time_until_expiry = timedelta(days=60)
    payload['exp'] = datetime.utcnow() + time_until_expiry
    token = jwt.encode(payload, os.getenv(f'{type}_TOKEN_SECRET'))
    return token


def check_jwt(token: str, type: str) -> Union[dict, bool]:
    try:
        secret = os.getenv(f'{type}_TOKEN_SECRET')
        return jwt.decode(token, secret, ['HS256'])
    except:
        return False
