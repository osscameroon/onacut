from flask_restful import reqparse
from marshmallow import Schema, fields

city_get_parser = reqparse.RequestParser()
city_get_parser.add_argument(
    "id", type=int, location=["args", "values", "form", "json", "headers"]
)


class CityGetParser(Schema):
    id = fields.Integer(required=False, description="Id of the aler")
