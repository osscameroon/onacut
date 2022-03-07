from flask_restful import reqparse

alert_get_parser = reqparse.RequestParser()
alert_get_parser.add_argument(
    "id",
    type=str,
    location=["args", "values", "form", "json", "headers"]
)