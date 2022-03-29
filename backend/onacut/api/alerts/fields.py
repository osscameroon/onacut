from marshmallow import Schema, fields

# from flask_restful import fields


class AlertGetResponseSchema(Schema):
    id = fields.Integer()
    observations = fields.String()
    date = fields.String()
    begin_time = fields.String()
    end_time = fields.String()
    longitude = fields.Float()
    lattitude = fields.Float()
    region = fields.Function(lambda x: x.region.name)
    city = fields.Function(lambda x: x.city.name)
    district = fields.Function(lambda x: x.district.name)
