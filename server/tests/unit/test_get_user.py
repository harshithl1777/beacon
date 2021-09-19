from server.main import app

client = app.test_client()


def test_get_users():
    response = client.get('/api/users/test')
    body = response.get_json()
    assert response.status_code == 200
    assert body.get('username') is not None
