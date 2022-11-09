from . import client


def test_read_all_regions():
    response = client.get("/regions")
    assert response.status_code == 200


def test_add_region():
    region = {
        "name": "region",
    }

    response = client.post("/regions/", json=region)
    assert response.status_code == 200
    item = response.json()
    del item["id"]  # delete the id from the response
    del item["total_alerts"]  # delete the total_alerts from the response
    assert item == region


def test_delete_region():
    response = client.get("/regions/")
    if not len(response.json()) <= 0:
        res = client.delete(f"/regions/{len(response.json()) - 1}")
        assert res.status_code == 200
        assert res.json() is None
