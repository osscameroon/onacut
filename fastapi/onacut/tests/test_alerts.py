import pytest
from . import client


@pytest.fixture
def metadata():
    return {
        "observations": "Test Add Alert",
        "date": "2022-10-30",
        "begin_time": "18:00:00",
        "region_id": 4,
        "longitude": 11.124576,
        "lattitude": 4.012475,
        "city_id": 1,
        "district_id": 1,
        "end_time": "20:30:00",
    }


def test_read_all_alerts():
    response = client.get("/alerts/")
    assert response.status_code == 200


def test_add_alert(metadata: dict):
    alert = {
        "type": "electricity",
        **metadata
    }

    response = client.post("/alerts/", json=alert)

    assert response.status_code == 200
    item = response.json()
    item.pop("id", None)  # delete the id from the response
    assert item == alert


def test_add_alert_bad_region(metadata: dict):
    alert = {
        "type": "water",
        **metadata
    }

    response = client.post("/alerts/", json=alert)
    assert response.status_code == 400
    assert response.json() == {"detail": "Bad region's id!"}


def test_add_alert_bad_city(metadata: dict):
    alert = {
        "type": "water",
        **metadata
    }

    response = client.post("/alerts/", json=alert)
    assert response.status_code == 400
    assert response.json() == {"detail": "Bad city's id!"}


def test_add_alert_bad_district(metadata: dict):
    alert = {
        "type": "water",
        **metadata
    }

    response = client.post("/alerts/", json=alert)
    assert response.status_code == 400
    assert response.json() == {"detail": "Bad district's id!"}


def test_delete_alert():
    response = client.get("/alerts/")
    assert len(response.json())
    res = client.delete(f"/alerts/{len(response.json()) - 1}")
    assert res.status_code == 200
    assert res.json() is None
