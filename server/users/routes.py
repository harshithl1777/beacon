from flask import Blueprint

users_bp = Blueprint('users_bp', __name__)

@users_bp.route('/test')
def getUsers():
    return 'Yash Kapoor'
