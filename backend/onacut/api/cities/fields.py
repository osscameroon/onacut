from marshmallow import Schema, fields

from ..locations.fields import LocationGetResponseSchema


def filter_districts(city):
    alerts = city.alerts
    districts = list(map(lambda x: x.district.name, alerts))
    return list(set(districts))


class CityGetResponseSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    longitude = fields.Float()
    lattitude = fields.Float()
    region_id = fields.Function(lambda x: x.region.id)
    num_alerts = fields.Function(lambda x: len(x.alerts))
    alert_districts = fields.Function(filter_districts)
    locations = fields.List(fields.Nested(LocationGetResponseSchema))
