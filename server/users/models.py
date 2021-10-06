from datetime import datetime
from mongoengine.document import Document
from mongoengine.fields import DateTimeField, EmailField, StringField


class User(Document):
    meta = {'collection': 'users'}
    email = EmailField(required=True)
    password = StringField(max_length=200, required=True)
    auth_method = StringField(
        choices=('EMAIL_PW', 'GOOGLE', 'FACEBOOK', 'GITHUB'), default='EMAIL_PW')
    join_date = DateTimeField(default=datetime.utcnow())
