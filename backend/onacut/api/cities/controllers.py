from flask import request
from flask_apispec import doc, marshal_with, use_kwargs
from flask_apispec.views import MethodResource
from flask_restful import Resource

from onacut.models import City

from .fields import CityGetResponseSchema
from .parsers import CityGetParser


class CitiesApi(MethodResource, Resource):
    @doc(description="GET all Cities.", tags=["Cities"])
    @use_kwargs(CityGetParser, location=("json"))
    @marshal_with(CityGetResponseSchema(many=True))
    def get(self):
        cities = []
        city_id = request.args.get("id", None)
        if city_id:
            city = City.query.get(city_id)
            if not city:
                return [], 200

            return [city], 200

        cities = City.query.all()
        return cities, 200
