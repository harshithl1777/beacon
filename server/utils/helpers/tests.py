from flask import Response
from flask.testing import FlaskClient
from werkzeug.http import parse_cookie
from server.main import app


class APITestClient():
    client = app.test_client()
    headers = {}

    def __init__(self, auto_login: bool = True):
        request_body = {
            'username': 'testuser1',
            'password': '6a56634dee5aff46f3b2359868d1c511'
        }
        if (auto_login):
            response = self.client.post('/api/auth/session', json=request_body)
            body = response.get_json()
            if (response.status_code == 201):
                self.headers['Authorization'] = f"Bearer {body.get('access_token')}"

    def get(self, path: str, query: dict = {}) -> tuple[dict, int]:
        response = self.client.get(
            path, query_string=query, headers=self.headers)
        return response.status_code, response.get_json(),

    def post(self, path: str, body: dict = {}) -> tuple[dict, int]:
        response = self.client.post(path, json=body, headers=self.headers)
        return response.status_code, response.get_json()

    def put(self, path: str, body: dict = {}) -> tuple[dict, int]:
        response = self.client.post(path, json=body, headers=self.headers)
        return response.status_code, response.get_json()

    def patch(self, path: str, body: dict = {}) -> tuple[dict, int]:
        response = self.client.patch(path, json=body, headers=self.headers)
        return response.status_code, response.get_json()

    def delete(self, path: str, body: dict = {}) -> tuple[dict, int]:
        response = self.client.post(path, json=body, headers=self.headers)
        return response.status_code, response.get_json()

    def getCookie(response: Response, key: str = 'refresh_token') -> str:
        cookies_list = response.headers.getlist('Set-Cookie')
        unparsed_cookie = next(
            (cookie for cookie in cookies_list if key in cookie), None)
        cookie = parse_cookie(unparsed_cookie)
        return cookie

    def setHeader(self, key: str, value: str):
        self.headers[key] = value

    def logout(self):
        self.client.delete('/api/auth/session')
        headers.get('Authorization') = None
