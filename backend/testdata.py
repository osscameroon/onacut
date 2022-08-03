import json
import re
import requests
import random
from datetime import datetime, timedelta

from onacut import db
from onacut.models import Alert, City, District, Location, Region

GEO_PATH = "../frontend/src/scripts/list_geo_cm.json"
ALERT_PATH = "../frontend/src/scripts/alerts.json"
UNITS = {"S": "seconds", "M": "minutes", "H": "hours", "D": "days", "W": "weeks"}

SOME_CITIES = [
    {"name": "bamenda", "region": "sud-ouest", "longlat": [5.914395, 10.129316]},
    {"name": "bafoussam", "region": "ouest", "longlat": [5.468774, 10.420834]},
    {"name": "bertoua", "region": "est", "longlat": [4.558081, 13.662206]},
    {"name": "buea", "region": "nord-ouest", "longlat": [4.155587, 9.232463]},
    {"name": "douala", "region": "littoral", "longlat": [4.03222, 9.706715]},
    {"name": "ebolowa", "region": "sud", "longlat": [2.891746, 11.15648]},
    {"name": "yaounde", "region": "centre", "longlat": [3.826985, 11.495974]},
    {"name": "garoua", "region": "nord", "longlat": [7.349664, 13.577051]},
    {"name": "ngaoundere", "region": "adamaoua", "longlat": [7.349664, 13.577051]},
    {"name": "maroua", "region": "extreme-nord", "longlat": [10.588261, 14.350791]},
]


def convert_to_seconds(s):
    return int(
        timedelta(
            **{
                UNITS.get(m.group("unit").lower(), "seconds"): float(m.group("val"))
                for m in re.finditer(
                    r"(?P<val>\d+(\.\d+)?)(?P<unit>[smhdw]?)", s, flags=re.I
                )
            }
        ).total_seconds()
    )


def filter_cameron_points(points):
    results = []
    for point in points:
        if (
            "cameroun" in point["display_name"].lower()
            or "cameroon" in point["display_name"].lower()
            or "kamerun" in point["display_name"].lower()
        ):
            results.append(point)
    return results


def get_city_location(city: str):
    endpoint = f"https://nominatim.openstreetmap.org/search.php?q={city}&format=json"

    points = filter_cameron_points(requests.get(endpoint).json())
    if points:
        index = random.randint(0, len(points) - 1)
        location = points[index]
        return location
    else:
        return None


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
        "adamaoua",
    ]
    for region in regions:
        reg = Region()
        reg.name = region
        db.session.add(reg)
    db.session.commit()


def create_cities():
    for _city in SOME_CITIES:
        point = get_city_location(_city["name"])
        city = City()
        city.name = _city["name"]
        city.longitude = point["lon"] if point else 0.0
        city.lattitude = point["lat"] if point else 0.0
        reg = Region.query.filter_by(name=_city["region"]).first()

        if reg:
            city.region_id = reg.id
        else:
            reg = Region()
            reg.name = _city["region"]
            db.session.add(reg)
            city.region_id = reg.id

        longlat = _city["longlat"]

        exist_loc = Location.query.filter_by(
            longitude=longlat[0], lattitude=longlat[1]
        ).first()
        if exist_loc:
            city.locations.append(exist_loc)
        else:
            loc = Location()
            loc.name = _city["name"]
            loc.asciiname = _city["name"]
            loc.longitude, loc.lattitude = longlat
            db.session.add(loc)
            city.locations.append(loc)

        db.session.add(city)
    db.session.commit()


def create_alerts():
    with open(ALERT_PATH, "r", encoding="utf-8") as f:
        datas = json.load(f)

    for data in datas:
        alert = Alert()
        alert.observations = data["observations"]
        alert.type = "electricity"
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

        in_city = data["ville"].split(",")[0].strip().lower()
        point = get_city_location(in_city)
        vil = City.query.filter_by(name=in_city).first()
        if vil:
            alert.city_id = vil.id
        else:
            city = City()
            city.name = in_city
            city.longitude = point["lon"] if point else 0.0
            city.lattitude = point["lat"] if point else 0.0
            db.session.add(city)
            if reg:
                city.region_id = reg.id
            else:
                city.region_id = region.id
            db.session.commit()
            alert.city_id = city.id

        alert.longitude = point["lon"] if point else 0.0
        alert.lattitude = point["lat"] if point else 0.0
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
