from fastapi.testclient import TestClient

from onacut.main import app

client = TestClient(app)
client.headers["Content-Type"] = "application/json"
