from . import client


def test_read_all_alerts():
    response = client.get("/alerts/")
    assert response.status_code == 200


def test_add_correct_alert():
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
        "end_time": "",
    }

    response = client.post("/alerts/", json=alert)

    assert response.status_code == 200
    assert response.json() == alert


def test_add_incorrect_alert():
    alert = {
        "observations": "Test Add Alert",
        "type": "water",
        "date": "2022-10-30",
        "begin_time": "18:00:00",
        "region_id": 4,
        "longitude": 11.124576,
        "lattitude": 4.012475,
        "city_id": 500,
        "district_id": 1,
        "end_time": "",
    }

    response = client.post("/alerts/", json=alert)
    assert response.status_code == 400
    assert response.json() == {"detail": "Bad city's id!"}
