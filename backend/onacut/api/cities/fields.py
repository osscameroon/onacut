from marshmallow import Schema, fields
# from flask_restful import fields


class CityGetResponseSchema(Schema):
    id = fields.Integer()
    name = fields.String()
