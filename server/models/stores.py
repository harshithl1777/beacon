from datetime import datetime
import json
from mongoengine.document import Document
from mongoengine.fields import (
    EmbeddedDocumentField,
    DateTimeField,
    StringField,
    ListField,
    PointField,
    MapField,
    FloatField,
)

from server.models.product import Product
from server.models.line import Line
from server.models.review import Review


class Store(Document):
    meta = {"collection": "stores"}
    id = StringField(primary_key=True, max_length=200)
    name = StringField(required=True)
    address = StringField(required=True)
    coordinates = PointField(required=True, unique=True)
    products = MapField(EmbeddedDocumentField(Product), default={})
    line = EmbeddedDocumentField(Line, null=True)
    rating = FloatField(min_value=1.0, null=True)
    reviews = ListField(EmbeddedDocumentField(Review), default=[])
    last_updated = DateTimeField(default=datetime.utcnow())
