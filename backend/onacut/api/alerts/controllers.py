import datetime

from flask import request
from flask_apispec import doc, marshal_with, use_kwargs
from flask_apispec.views import MethodResource
from flask_restful import Resource

from onacut.models import Alert, City, District, Region

from .fields import AlertGetResponseSchema
from .parsers import AlertGetParser
from onacut import db


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

    def post(self):
        alert = Alert(
            region_id=request.json['region_id'],
            city_id=request.json['city_id'],
            district_id=request.json['district_id'],
            type=request.json['type'],
            observations=request.json['observations'],
            lattitude=request.json['lattitude'],
            longitude=request.json['longitude'],
            date=datetime.datetime.now().date(),
            begin_time=datetime.datetime.now().time(),
            end_time=datetime.datetime.now().time()
        )

        print(alert)

        db.session.add(alert)
        db.session.commit()
        return {
            "message": "Success"
        }

    def put(self, alert_id):
        alerts = Alert.query.all()
        if alert_id not in alerts:
            return {
                "message": f"Error the alert with ID { alert_id } doesn't exit"
            }
        alert = alerts[alert_id]
        if 'observations' in request.json:
            alert['observations'] = request.json['observations']
        if 'type' in request.json:
            alert['type'] = request.json['type']
        if 'date' in request.json:
            alert['date'] = request.json['date']
        if 'begin_time' in request.json:
            alert['begin_time'] = request.json['begin_time']
        if 'end_time' in request.json:
            alert['end_time'] = request.json['end_time']
        if 'longitude' in request.json:
            alert['longitude'] = request.json['longitude']
        if 'lattitude' in request.json:
            alert['lattitude'] = request.json['lattitude']
        if 'region_id' in request.json:
            alert['region_id'] = request.json['region_id']
        if 'city_id' in request.json:
            alert['city_id'] = request.json['city_id']
        if 'district_id' in request.json:
            alert['district_id'] = request.json['district_id']
        return {
            200: {
                "message": "Successfully edited the alert"
            }
        }
