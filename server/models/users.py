from mongoengine.document import Document
from mongoengine.fields import EmailField, StringField


class User(Document):
    meta = {"collection": "users"}
    id = StringField(primary_key=True, max_length=200)
    email = EmailField(required=True)
    password = StringField(max_length=200, default=None)
    auth_method = StringField(
        choices=("CREDENTIALS", "GOOGLE", "FACEBOOK", "GITHUB"), default="CREDENTIALS"
    )