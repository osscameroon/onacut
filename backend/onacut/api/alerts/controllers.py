import datetime

from onacut import db, app
from flask import abort
from onacut.models import City, Region, District, Alert
from flask_restful import Resource, fields
from flask_apispec import marshal_with, doc, use_kwargs
from flask_apispec.views import MethodResource
from .parsers import alert_get_parser, AlertGetParser
from .fields import AlertGetResponseSchema

class AlertsApi(MethodResource, Resource):
    @doc(description='GET all Alerts.', tags=['Alerts'])
    @use_kwargs(AlertGetParser, location=("json"))
    @marshal_with(AlertGetResponseSchema(many=True))
    def get(self):
        args = alert_get_parser.parse_args()
        alert_id = args["id"]
        region_name = args["region"]
        city_name = args["city"]
        district_name = args["district"]

        if alert_id:
            alert = Alert.query.get(alert_id)
            if not alert:
                abort(404)
            return [alert], 200
        
        alerts = Alert.query

        if region_name:
            region = Region.query.filter_by(name=region_name.lower()).first()
            if not region:
                abort(404)

            alerts = alerts.filter_by(region_id=region.id)

        if city_name:
            city = City.query.filter_by(name=city_name.lower()).first()
            if not city:
                abort(404)

            alerts = alerts.filter_by(city_id=city.id)

        if district_name:
            district = District.query.filter_by(name=district_name.lower()).first()
            if not district:
                abort(404)

            alerts = alerts.filter_by(district_id=district.id)
        
        return alerts.all(), 200