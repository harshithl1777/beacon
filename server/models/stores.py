from ast import List
from email.policy import default
from datetime import datetime
from mongoengine.document import Document
from mongoengine.fields import EmbeddedDocumentField, DateTimeField, StringField, ListField

from server.models.stock import Stock
from server.models.line import Line
from server.models.review import Review


class Store(Document):
    meta = {'collection': 'stores'}
    id = StringField(primary_key=True, max_length=200)
    store_name = StringField(required=True)
    address = StringField(required=True)
    stock = EmbeddedDocumentField(Stock, required=True)
    line = EmbeddedDocumentField(Line, required=True)
    reviews = ListField(EmbeddedDocumentField(Review), default=[])
    last_updated = DateTimeField(default=datetime.utcnow())

