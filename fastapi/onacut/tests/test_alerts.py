from . import client


def test_read_all_alerts():
    response = client.get("/alerts")
    assert response.status_code == 200