from sqlalchemy import Table, Boolean, Column, ForeignKey, Integer
from sqlalchemy import String, DateTime, Float, Text, Date, Time
from sqlalchemy.orm import relationship, backref
from datetime import datetime

from .database import Base


RegionLocation = Table(
    "region_location",
    Column("location_id", Integer, ForeignKey("location.id")),
    Column("region_id", Integer, ForeignKey("region.id")),
)

CityLocation = Table(
    "city_location",
    Column("location_id", Integer, ForeignKey("location.id")),
    Column("city_id", Integer, ForeignKey("city.id")),
)

DistrictLocation = Table(
    "district_location",
    Column("location_id", Integer, ForeignKey("location.id")),
    Column("district_id", Integer, ForeignKey("district.id")),
)


class Location(Base):
    __tablename__ = "location"

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    asciiname = Column(String(255))
    alternativenames = Column(Text)
    longitude = Column(Float)
    lattitude = Column(Float)


class Region(Base):
    __tablename__ = "region"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True)
    cities = relationship("City", backref="region", lazy=True)
    alerts = relationship("Alert", backref="region", lazy=True)
    locations = relationship(
        "Location",
        secondary=RegionLocation,
        backref=backref("regions", lazy="dynamic"),
        lazy="dynamic",
    )


class City(Base):
    __tablename__ = "city"

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    region_id = Column(Integer, ForeignKey("region.id"))
    longitude = Column(Float)
    lattitude = Column(Float)
    districts = relationship("District", backref="city", lazy=True)
    alerts = relationship("Alert", backref="city", lazy=True)
    locations = relationship(
        "Location",
        secondary=CityLocation,
        backref=backref("cities", lazy="dynamic"),
        lazy="dynamic",
    )


class District(Base):
    __tablename__ = "district"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True)
    city_id = Column(Integer, ForeignKey("city.id"))
    alerts = relationship("Alert", backref="district", lazy=True)
    locations = relationship(
        "Location",
        secondary=DistrictLocation,
        backref=backref("districts", lazy="dynamic"),
        lazy="dynamic",
    )


class Alert(Base):
    __tablename__ = "alert"

    id = Column(Integer, primary_key=True)
    observations = Column(String(255))
    type = Column(String(50), nullable=False)
    date = Column(Date(), nullable=False)
    begin_time = Column(Time(), nullable=False)
    end_time = Column(Time(), nullable=False)
    region_id = Column(Integer, ForeignKey("region.id"))
    longitude = Column(Float)
    lattitude = Column(Float)
    city_id = Column(Integer, ForeignKey("city.id"))
    district_id = Column(Integer, ForeignKey("district.id"))