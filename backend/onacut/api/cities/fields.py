from flask_restful import fields

city_get_fields = {
    "id": fields.Integer(),
    "name": fields.String(),
}