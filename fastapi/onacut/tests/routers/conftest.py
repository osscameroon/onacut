import os

import pytest
from pytest_mock import MockerFixture
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


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
