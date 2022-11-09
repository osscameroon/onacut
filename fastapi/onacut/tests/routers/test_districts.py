from onacut.tests import client


def test_read_all_districts():
    response = client.get("/districts/")
    assert response.status_code == 200


def test_add_district():
    district = {"name": "region", "city_id": 9}

    response = client.post("/districts/", json=district)
    assert response.status_code == 200
    item = response.json()
    item.pop("id", None)  # delete the id from the response
    item.pop("total_alerts", None)  # delete the total_alerts from the response
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
    assert len(response.json())
    res = client.delete(f"/districts/{len(response.json()) - 1}")
    assert res.status_code == 200
    assert res.json() is None
