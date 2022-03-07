
from flask_restful import Api
from .cities.controllers import CitiesApi
from .alerts.controllers import AlertsApi


api = Api()

def create_module(app, **kwargs):
    api.add_resource(CitiesApi, "/api/cities")
    api.add_resource(AlertsApi, "/api/alerts")
    api.init_app(app)