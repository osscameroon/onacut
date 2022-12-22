import pytest

from onacut.tests import client


@pytest.fixture
def metadata() -> dict:
    return {
        "longitude": 11.124576,
        "lattitude": 4.012475,
    }


def test_read_all_cities() -> None:
    response = client.get("/cities")
    assert response.status_code == 200


def test_add_city(random_name: str, metadata: dict, region_id: int) -> None:
    """Should add a new city"""
    city = {"name": random_name, **metadata, "region_id": region_id}

    response = client.post("/cities/", json=city)
    assert response.status_code == 200
    item = response.json()
    item.pop("id", None)  # delete the id from the response
    item.pop("num_alerts", None)  # delete the total_alerts from the response
    assert item == city


def test_add_city_bad_region(random_name: str, metadata: dict) -> None:
    """Should raise an error for a bad region"""
    response = client.post(
        "/cities/", json={"name": random_name, **metadata, "region_id": 0000000}
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Bad region's id!"}


def test_delete_city(city_id: int) -> None:
    """Should delete a city"""
    res = client.delete(f"/cities/{city_id}")
    assert res.status_code == 200

    # Since it's already deleted
    res = client.delete(f"/cities/{city_id}")
    assert res.status_code == 400
