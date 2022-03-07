import json
import re

from datetime import datetime, timedelta

from onacut import app, db
from onacut.models import Alert, Location, City, Quartier, Region

GEO_PATH = "../frontend/src/scripts/list_geo_cm.json"
ALERT_PATH = "../frontend/src/scripts/alerts.json"
UNITS = {'S':'seconds', 'M':'minutes', 'H':'hours', 'D':'days', 'W':'weeks'}

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
    regions = ["Yaounde", "Douala", "Sud-Ouest", "Sud", "Nord-Ouest", "Nord", "Ouest", "Littoral", "Extreme-Nord", "Est", "Centre", "Adamaoua"]
    for region in regions:
        reg = Region()
        reg.name = region
        db.session.add(reg)
    db.session.commit()

def create_villes():
    villes = ["bamenda", "bafoussam", "bertoua", "buea", "douala", "ebolowa", "garoua", "maroua", "ngaoundere", "yaounde"]
    for ville in villes:
        city = City()
        city.name = ville
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

        in_quartier = data["quartier"].strip().lower()
        qua = Quartier.query.filter_by(name=in_quartier).first()
        if qua:
            alert.quartier_id = qua.id
        else:
            quartier = Quartier()
            quartier.name = in_quartier
            db.session.add(quartier)
            db.session.commit()
            alert.quartier_id = quartier.id
        in_city = data["ville"].strip().lower()
        vil = City.query.filter_by(name=in_city).first()
        if vil:
            alert.city_id = vil.id
        else:
            city = City()
            city.name = in_city
            db.session.add(city)
            db.session.commit()
            alert.city_id = city.id

        db.session.add(alert)
    db.session.commit()


def main():
    create_db()
    create_location()
    create_region()
    create_villes()
    create_alerts()

if __name__ == "__main__":
    main()