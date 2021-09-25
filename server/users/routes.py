from flask import Blueprint
from mongoengine import connect, Document, StringField
import os
import json

from server.utils.decorators.auth import require_access_token
from server.utils.helpers.routes import create_response

users = Blueprint('users', __name__)
connect(host=os.getenv('DATABASE_URI'))


class User(Document):
    username = StringField(max_length=200, required=True)
    password = StringField(max_length=200, required=True)
    meta = {'collection': 'users'}


@users.route('/test', methods=['GET'])
@require_access_token
def get_users():
    return create_response(json.loads(User.objects[0].to_json()))
