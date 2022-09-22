from flask import Response
from werkzeug.http import parse_cookie

from server.main import create_app

default_login_body = {"email": "beacontestuser1@gmail.com", "password": "a2aba0aaf5f9e4622a56bbccc2d73189"}


class APITestClient:
    def __init__(self, login_body: dict = default_login_body, auto_login: bool = True):
        self.vessel = create_app().test_client()
        if auto_login:
            response = self.vessel.post("/api/auth/session", json=login_body)
            body = response.get_json()
            if response.status_code == 201:
                self.headers = {"Authorization": f"Bearer {body.get('payload').get('access_token')}"}
        else:
            self.headers = {}

    def get(self, path: str, query: dict = {}, parse_body: bool = True) -> tuple[dict, int]:
        response = self.vessel.get(path, query_string=query, headers=self.headers)
        return response.status_code, (response.get_json() if parse_body else response)

    def post(self, path: str, body: dict = {}, parse_body: bool = True) -> tuple[int, dict]:
        response = self.vessel.post(path, json=body, headers=self.headers)
        return response.status_code, (response.get_json() if parse_body else response)

    def put(self, path: str, body: dict = {}, parse_body: bool = True) -> tuple[int, dict]:
        response = self.vessel.put(path, json=body, headers=self.headers)
        return response.status_code, (response.get_json() if parse_body else response)

    def patch(self, path: str, body: dict = {}, parse_body: bool = True) -> tuple[int, dict]:
        response = self.vessel.patch(path, json=body, headers=self.headers)
        return response.status_code, (response.get_json() if parse_body else response)

    def delete(self, path: str, body: dict = {}, parse_body: bool = True) -> tuple[int, dict]:
        response = self.vessel.delete(path, json=body, headers=self.headers)
        return response.status_code, (response.get_json() if parse_body else response)

    def get_cookie(self, response: Response, key: str) -> dict:
        cookies_list = response.headers.getlist("Set-Cookie")
        unparsed_cookie = next((cookie for cookie in cookies_list if key in cookie), None)
        cookie = parse_cookie(unparsed_cookie)
        return cookie

    def delete_cookie(self, key: str):
        self.vessel.delete_cookie(key=key)

    def set_header(self, key: str, value: str):
        self.headers[key] = value

    def logout(self):
        self.vessel.delete("/api/auth/session")
        self.headers.update({"Authorization": None})
