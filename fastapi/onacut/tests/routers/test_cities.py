import pytest

from onacut.tests import client


@pytest.fixture
def metadata():
    return {
        "longitude": 11.124576,
        "lattitude": 4.012475,
    }


def test_read_all_cities():
    response = client.get("/cities")
    assert response.status_code == 200


def test_add_city(random_name: str, metadata: dict, region_id: int):
    city = {"name": random_name, **metadata, "region_id": region_id}

    response = client.post("/cities/", json=city)
    assert response.status_code == 200
    item = response.json()
    item.pop("id", None)  # delete the id from the response
    item.pop("total_alerts", None)  # delete the total_alerts from the response
    assert item == city


def test_add_city_bad_region(random_name: str, metadata: dict):
    alert = {"name": random_name, **metadata, "region_id": 0000000}

    response = client.post("/cities/", json=alert)
    assert response.status_code == 400
    assert response.json() == {"detail": "Bad region's id!"}


def test_delete_city(city_id: int):
    res = client.delete(f"/regions/{city_id}")
    assert res.status_code == 200
