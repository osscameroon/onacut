from flask_restful import reqparse, inputs
from marshmallow import Schema, fields


class MyDateFormat(fields.Raw):
    def format(self, value):
        return value.strftime('%Y-%m-%d')


alert_get_parser = reqparse.RequestParser()
alert_get_parser.add_argument(
    "id", type=int, location=["args", "values", "form", "json", "headers"]
)
alert_get_parser.add_argument(
    "region", type=str, location=["args", "values", "form", "json", "headers"]
)
alert_get_parser.add_argument(
    "city", type=str, location=["args", "values", "form", "json", "headers"]
)
alert_get_parser.add_argument(
    "district", type=str, location=["args", "values", "form", "json", "headers"]
)


class AlertGetParser(Schema):
    id = fields.Integer(required=False, description="Id of the alert")
    region = fields.String(
        required=False, description="Thy name of the region in which the alert are"
    )
    city = fields.String(
        required=False, description="Thy name of the city in which the alert are"
    )
    district = fields.String(
        required=False, description="Thy name of the district in which the alert are"
    )


alert_post_parser = reqparse.RequestParser()
alert_post_parser.add_argument(
    "observations",
    type=str,
    required=True,
    location=["args", "values", "form", "json", "headers"]
)
alert_post_parser.add_argument(
    "date",
    type=inputs.datetime_from_iso8601,
    required=True,
    location=["args", "values", "form", "json", "headers"]
)
alert_post_parser.add_argument(
    "begin_time",
    type=inputs.datetime_from_iso8601,
    required=True,
    location=["args", "values", "form", "json", "headers"]
)
alert_post_parser.add_argument(
    "end_time",
    type=inputs.datetime_from_iso8601,
    required=True,
    location=["args", "values", "form", "json", "headers"]
)
alert_post_parser.add_argument(
    "longitude",
    type=float,
    required=True,
    location=["args", "values", "form", "json", "headers"]
)
alert_post_parser.add_argument(
    "latitude",
    type=float,
    required=True,
    location=["args", "values", "form", "json", "headers"]
)
alert_post_parser.add_argument(
    "region",
    type=str,
    required=True,
    location=["args", "values", "form", "json", "headers"]
)
alert_post_parser.add_argument(
    "city",
    type=str,
    required=True,
    location=["args", "values", "form", "json", "headers"]
)
alert_post_parser.add_argument(
    "district",
    type=str,
    required=True,
    location=["args", "values", "form", "json", "headers"]
)
