import os

from server.tests.client import APITestClient

client = APITestClient(auto_login=False)
user_body = {"email": "testcaseuser@gmail.com", "password": "highly secure password", "method": "CREDENTIALS"}


def test_new_user():
    code, response = client.post("/api/users/", body=user_body)
    user_body["_id"] = response.get("payload").get("_id")
    assert code == 201
    assert response.get("payload") is not None
    assert response.get("payload").get("email") == "testcaseuser@gmail.com"


def test_delete_user():
    authorized_client = APITestClient(login_body=user_body)
    code, response = authorized_client.delete(f"/api/users/{user_body.get('_id')}")
    assert code == 200
    code_2, response_2 = authorized_client.get(f"/api/users/{user_body.get('_id')}")
    assert code_2 == 404
