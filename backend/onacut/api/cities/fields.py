from marshmallow import Schema, fields

from ..locations.fields import LocationGetResponseSchema


class CityGetResponseSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    locations = fields.List(fields.Nested(LocationGetResponseSchema))
