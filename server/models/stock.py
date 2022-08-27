from datetime import datetime
from mongoengine import EmbeddedDocument
from mongoengine.fields import EmbeddedDocumentField, StringField, DateTimeField

class Product(EmbeddedDocument):
    product_name = StringField(required=True)
    stock_level = StringField(choices=['OUT_OF_STOCK', 'LOW_STOCK', 'MODERATE_STOCK', 'HIGH_STOCK'], null=True)
    demand_level = StringField(choices=['HIGH_DEMAND', 'REGULAR_DEMAND', 'LOW_DEMAND'], null=True)
    last_updated = DateTimeField(default=datetime.utcnow())

class Stock(EmbeddedDocument):
    eggs = EmbeddedDocumentField(Product, default=Product(product_name='eggs'))
    milk = EmbeddedDocumentField(Product, default=Product(product_name='milk'))
    bread = EmbeddedDocumentField(Product, default=Product(product_name='bread'))
    bagel = EmbeddedDocumentField(Product, default=Product(product_name='bagel'))
    rice = EmbeddedDocumentField(Product, default=Product(product_name='rice'))
    onions = EmbeddedDocumentField(Product, default=Product(product_name='onions'))
    potatoes = EmbeddedDocumentField(Product, default=Product(product_name='potatoes'))
    apples = EmbeddedDocumentField(Product, default=Product(product_name='apples'))
    chicken = EmbeddedDocumentField(Product, default=Product(product_name='chicken'))
    fish = EmbeddedDocumentField(Product, default=Product(product_name='fish'))
    beef = EmbeddedDocumentField(Product, default=Product(product_name='beef'))
    pork = EmbeddedDocumentField(Product, default=Product(product_name='pork'))
    pasta = EmbeddedDocumentField(Product, default=Product(product_name='pasta'))
    soup =  EmbeddedDocumentField(Product, default=Product(product_name='soup'))
    pizza = EmbeddedDocumentField(Product, default=Product(product_name='pizza'))
    noodles = EmbeddedDocumentField(Product, default=Product(product_name='noodes'))