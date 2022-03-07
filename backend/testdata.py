import json

from onacut import app, db
from onacut.models import Alert, Location, City, Quartier, Region

GEO_PATH = "../frontend/src/scripts/list_geo_cm.json"
ALERT_PATH = "../frontend/src/scripts/alerts.json"

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
    regions = ["Yaoundé", "Douala", "Sud-Ouest", "Sud", "Nord-Ouest", "Nord", "Ouest", "Littoral", "Extreme-Nord", "Est", "Centre", "Adamaoua"]
    for region in regions:
        reg = Region()
        reg.name = region
        db.session.add(reg)
    db.session.commit()

def create_villes():
    villes = ["bamenda", "bafoussam", "bertoua", "buea", "douala", "ebolowa", "garoua", "maroua", "ngaoundere", "yaounde"]
    for ville in villes:
        city = City()
        city.name = city
        db.session.add(city)
    db.session.commit()


def main():
    create_db()
    create_location()
    create_region()

if __name__ == "__main__":
    main()