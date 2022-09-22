import secrets
import json
import hashlib
from datetime import datetime
from flask import Blueprint, request
from mongoengine.errors import DoesNotExist, ValidationError

from server.utils.helpers.routes import create_response
from server.utils.decorators import require_access_token
from server.models.stores import Store
from server.models.product import Product
from server.models.line import Line
from server.models.review import Review
from server.utils.types import Target, Distance

stores = Blueprint("stores", __name__)


@stores.route("/", methods=["POST"])
def create_store():
    body = request.get_json()
    name, address, target = (
        body.get("name"),
        body.get("address"),
        body.get("target"),
    )
    coordinates = [body.get("coordinates").get("longitude"), body.get("coordinates").get("latitude")]
    id = hashlib.md5(bytes(f"{coordinates[0]}, {coordinates[1]}", "UTF-8")).hexdigest()
    new_store = Store(id=id, name=name, address=address, coordinates=coordinates)
    if target == Target.PRODUCTS.value:
        products_param = body.get("products")
        product_map = {}
        for product in products_param:
            new_product = Product(name=product.get("name"), stock=product.get("stock"), demand=product.get("demand"))
            product_map[product.get("name")] = new_product
        new_store.products = product_map
    elif target == Target.LINE.value:
        line_param = body.get("line")
        line = Line(
            length=line_param.get("length"), speed=line_param.get("speed"), wait_time=line_param.get("wait_time")
        )
        new_store.line = line
    else:
        review_param = body.get("reviews")
        review = Review(
            overall=review_param.get("overall"),
            cleanliness=review_param.get("cleanliness"),
            customer_service=review_param.get("customer_service"),
            comments=review_param.get("comments"),
        )
        new_store.reviews.append(review)
    new_store.save()

    return create_response(payload=json.loads(new_store.to_json()), code=201)


@stores.route("/<string:store_id>", methods=["GET"])
def get_store_by_location(store_id: str):
    try:
        store = Store.objects.get(id=store_id).to_json()
        return create_response(payload=json.loads(store))
    except DoesNotExist:
        return create_response("Store not found", False, 404)


@stores.route("/", methods=["GET"])
@require_access_token
def get_nearest_stores():
    body = request.get_json()
    coordinates = [body.get("coordinates").get("longitude"), body.get("coordinates").get("latitude")]
    max_distance = body.get("max_distance")
    if max_distance == Distance.ANY.value:
        stores = Store.objects(coordinates__near=coordinates).to_json()
    else:
        stores = Store.objects(coordinates__near=coordinates, coordinates__max_distance=(max_distance * 1000)).to_json()
    return create_response(json.loads(stores))


@stores.route("/<string:store_id>", methods=["PATCH"])
def update_store_by_id(store_id: str):
    body = request.get_json()
    target = body.get("target")
    try:
        store = Store.objects.get(id=store_id)
        if target == Target.PRODUCTS.value:
            products_param = body.get("products")
            for product in products_param:
                new_product = Product(
                    name=product.get("name"), stock=product.get("stock"), demand=product.get("demand")
                )
                store.products[product.get("name")] = new_product
            store.save()
        elif target == Target.LINE.value:
            line_param = body.get("line")
            line = Line(
                length=line_param.get("length"), speed=line_param.get("speed"), wait_time=line_param.get("wait_time")
            )
            Store.objects(id=store_id).update_one(set__line=line)
        else:
            review_param = body.get("reviews")
            review = Review(
                overall=review_param.get("overall"),
                cleanliness=review_param.get("cleanliness"),
                customer_service=review_param.get("customer_service"),
                comments=review_param.get("comments"),
            )
            Store.objects(id=store_id).update_one(push__reviews=review)
        Store.objects(id=store_id).update_one(set__last_updated=datetime.utcnow())

        return create_response(json.loads(Store.objects(id=store_id).to_json()))
    except DoesNotExist:
        return create_response("Store not found", False, 404)
