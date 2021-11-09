from datetime import datetime, timedelta
from typing import Union
from mongoengine.errors import DoesNotExist
from firebase_admin import auth
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
        matching_user = json.loads(User.objects.get(email=email).to_json())
        authorized = bcrypt.checkpw(
            password.encode(), bytes.fromhex(matching_user.get('password')))
        return matching_user, authorized
    except DoesNotExist:
        return {}, False


def validate_social_login(email: str, token: str) -> tuple[dict, bool]:
    try:
        result = auth.verify_id_token(token, check_revoked=True)
        matching_user = json.loads(User.objects.get(email=email).to_json())
        return matching_user, True
    except:
        return {}, False
