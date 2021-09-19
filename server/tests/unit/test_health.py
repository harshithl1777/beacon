from server.main import app

client = app.test_client()


def test_server_health():
    response = client.head('/health')
    assert response.status_code == 200
