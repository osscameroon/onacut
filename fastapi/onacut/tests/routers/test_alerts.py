import pytest

from onacut.tests import client


@pytest.fixture
def metadata() -> dict:
    return {
        "observations": "Test on Alert",
        "date": "2022-10-30",
        "begin_time": "18:00:00",
        "longitude": 11.124576,
        "lattitude": 4.012475,
        "end_time": "20:30:00",
    }


def test_read_all_alerts() -> None:
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
    item.pop("region", None)  # delete the region from the response
    item.pop("city", None)  # delete the id city the response
    item.pop("district", None)  # delete the district from the response
    assert item == alert


def test_add_alert_bad_region_city_district(
    metadata: dict, region_id: str, city_id: int, district_id: int
) -> None:

    _bad_id = 0000000
    for region, city, district in [
        (_bad_id, city_id, district_id),
        (region_id, _bad_id, district_id),
        (region_id, city_id, _bad_id),
    ]:
        alert = {
            "type": "water",
            **metadata,
            **{"region_id": region, "city_id": city, "district_id": district},
        }

        response = client.post("/alerts/", json=alert)

        assert response.status_code == 400

        if region == _bad_id:
            bad_element = "region"
        elif city == _bad_id:
            bad_element = "city"
        else:
            bad_element = "district"

        assert response.json() == {"detail": f"Bad {bad_element}'s id!"}


def test_delete_alert(alert_id: int) -> None:
    """Should delete an alert"""
    res = client.delete(f"/alerts/{alert_id}")
    assert res.status_code == 200

    # Since it's already deleted
    res = client.delete(f"/alerts/{alert_id}")
    assert res.status_code == 400
