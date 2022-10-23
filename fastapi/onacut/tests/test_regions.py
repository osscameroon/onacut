from . import client


def test_read_all_regions():
    response = client.get("/regions")
    assert response.status_code == 200
