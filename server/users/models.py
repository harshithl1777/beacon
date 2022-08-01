from datetime import datetime
from mongoengine.document import Document
from mongoengine.fields import DateTimeField, EmailField, StringField


class User(Document):
    meta = {'collection': 'users'}
    id = StringField(primary_key=True, max_length=200)
    email = EmailField(required=True)
    password = StringField(max_length=200, default=None)
    auth_method = StringField(
        choices=('Credentials', 'Google', 'Facebook', 'Github'), default='Credentials')
    join_date = DateTimeField(default=datetime.utcnow())
