from marshmallow import Schema, fields

# from flask_restful import fields


class DistrictGetResponseSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    city_id = fields.Function(lambda x: x.city.id)
    num_alerts = fields.Function(lambda x: len(x.alerts))
