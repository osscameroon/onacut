from flask_restful import reqparse

city_get_parser = reqparse.RequestParser()
city_get_parser.add_argument(
    "id",
    type=str,
    location=["args", "values", "form", "json", "headers"]
)