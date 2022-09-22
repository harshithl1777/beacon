import os
import jwt
import codecs

from server.tests.client import APITestClient

client = APITestClient(auto_login=False)


def test_middlware_no_token():
    code, response = client.get("/api/users/test")
    assert code == 400
    assert response.get("payload") == "Bad request"


def test_middleware_invalid_token():
    random_token_key = codecs.encode(os.urandom(64), "hex").decode()
    random_token = jwt.encode({}, random_token_key)
    client.headers["Authorization"] = f"Bearer {random_token}"
    code, response = client.get("/api/users/4c63accdf414f7349728a466")
    assert code == 401
    assert response.get("payload") == "Invalid access token"


def test_middleware_success():
    authorized_client = APITestClient()
    code, response = authorized_client.get("/api/users/4c63accdf414f7349728a466")
    assert code == 200
    assert response.get("payload") is not None
