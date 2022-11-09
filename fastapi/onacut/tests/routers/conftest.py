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
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    mocker.patch("onacut.dependencies.SessionLocal", SessionLocal)


@pytest.fixture
def region_id() -> int:
    # We test the post of a region directly here
    response_region = client.post("/regions/", json={"name": str(uuid4())})
    return response_region.json()["id"]


@pytest.fixture
def city_id(region_id: int) -> int:
    # We test the post of a city directly here
    response_city = client.post(
        "/cities/",
        json={
            "name": str(uuid4()),
            "longitude": 11.124576,
            "lattitude": 4.012475,
            "region_id": region_id,
        },
    )
    return response_city.json()["id"]


@pytest.fixture
def district_id(city_id: int) -> int:
    # We test the post of a district directly here
    response_district = client.post(
        "/districts/", json={"name": str(uuid4()), "city_id": city_id}
    )
    return response_district.json()["id"]
