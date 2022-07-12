from flask import abort
from flask_apispec import doc, marshal_with, use_kwargs
from flask_apispec.views import MethodResource
from flask_restful import Resource
from werkzeug.exceptions import BadRequest

from onacut import db
from onacut.models import Alert, City, District, Region

from .fields import AlertGetResponseSchema, AlertPostResponseSchema
from .parsers import AlertGetParser, AlertPostParser, alert_get_parser, alert_post_parser


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
    
    @doc(description="POST an Alert.", tags=["Alerts"])
    @use_kwargs(AlertPostParser, location=("json"))
    @marshal_with(AlertPostResponseSchema())
    def post(self):
        args = alert_post_parser.parse_args()

        city = City.query.filter_by(name=args["city"].lower()).first()
        if not city:
            city = City()
            city.name = args["city"].lower()
            db.session.add(city)

        district = District.query.filter_by(name=args["district"].lower()).first()
        if not district:
            district = District()
            district.name = args["district"].lower()
            db.session.add(district)

        region = Region.query.filter_by(name=args["region"].lower()).first()
        if not region:
            region = Region()
            region.name = args["region"].lower()
            db.session.add(region)
    
        try:
            alert = Alert()
            alert.observations = args["observations"]
            alert.date = args["date"]
            alert.begin_time = args["begin_time"]
            alert.end_time = args["end_time"]
            alert.longitude = args["longitude"]
            alert.lattitude = args["latitude"]
            alert.city_id = city.id
            alert.district_id = district.id
            alert.region_id = region.id

            db.session.add(alert)
            db.session.commit()
            return {"ok": True}, 201
        except:
            return {"ok": False}, 500
