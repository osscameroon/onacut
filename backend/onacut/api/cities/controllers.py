from flask import abort
from onacut.models import City
from flask_restful import Resource
from flask_apispec import marshal_with, doc, use_kwargs
from flask_apispec.views import MethodResource
from .parsers import city_get_parser, CityGetParser
from .fields import CityGetResponseSchema


class CitiesApi(MethodResource, Resource):
    @doc(description='GET all Cities.', tags=['Cities'])
    @use_kwargs(CityGetParser, location=("json"))
    @marshal_with(CityGetResponseSchema(many=True))
    def get(self):
        args = city_get_parser.parse_args()
        city_id = args["id"]
        if city_id:
            city = City.query.get(city_id)
            if not city:
                abort(404)
            return [city], 200

        cities = City.query.all()

        return cities, 200
