from flask import Blueprint, request
import json

from server.users.models import User
from server.auth.decorators import require_access_token
from server.utils.helpers.routes import create_response

users = Blueprint('users', __name__)


@users.route('/<string:user_id>', methods=['GET'])
@require_access_token
def get_user_by_id(user_id: str):
    matchingUser = json.loads(User.objects.get(id=user_id).to_json())
    return create_response(matchingUser)
