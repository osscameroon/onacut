
from onacut import db

RegionLocation = db.Table(
    "region_location",
    db.Column("location_id", db.Integer, db.ForeignKey("location.id")),
    db.Column("region_id", db.Integer, db.ForeignKey("region.id"))
)

CityLocation = db.Table(
    "city_location",
    db.Column("location_id", db.Integer, db.ForeignKey("location.id")),
    db.Column("city_id", db.Integer, db.ForeignKey("city.id"))
)

DistrictLocation = db.Table(
    "district_location",
    db.Column("location_id", db.Integer, db.ForeignKey("location.id")),
    db.Column("district_id", db.Integer, db.ForeignKey("district.id"))
)


class Location(db.Model):
    __tablename__ = "location"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    asciiname = db.Column(db.String(255))
    alternativenames = db.Column(db.Text)
    longitude = db.Column(db.Float)
    lattitude = db.Column(db.Float)


class Region(db.Model):
    __tablename__ = "region"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True)
    cities = db.relationship("City", backref="region", lazy=True)
    alerts = db.relationship("Alert", backref="region", lazy=True)
    limits = db.relationship(
        "Location", secondary=RegionLocation,
        backref=db.backref("regions", lazy="dynamic"),
        lazy="dynamic"
    )


class City(db.Model):
    __tablename__ = "city"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    region_id = db.Column(db.Integer, db.ForeignKey("region.id"))
    districts = db.relationship("District", backref="city", lazy=True)
    alerts = db.relationship("Alert", backref="city", lazy=True)
    limits = db.relationship(
        "Location", secondary=CityLocation,
        backref=db.backref("cities", lazy="dynamic"),
        lazy="dynamic"
    )


class District(db.Model):
    __tablename__ = "district"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True)
    city_id = db.Column(db.Integer, db.ForeignKey("city.id"))
    alerts = db.relationship("Alert", backref="district", lazy=True)
    limits = db.relationship(
        "Location", secondary=DistrictLocation,
        backref=db.backref("districts", lazy="dynamic"),
        lazy="dynamic"
    )


class Alert(db.Model):
    __tablename__ = "alert"

    id = db.Column(db.Integer, primary_key=True)
    observations = db.Column(db.String(255))
    date = db.Column(db.Date(), nullable=False)
    begin_time = db.Column(db.Time(), nullable=False)
    end_time = db.Column(db.Time(), nullable=False)
    region_id = db.Column(db.Integer, db.ForeignKey("region.id"))
    city_id = db.Column(db.Integer, db.ForeignKey("city.id"))
    district_id = db.Column(db.Integer, db.ForeignKey("district.id"))
