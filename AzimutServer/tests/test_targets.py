from fastapi.testclient import TestClient

from main import app

# from ./main import app  # adjust if your app is initialized elsewhere

client = TestClient(app)

def test_get_targets_happy_path():
    response = client.get("/targets")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert "id" in response.json()[0]
    assert "lat" in response.json()[0]