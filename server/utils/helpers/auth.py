from datetime import datetime, timedelta
from typing import Union
from mongoengine.errors import DoesNotExist
import jwt
import os
import json
import bcrypt

from server.users.models import User


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


def validate_user(email: str, password: str) -> tuple[dict, bool]:
    try:
        matchingUser = json.loads(User.objects.get(email=email).to_json())
        authorized = bcrypt.checkpw(
            password.encode(), bytes.fromhex(matchingUser.get('password')))
        return matchingUser, authorized
    except DoesNotExist:
        return {}, False
