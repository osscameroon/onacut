import datetime

from onacut import db, app
from onacut.models import City
from flask_restful import Resource, fields, marshal_with
from .parsers import city_get_parser
from .fields import city_get_fields

def format_city(city):
    return {
        "id": city.id,
        "name": city.name
    }

class CitiesApi(Resource):
    @marshal_with(city_get_fields)
    def get(self):
        args = city_get_parser.parse_args()
        city_id = args["id"]
        if city_id:
            city = City.query.get()
            if not alert:
                abort(404)
            return format_city(alert), 200
        
        cities = City.query.all()
        return [format_city(city) for city in cities], 200

    def post(self):
        pass

    def put(self):
        pass

    def delete(self):
        pass