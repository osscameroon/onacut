from onacut.tests import client


def test_read_all_regions():
    response = client.get("/regions")
    assert response.status_code == 200


def test_add_region(random_name: str) -> None:
    """Should add region"""
    region = {"name": random_name}

    response = client.post("/regions/", json=region)
    assert response.status_code == 200
    item = response.json()
    item.pop("id", None)  # delete the id from the response
    item.pop("total_alerts", None)  # delete the total_alerts from the response
    assert item == region


def test_delete_region(region_id: str) -> None:
    """Should delete region"""
    res = client.delete(f"/regions/{region_id}")
    assert res.status_code == 200
