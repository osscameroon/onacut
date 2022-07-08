from flask import abort
from flask_apispec import doc, marshal_with, use_kwargs
from flask_apispec.views import MethodResource
from flask_restful import Resource
from werkzeug.exceptions import BadRequest

from onacut.models import Alert, City, District, Region

from .fields import AlertGetResponseSchema
from .parsers import AlertGetParser, alert_get_parser


class AlertsApi(MethodResource, Resource):
    @doc(description="GET all Alerts.", tags=["Alerts"])
    @use_kwargs(AlertGetParser, location=("json"))
    @marshal_with(AlertGetResponseSchema(many=True))
    def get(self):
        try:
            args = alert_get_parser.parse_args()

            alert_id = args.get("id", None)
            region_name = args.get("region", None)
            city_name = args.get("city", None)
            district_name = args.get("district", None)

            alerts = Alert.query

            if alert_id:
                alert = alerts.get(alert_id)
                if not alert:
                    abort(404)
                return [alert], 200

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
        except BadRequest:
            # FIXME , this is a temp solution 9we should not return results
            # on bad request +that's means no arguments got passed or a weird argument was
            # passed so that the json parsing crashed
            alerts = Alert.query

        return alerts.all(), 200
