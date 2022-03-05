
from flask_restful import Api
from .cities.controllers import CitiesApi


api = Api()

def create_module(app, **kwargs):
    api.add_resource(CitiesApi, "/api/cities")
    api.init_app(app)