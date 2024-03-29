from functools import wraps
from flask import request

from server.utils.helpers.auth import check_jwt
from server.utils.helpers.routes import create_response
from server.utils.types import Token


def require_access_token(method):
    @wraps(method)
    def check_access_token(*args, **kwargs):
        if not request.headers.get('Authorization'):
            return create_response('Bad request', False, 400)
        else:
            access_token = request.headers.get('Authorization').split(' ')[1]
            if not check_jwt(access_token, Token.ACCESS.value):
                return create_response('Invalid access token', False, 401)
            else:
                return method(*args, **kwargs)
    return check_access_token
