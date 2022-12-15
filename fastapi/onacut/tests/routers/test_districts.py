from onacut.tests import client


def test_read_all_districts():
    response = client.get("/districts")
    assert response.status_code == 200


def test_add_district(random_name: str, city_id: int) -> None:
    """Should add district"""
    district = {"name": random_name, "city_id": city_id}
    response = client.post("/districts/", json=district)
    assert response.status_code == 200
    item = response.json()
    item.pop("id", None)  # delete the id from the response
    item.pop("num_alerts", None)  # delete the total_alerts from the response
    assert item == district


def test_delete_district(district_id: int) -> None:
    """Should delete district"""
    res = client.delete(f"/districts/{district_id}")
    assert res.status_code == 200

    # Since it's already deleted
    res = client.delete(f"/districts/{district_id}")
    assert res.status_code == 400
