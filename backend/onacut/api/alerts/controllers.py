from flask import request
from flask_apispec import doc, marshal_with, use_kwargs
from flask_apispec.views import MethodResource
from flask_restful import Resource

from onacut.models import Alert, City, District, Region

from .fields import AlertGetResponseSchema
from .parsers import AlertGetParser


class AlertsApi(MethodResource, Resource):
    @doc(description="GET all Alerts.", tags=["Alerts"])
    @use_kwargs(AlertGetParser, location=("json"))
    @marshal_with(AlertGetResponseSchema(many=True))
    def get(self):

        alert_id = request.args.get("id", None)
        region_name = request.args.get("region", None)
        city_name = request.args.get("city", None)
        district_name = request.args.get("district", None)

        alerts = Alert.query

        if alert_id:
            alert = alerts.get(alert_id)
            if not alert:
                return [], 200
            return [alert], 200

        if region_name:
            region = Region.query.filter_by(name=region_name.lower()).first()
            if not region:
                return [], 200

            alerts = alerts.filter_by(region_id=region.id)

        if city_name:
            city = City.query.filter_by(name=city_name.lower()).first()
            if not city:
                return [], 200

            alerts = alerts.filter_by(city_id=city.id)

        if district_name:
            district = District.query.filter_by(name=district_name.lower()).first()
            if not district:
                return [], 200

            alerts = alerts.filter_by(district_id=district.id)

        return alerts.all(), 200
