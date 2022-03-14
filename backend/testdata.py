import json
import re

from datetime import datetime, timedelta

from onacut import db
from onacut.models import Alert, Location, City, District, Region

GEO_PATH = "../frontend/src/scripts/list_geo_cm.json"
ALERT_PATH = "../frontend/src/scripts/alerts.json"
UNITS = {'S': 'seconds', 'M': 'minutes', 'H': 'hours', 'D': 'days', 'W': 'weeks'}

SOME_CITIES = [
    {"name": "bamenda", "region": "sud-ouest"},
    {"name": "bafoussam", "region": "ouest"},
    {"name": "bertoua", "region": "est"},
    {"name": "buea", "region": "nord-ouest"},
    {"name": "douala", "region": "littoral"},
    {"name": "ebolowa", "region": "sud"},
    {"name": "yaounde", "region": "centre"},
    {"name": "garoua", "region": "nord"},
    {"name": "ngaoundere", "region": "adamaoua"},
    {"name": "maroua", "region": "extreme-nord"},
]


def convert_to_seconds(s):
    return int(timedelta(**{
        UNITS.get(m.group('unit').lower(), 'seconds'): float(m.group('val'))
        for m in re.finditer(r'(?P<val>\d+(\.\d+)?)(?P<unit>[smhdw]?)', s, flags=re.I)
    }).total_seconds())


def create_db():
    db.drop_all()
    db.session.commit()
    db.create_all()
    db.session.commit()


def create_location():
    with open(GEO_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    for geo in data:
        loc = Location()
        loc.name = geo["name"]
        loc.asciiname = geo["asciiname"]
        loc.alternativenames = geo["alternativenames"]
        loc.longitude = geo["long"]
        loc.lattitude = geo["lat"]
        db.session.add(loc)
    db.session.commit()


def create_region():
    regions = [
        "sud-ouest",
        "sud",
        "nord-ouest",
        "nord",
        "ouest",
        "littoral",
        "extreme-nord",
        "est",
        "centre",
        "adamaoua"
    ]
    for region in regions:
        reg = Region()
        reg.name = region
        db.session.add(reg)
    db.session.commit()


def create_cities():
    for _city in SOME_CITIES:
        city = City()
        city.name = _city["name"]

        reg = Region.query.filter_by(name=_city["region"]).first()

        if reg:
            city.region_id = reg.id
        else:
            reg = Region()
            reg.name = _city["region"]
            db.session.add(reg)
            city.region_id = reg.id

        db.session.add(city)
    db.session.commit()


def create_alerts():
    with open(ALERT_PATH, "r", encoding="utf-8") as f:
        datas = json.load(f)

    for data in datas:
        alert = Alert()
        alert.observations = data["observations"]
        alert.date = datetime.fromisoformat(data["prog_date"])
        begin_time = data["prog_heure_debut"]
        end_time = data["prog_heure_fin"]
        alert.begin_time = datetime.fromtimestamp(convert_to_seconds(begin_time)).time()
        alert.end_time = datetime.fromtimestamp(convert_to_seconds(end_time)).time()

        in_region = data["region"].strip().lower()
        reg = Region.query.filter_by(name=in_region).first()
        if reg:
            alert.region_id = reg.id
        else:
            region = Region()
            region.name = in_region
            db.session.add(region)
            db.session.commit()
            alert.region_id = region.id

        in_city = data["ville"].strip().lower()
        vil = City.query.filter_by(name=in_city).first()
        if vil:
            alert.city_id = vil.id
        else:
            city = City()
            city.name = in_city
            db.session.add(city)
            if reg:
                city.region_id = reg.id
            else:
                city.region_id = region.id
            db.session.commit()
            alert.city_id = city.id

        in_district = data["quartier"].strip().lower()
        dis = District.query.filter_by(name=in_district).first()
        if dis:
            alert.district_id = dis.id
        else:
            district = District()
            district.name = in_district
            if vil:
                district.city_id = vil.id
            else:
                district.city_id = city.id
            db.session.add(district)
            db.session.commit()
            alert.district_id = district.id

        db.session.add(alert)
    db.session.commit()


def main():
    create_db()
    create_location()
    create_region()
    create_cities()
    create_alerts()


if __name__ == "__main__":
    main()
