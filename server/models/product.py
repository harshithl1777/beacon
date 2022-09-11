from datetime import datetime
from mongoengine import EmbeddedDocument
from mongoengine.fields import StringField, DateTimeField


class Product(EmbeddedDocument):
    name = StringField(required=True)
    stock = StringField(choices=["OUT_OF_STOCK", "LOW", "MODERATE", "HIGH"], required=True)
    demand = StringField(choices=["LOW", "MODERATE", "HIGH"], required=True)
    last_updated = DateTimeField(default=datetime.utcnow())
