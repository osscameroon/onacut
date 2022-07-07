from flask import abort
from flask_apispec import doc, marshal_with, use_kwargs
from flask_apispec.views import MethodResource
from flask_restful import Resource
from werkzeug.exceptions import BadRequest

from onacut.models import City

from .fields import CityGetResponseSchema
from .parsers import CityGetParser, city_get_parser


class CitiesApi(MethodResource, Resource):
    @doc(description="GET all Cities.", tags=["Cities"])
    @use_kwargs(CityGetParser, location=("json"))
    @marshal_with(CityGetResponseSchema(many=True))
    def get(self):
        cities = []
        try:
            args = city_get_parser.parse_args()
            city_id = args["id"]
            if city_id:
                city = City.query.get(city_id)
                if not city:
                    abort(404)
                return [city], 200

            return cities, 200

        except BadRequest:
            # that's means no arguments got passed
            cities = City.query.all()

        return cities, 200
