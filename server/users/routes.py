from flask import Blueprint

from server.utils.decorators import require_access_token

users = Blueprint('users', __name__)

@users.route('/test', methods=['GET'])
@require_access_token
def getUsers():
    return {
        "hello": "hello"
    }
