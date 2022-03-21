from marshmallow import Schema, fields


class LocationGetResponseSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    asciiname = fields.String()
    alternativenames = fields.String()
    longitude = fields.String()
    lattitude = fields.String()
