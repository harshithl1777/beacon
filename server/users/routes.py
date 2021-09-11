from flask import Blueprint, request

users_bp = Blueprint('users_bp', __name__)

@users_bp.route('/test', methods=['POST'])
def getUsers():
    print(request.headers.get('Authorization'))
    return {
        "hello": "hello"
    }
