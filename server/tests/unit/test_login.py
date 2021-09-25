from server.tests.client import APITestClient
import os

client = APITestClient(auto_login=False)


def login(body: dict) -> tuple[object, dict]:
    code, response = client.post('/api/auth/session', body, parse_body=False)
    cookie = client.get_cookie(response, 'refresh_token')
    return code, response, cookie


def test_login_no_credentials():
    code, response, refresh_cookie = login({})
    body = response.get_json()
    assert code == 400
    assert body.get('payload') == 'Bad request'
    assert refresh_cookie.get('refresh_token') is None


def test_login_invalid_credentials():
    request_body = {
        'username': 'invalid_username',
        'password': 'invalid_password'
    }
    code, response, refresh_cookie = login(request_body)
    body = response.get_json()
    assert code == 401
    assert body.get('payload') == 'Invalid username or password'
    assert refresh_cookie.get('refresh_token') is None


def test_login_success():
    request_body = {
        'username': 'hackthesouth',
        'password': '123htn456'
    }
    code, response, refresh_cookie = login(request_body)
    body = response.get_json()
    assert code == 201
    assert body.get('payload').get('access_token') is not None
    assert refresh_cookie.get('refresh_token') is not None
    assert 'HttpOnly' in refresh_cookie
    if os.getenv('PYTHON_ENV') == 'production':
        assert 'Secure' in refresh_cookie
    else:
        assert 'Secure' not in refresh_cookie
    assert refresh_cookie.get('Max-Age') == '5184000'
    assert refresh_cookie.get('Path') == '/api/auth/session'
    assert refresh_cookie.get('SameSite') == 'Strict'
