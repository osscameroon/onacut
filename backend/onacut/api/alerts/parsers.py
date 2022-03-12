from flask_restful import reqparse
from marshmallow import Schema, fields

alert_get_parser = reqparse.RequestParser()
alert_get_parser.add_argument(
    "id",
    type=int,
    location=["args", "values", "form", "json", "headers"]
)


class AlertGetParser(Schema):
    id = fields.Integer(required=False, description="Id of the aler")