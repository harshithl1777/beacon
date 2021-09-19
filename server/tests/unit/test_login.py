from typing import Any
from server.auth.routes import refresh_session
from werkzeug.http import parse_cookie
from server.main import app
import os

client = app.test_client()


def login(body: dict) -> tuple[object, dict]:
    response = client.post('/api/auth/session', json=body)
    cookies_list = response.headers.getlist('Set-Cookie')
    unparsed_cookie = next(
        (cookie for cookie in cookies_list if 'refresh_token' in cookie), None)
    refresh_cookie = parse_cookie(unparsed_cookie)
    return response, refresh_cookie


def test_login_success():
    request_body = {
        'username': 'hackthesouth',
        'password': '123htn456'
    }
    response, refresh_cookie = login(request_body)
    response_body = response.get_json()
    assert response.status_code == 201
    assert response_body.get('payload').get('access_token') is not None
    assert refresh_cookie.get('refresh_token') is not None
    assert 'HttpOnly' in refresh_cookie
    if os.getenv('PYTHON_ENV') == 'production':
        assert 'Secure' in refresh_cookie
    else:
        assert 'Secure' not in refresh_cookie
    assert refresh_cookie.get('Max-Age') == '5184000'
    assert refresh_cookie.get('Path') == '/api/auth/session'
    assert refresh_cookie.get('SameSite') == 'Strict'


def test_login_invalid_credentials():
    request_body = {
        'username': 'invalid_username',
        'password': 'invalid_password'
    }
    response, refresh_cookie = login(request_body)
    response_body = response.get_json()
    assert response.status_code == 401
    assert response_body.get('payload') == 'Invalid username or password'
    assert refresh_cookie.get('refresh_token') is None


def test_login_no_credentials():
    request_body = {}
    response, refresh_cookie = login(request_body)
    response_body = response.get_json()
    assert response.status_code == 400
    assert response_body.get('payload') == 'Bad request'
    assert refresh_cookie.get('refresh_token') is None
