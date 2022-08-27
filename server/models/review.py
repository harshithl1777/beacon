import datetime
from mongoengine import EmbeddedDocument
from mongoengine.fields import StringField, IntField, DateTimeField

class Review(EmbeddedDocument):
    overall = IntField(min_value=0, max_value=5, required=True)
    cleanliness = IntField(min_value=0, max_value=5, null=True)
    customer_service = IntField(min_value=0, max_value=5, null=True)
    safety_measures = IntField(min_value=0, max_value=5, null=True)
    comments = StringField(max_length=500, null=True)
    created_at = DateTimeField(default=datetime.utcnow())