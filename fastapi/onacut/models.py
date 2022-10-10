from sqlalchemy import Table, Boolean, Column, ForeignKey, Integer
from sqlalchemy import String, DateTime, Float, Text, Date, Time
from sqlalchemy.orm import relationship, backref
from datetime import datetime

from .database import Base


class RegionLocation(Base):
    __tablename__ = "region_location"

    location_id = Column(Integer, ForeignKey("location.id"), primary_key = True)
    region_id = Column(Integer, ForeignKey("region.id"), primary_key = True)

class CityLocation(Base):
    __tablename__ = "city_location"

    location_id = Column(Integer, ForeignKey("location.id"), primary_key = True)
    city_id = Column(Integer, ForeignKey("city.id"), primary_key = True)


class DistrictLocation(Base):
    __tablename__ = "district_location"

    location_id = Column(Integer, ForeignKey("location.id"), primary_key = True)
    district_id = Column(Integer, ForeignKey("district.id"), primary_key = True)


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
