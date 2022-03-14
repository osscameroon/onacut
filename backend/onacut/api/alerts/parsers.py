from flask_restful import reqparse
from marshmallow import Schema, fields

alert_get_parser = reqparse.RequestParser()
alert_get_parser.add_argument(
    "id",
    type=int,
    location=["args", "values", "form", "json", "headers"]
)
alert_get_parser.add_argument(
    "region",
    type=str,
    location=["args", "values", "form", "json", "headers"]
)
alert_get_parser.add_argument(
    "city",
    type=str,
    location=["args", "values", "form", "json", "headers"]
)
alert_get_parser.add_argument(
    "district",
    type=str,
    location=["args", "values", "form", "json", "headers"]
)


class AlertGetParser(Schema):
    id = fields.Integer(
        required=False,
        description="Id of the alert")
    region = fields.String(
        required=False,
        description="Thy name of the region in which the alert are")
    city = fields.String(
        required=False,
        description="Thy name of the city in which the alert are")
    district = fields.String(
        required=False,
        description="Thy name of the district in which the alert are")
