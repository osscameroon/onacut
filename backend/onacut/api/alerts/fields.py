from marshmallow import Schema, fields

# from flask_restful import fields


class AlertGetResponseSchema(Schema):
    id = fields.Integer()
    observations = fields.String()
    type = fields.String()
    date = fields.String()
    begin_time = fields.String()
    end_time = fields.String()
    longitude = fields.Float()
    lattitude = fields.Float()
    region = fields.Function(lambda x: x.region.name)
    region_id = fields.Function(lambda x: x.region.id)
    city = fields.Function(lambda x: x.city.name)
    city_id = fields.Function(lambda x: x.city.id)
    district = fields.Function(lambda x: x.district.name)
    district_id = fields.Function(lambda x: x.district.id)
