from onacut.tests import client


def test_read_all_regions():
    response = client.get("/regions/")
    assert response.status_code == 200


def test_add_region():
    region = {"name": "region"}

    response = client.post("/regions/", json=region)
    assert response.status_code == 200
    item = response.json()
    item.pop("id", None)  # delete the id from the response
    item.pop("total_alerts", None)  # delete the total_alerts from the response
    assert item == region


def test_delete_region():
    response = client.get("/regions/")
    assert len(response.json())
    res = client.delete(f"/regions/{len(response.json()) - 1}")
    assert res.status_code == 200
    assert res.json() is None
