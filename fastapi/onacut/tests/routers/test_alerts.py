import pytest

from onacut.tests import client

_BAD_ID = 0000000


@pytest.fixture
def metadata():
    return {
        "observations": "Test Add Alert",
        "date": "2022-10-30",
        "begin_time": "18:00:00",
        "longitude": 11.124576,
        "lattitude": 4.012475,
        "end_time": "20:30:00",
    }


def test_read_all_alerts():
    response = client.get("/alerts")
    assert response.status_code == 200


def test_add_alert(
    metadata: dict, region_id: int, city_id: int, district_id: int
) -> None:
    """To add an alert, we need to have a region,a city and a district"""
    alert = {
        **metadata,
        **{
            "type": "electricity",
            "region_id": region_id,
            "city_id": city_id,
            "district_id": district_id,
        },
    }

    response = client.post("/alerts/", json=alert)

    assert response.status_code == 200
    item = response.json()
    item.pop("id", None)  # delete the id from the response
    assert item == alert


def test_add_alert_bad_region_city_district(
    metadata: dict, region_id: str, city_id: int, district_id: int
) -> None:
    for region, city, district in [
        (_BAD_ID, city_id, district_id),
        (region_id, _BAD_ID, district_id),
        (_BAD_ID, city_id, district_id),
        (region_id, city_id, _BAD_ID),
    ]:
        alert = {
            "type": "water",
            **metadata,
            **{"region_id": region, "city_id": city, "district_id": district},
        }

        response = client.post("/alerts/", json=alert)

        assert response.status_code == 400
        bad_element = (
            "region"
            if region == _BAD_ID
            else ("city" if city == _BAD_ID else "district")
        )
        assert response.json() == {"detail": f"Bad {bad_element}'s id!"}


def test_delete_alert(metadata: dict, region_id: int, city_id: int, district_id: int):
    alert = {
        **metadata,
        **{
            "type": "electricity",
            "region_id": region_id,
            "city_id": city_id,
            "district_id": district_id,
        },
    }
    response = client.post("/alerts/", json=alert)

    res = client.delete(f"/alerts/{response.json()['id']}")
    assert res.status_code == 200
