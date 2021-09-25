import os
import jwt
import codecs

from server.tests.main import APITestClient


client = APITestClient(auto_login=False)
authorized_client = APITestClient()  # initialize client with auto login


def test_refresh_invalid_token():
    # generate and set random jwt token
    random_token_key = codecs.encode(os.urandom(64), 'hex').decode()
    random_token = jwt.encode({}, random_token_key)
    client.vessel.set_cookie('localhost', 'refresh_token', random_token)

    code, response = client.put('/api/auth/session')
    assert code == 401
    assert response.get('payload') == 'Invalid refresh token'


def test_refresh_success():
    code, response = authorized_client.put('/api/auth/session')
    assert code == 200
    assert response.get('payload').get('access_token') is not None


def test_logout():
    logout_code, logout_response = authorized_client.delete(
        '/api/auth/session')
    assert logout_code == 200

    # ensure refresh token deleted, refresh request returns error
    code, response = authorized_client.put('/api/auth/session')
    assert code == 400
    assert response.get('payload') == 'Bad request'
