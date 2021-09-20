from datetime import datetime
from mongoengine.document import Document, EmbeddedDocument
from mongoengine.fields import DateTimeField, EmailField, StringField


class User(Document):
    meta = {'collection': 'users'}
    email = EmailField(required=True)
    password = StringField(max_length=200)
    auth_method = StringField(['EMAIL_PW', 'GOOGLE', 'FACEBOOK', 'GITHUB'])
    address = Geo
    join_date = DateTimeField(default=datetime.utcnow(), required=True)
