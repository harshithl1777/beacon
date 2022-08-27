import datetime
from mongoengine import EmbeddedDocument
from mongoengine.fields import StringField, DateTimeField

class Line(EmbeddedDocument):
    length = StringField(choices=['NO_LINE', 'LESS_THAN_15', '15_TO_30', '30_TO_50', 'MORE_THAN_50'], null=True)
    speed = StringField(choices=['MOVING_SLOW', 'MOVING_WELL', 'MOVING_FAST'], null=True)
    wait_time = StringField(choices=['NO_WAIT', '5_TO_10', '10_TO_20', '20_TO_40', '40_TO_60', 'MORE_THAN_60'], null=True)
    last_updated = DateTimeField(default=datetime.utcnow())

