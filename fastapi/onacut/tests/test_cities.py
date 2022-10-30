from . import client


def test_read_all_cities():
    response = client.get("/cities")
    assert response.status_code == 200


def test_add_city():
    city = {
        "name": "region",
        "longitude": 11.124576,
        "lattitude": 4.012475,
        "region_id": 2,
    }

    response = client.post("/cities/", json=city)
    assert response.status_code == 200
    item = response.json()
    del item["id"]  # delete the id from the response
    del item["total_alerts"]  # delete the total_alerts from the response
    assert item == city


def test_add_city_bad_region():
    alert = {
        "name": "bad city",
        "longitude": 11.124576,
        "lattitude": 4.012475,
        "region_id": 0,
    }

    response = client.post("/cities/", json=alert)
    assert response.status_code == 400
    assert response.json() == {"detail": "Bad region's id!"}


def test_delete_city():
    response = client.get("/cities/")
    if not len(response.json()) <= 0:
        res = client.delete(f"/regions/{len(response.json()) - 1}")
        assert res.status_code == 200
        assert res.json() is None
