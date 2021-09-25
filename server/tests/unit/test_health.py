from server.main import app

client = app.test_client()


def test_server_health():
    response = client.head('/api/health')
    assert response.status_code == 200
