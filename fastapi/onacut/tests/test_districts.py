from . import client


def test_read_all_districts():
    response = client.get("/districts")
    assert response.status_code == 200
