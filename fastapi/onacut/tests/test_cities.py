import pytest
from . import client


@pytest.fixture
def metadata():
    return {
        "longitude": 11.124576,
        "lattitude": 4.012475,
        "region_id": 2,
    }


def test_read_all_cities():
    response = client.get("/cities/")
    assert response.status_code == 200


def test_add_city(metadata: dict):
    city = {
        "name": "region",
        **metadata
    }

    response = client.post("/cities/", json=city)
    assert response.status_code == 200
    item = response.json()
    item.pop("id", None)  # delete the id from the response
    item.pop("total_alerts", None)  # delete the total_alerts from the response
    assert item == city


def test_add_city_bad_region(metadata: dict):
    alert = {
        "name": "bad city",
        **metadata
    }

    response = client.post("/cities/", json=alert)
    assert response.status_code == 400
    assert response.json() == {"detail": "Bad region's id!"}


def test_delete_city():
    response = client.get("/cities/")
    assert len(response.json())
    res = client.delete(f"/regions/{len(response.json()) - 1}")
    assert res.status_code == 200
    assert res.json() is None
