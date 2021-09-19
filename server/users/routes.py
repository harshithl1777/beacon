from flask import Blueprint
import os

from server.utils.decorators import require_access_token

users = Blueprint('users', __name__)
# connection = Connection(host=os.getenv('DATABASE_URI'))


# @connection.register
# class User(Document):
#     __collection__ = 'users'
#     __database__ = os.getenv('DATABASE_NAME')
#     structure = {
#         'username': str,
#         'password': str
#     }
#     required_fields = ['username', 'password']


@users.route('/test', methods=['GET'])
def get_users():
    return 'goods'
