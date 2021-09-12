from functools import wraps
from flask import request

from utils.helpers import create_response

def require_access_token(method):
    @wraps(method)
    def check_access_token(*args, **kwargs):
        if not request.headers.get('Authorization'):
            return create_response('Bad request', False, 400)
        else:
            return method(*args, **kwargs)
    return check_access_token
