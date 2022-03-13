from flask_restful import reqparse
from marshmallow import Schema, fields

district_get_parser = reqparse.RequestParser()
district_get_parser.add_argument(
    "id",
    type=int,
    location=["args", "values", "form", "json", "headers"]
)


class DistrictGetParser(Schema):
    id = fields.Integer(required=False, description="Id of the aler")