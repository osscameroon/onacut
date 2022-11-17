import contextlib
import os
from uuid import uuid4

import pytest
from pytest_mock import MockerFixture
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from onacut.tests import client


# to use on all tests in this routers scope
@pytest.fixture(autouse=True)
def session_local(mocker: MockerFixture):
    """
    We're going to work with an empty database as a fixture
    {
     "alert": [],
     "city": [],
     "city_location": [],
     "district": [],
     "district_location": [],
     "location": [],
     "quartier": [],
     "quartier_location": [],
     "region": [],
     "region_location": []
    }
    Where we're going to add, delete, update values along the way
    """

    engine = create_engine(
        os.path.join("sqlite:///onacut/tests/fixtures/test_sqlite.data"),
        connect_args={"check_same_thread": False},
    )

    # we need to have a fresh looking test db, so for all our tables we're
    # going to delete everything
    with contextlib.closing(engine.connect()) as con:
        trans = con.begin()
        for table in engine.table_names():
            con.execute(f"DELETE FROM {table} WHERE 1;")
        trans.commit()

        SessionLocal = sessionmaker(autocommit=False, autoflush=True, bind=engine)

        mocker.patch("onacut.dependencies.SessionLocal", SessionLocal)


@pytest.fixture
def random_name() -> str:
    return str(uuid4())


@pytest.fixture
def region_id(random_name: str) -> int:
    response_region = client.post("/regions/", json={"name": random_name})
    return response_region.json()["id"]


@pytest.fixture
def city_id(region_id: int, random_name: str) -> int:
    response_city = client.post(
        "/cities/",
        json={
            "name": random_name,
            "longitude": 11.124576,
            "lattitude": 4.012475,
            "region_id": region_id,
        },
    )
    return response_city.json()["id"]


@pytest.fixture
def district_id(city_id: int, random_name: str) -> int:
    response_district = client.post(
        "/districts/", json={"name": random_name, "city_id": city_id}
    )
    return response_district.json()["id"]


@pytest.fixture
def alert_id(metadata: dict, region_id: int, city_id: int, district_id: int) -> int:
    alert = {
        **metadata,
        **{
            "type": "electricity",
            "region_id": region_id,
            "city_id": city_id,
            "district_id": district_id,
        },
    }
    response = client.post("/alerts/", json=alert)

    return response.json()["id"]
