from marshmallow import Schema, fields

from ..locations.fields import LocationGetResponseSchema


class CityGetResponseSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    longitude = fields.Float()
    lattitude = fields.Float()
    locations = fields.List(fields.Nested(LocationGetResponseSchema))
