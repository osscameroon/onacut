from . import client


def test_read_all_cities():
    response = client.get("/cities")
    assert response.status_code == 200
