import datetime

from onacut import db, app
from flask import abort
from onacut.models import City, Alert
from flask_restful import Resource, fields, marshal_with
from .parsers import alert_get_parser
from .fields import alert_get_fields

def format_alert(alert: Alert):
    return {
        "id": alert.id,
        "observations": alert.observations,
        "date": alert.date,
        "begin_time": alert.begin_time,
        "end_time": alert.end_time,
        "region": alert.region.name,
        "city": alert.city.name,
        "quatier": alert.quartier.name
    }

class AlertsApi(Resource):
    @marshal_with(alert_get_fields)
    def get(self):
        args = alert_get_parser.parse_args()
        alert_id = args["id"]
        if alert_id:
            alert = Alert.query.get()
            if not alert:
                abort(404)
            return format_alert(alert), 200
        
        alerts = Alert.query.all()
        return [format_alert(alert) for alert in alerts], 200

    def post(self):
        pass

    def put(self):
        pass

    def delete(self):
        pass