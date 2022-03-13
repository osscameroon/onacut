
from flask_restful import Api
from flask_apispec.extension import FlaskApiSpec
from .cities.controllers import CitiesApi
from .alerts.controllers import AlertsApi
from .district.controllers import DistrictsApi


api = Api()
doc = FlaskApiSpec()

def create_module(app, **kwargs):
    api.add_resource(CitiesApi, "/api/cities")
    api.add_resource(DistrictsApi, "/api/districts")
    api.add_resource(AlertsApi, "/api/alerts")
    api.init_app(app)
    doc.init_app(app)
    doc.register(AlertsApi)
    doc.register(CitiesApi)
    doc.register(DistrictsApi)
