from flask_apispec.extension import FlaskApiSpec
from flask_restful import Api

from .alerts.controllers import AlertsApi
from .cities.controllers import CitiesApi
from .district.controllers import DistrictsApi
from .regions.controllers import RegionsApi

api = Api()
doc = FlaskApiSpec()


def create_module(app, **kwargs):
    api.add_resource(CitiesApi, "/api/cities")
    api.add_resource(DistrictsApi, "/api/districts")
    api.add_resource(AlertsApi, "/api/alerts")
    api.add_resource(RegionsApi, "/api/regions")
    api.init_app(app)
    doc.init_app(app)
    doc.register(AlertsApi)
    doc.register(CitiesApi)
    doc.register(RegionsApi)
    doc.register(DistrictsApi)
