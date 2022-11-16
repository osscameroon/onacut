from . import client


def test_read_all_alerts():
    response = client.get("/alerts/")
    assert response.status_code == 200


def test_add_alert():
    alert = {
        "observations": "Test Add Alert",
        "type": "electricity",
        "date": "2022-10-30",
        "begin_time": "18:00:00",
        "region_id": 4,
        "longitude": 11.124576,
        "lattitude": 4.012475,
        "city_id": 1,
        "district_id": 1,
        "end_time": "20:30:00",
    }

    response = client.post("/alerts/", json=alert)

    assert response.status_code == 200
    item = response.json()
    del item["id"]  # delete the id from the response
    assert item == alert


def test_add_alert_bad_region():
    alert = {
        "observations": "Test Add Alert",
        "type": "water",
        "date": "2022-10-30",
        "begin_time": "18:00:00",
        "region_id": 0,
        "longitude": 11.124576,
        "lattitude": 4.012475,
        "city_id": 3,
        "district_id": 1,
        "end_time": "18:00:00",
    }

    response = client.post("/alerts/", json=alert)
    assert response.status_code == 400
    assert response.json() == {"detail": "Bad region's id!"}


def test_add_alert_bad_city():
    alert = {
        "observations": "Test Add Alert",
        "type": "water",
        "date": "2022-10-30",
        "begin_time": "18:00:00",
        "region_id": 4,
        "longitude": 11.124576,
        "lattitude": 4.012475,
        "city_id": 0,
        "district_id": 1,
        "end_time": "18:00:00",
    }

    response = client.post("/alerts/", json=alert)
    assert response.status_code == 400
    assert response.json() == {"detail": "Bad city's id!"}


def test_add_alert_bad_district():
    alert = {
        "observations": "Test Add Alert",
        "type": "water",
        "date": "2022-10-30",
        "begin_time": "18:00:00",
        "region_id": 4,
        "longitude": 11.124576,
        "lattitude": 4.012475,
        "city_id": 2,
        "district_id": 0,
        "end_time": "18:00:00",
    }

    response = client.post("/alerts/", json=alert)
    assert response.status_code == 400
    assert response.json() == {"detail": "Bad district's id!"}


def test_delete_alert():
    response = client.get("/alerts/")
    if not len(response.json()) <= 0:
        res = client.delete(f"/alerts/{len(response.json()) - 1}")
        assert res.status_code == 200
        assert res.json() is None
