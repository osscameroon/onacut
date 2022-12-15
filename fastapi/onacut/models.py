from sqlalchemy import (Column, Date, Float, ForeignKey, Integer, String, Text,
                        Time)
from sqlalchemy.orm import backref, relationship

from onacut.database import Base


class RegionLocation(Base):
    __tablename__ = "region_location"

    location_id = Column(Integer, ForeignKey("location.id"), primary_key=True)
    region_id = Column(Integer, ForeignKey("region.id"), primary_key=True)


class CityLocation(Base):
    __tablename__ = "city_location"

    location_id = Column(Integer, ForeignKey("location.id"), primary_key=True)
    city_id = Column(Integer, ForeignKey("city.id"), primary_key=True)


class DistrictLocation(Base):
    __tablename__ = "district_location"

    location_id = Column(Integer, ForeignKey("location.id"), primary_key=True)
    district_id = Column(Integer, ForeignKey("district.id"), primary_key=True)


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
        Location,
        secondary="region_location",
        backref=backref("regions", lazy="dynamic"),
        lazy="dynamic",
    )

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "num_alerts": len(self.alerts)
        }


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
        Location,
        secondary="city_location",
        backref=backref("cities", lazy="dynamic"),
        lazy="dynamic",
    )

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "longitude": self.longitude,
            "lattitude": self.lattitude,
            "region_id": self.region_id,
            "num_alerts": len(self.alerts)
        }


class District(Base):
    __tablename__ = "district"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True)
    city_id = Column(Integer, ForeignKey("city.id"))
    alerts = relationship("Alert", backref="district", lazy=True)
    locations = relationship(
        Location,
        secondary="district_location",
        backref=backref("districts", lazy="dynamic"),
        lazy="dynamic",
    )

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "city_id": self.city_id,
            "num_alerts": len(self.alerts)
        }



class Alert(Base):
    __tablename__ = "alert"

    id = Column(Integer, primary_key=True)
    observations = Column(String(255))
    type = Column(String(50), nullable=False)
    date = Column(Date(), nullable=False)
    begin_time = Column(Time(), nullable=False)
    end_time = Column(Time())
    region_id = Column(Integer, ForeignKey("region.id"))
    longitude = Column(Float)
    lattitude = Column(Float)
    city_id = Column(Integer, ForeignKey("city.id"))
    district_id = Column(Integer, ForeignKey("district.id"))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "observations": self.observations,
            "type": self.type,
            "date": self.date,
            "begin_time": self.begin_time,
            "end_time": self.end_time,
            "longitude": self.longitude,
            "lattitude": self.lattitude,
            "region": self.region.name,
            "region_id": self.region_id,
            "city": self.city.name,
            "city_id": self.city_id,
            "district": self.district.name,
            "district_id": self.district_id,
        }
