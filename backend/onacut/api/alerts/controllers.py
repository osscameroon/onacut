from flask import abort
from flask_apispec import doc, marshal_with, use_kwargs
from flask_apispec.views import MethodResource
from flask_restful import Resource

from onacut.models import Alert, City, District, Region

from .fields import AlertGetResponseSchema
from .parsers import AlertGetParser, alert_get_parser


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
