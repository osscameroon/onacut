from marshmallow import Schema, fields

# from flask_restful import fields


class RegionGetResponseSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    num_alerts = fields.Function(lambda x: len(x.alerts))
