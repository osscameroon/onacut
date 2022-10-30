from . import client


def test_read_all_districts():
    response = client.get("/districts")
    assert response.status_code == 200


def test_add_district():
    district = {
        "name": "region",
        "city_id": 9
    }

    response = client.post("/districts/", json=district)
    assert response.status_code == 200
    item = response.json()
    del item["id"]  # delete the id from the response
    del item["total_alerts"]  # delete the total_alerts from the response
    assert item == district


def test_add_district_bad_city():
    district = {
        "name": "bad city",
        "city_id": 0,
    }

    response = client.post("/cities/", json=district)
    assert response.status_code == 400
    assert response.json() == {"detail": "Bad city's id!"}


def test_delete_district():
    response = client.get("/districts/")
    if not len(response.json()) <= 0:
        res = client.delete(f"/districts/{len(response.json()) - 1}")
        assert res.status_code == 200
        assert res.json() is None
