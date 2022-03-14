import os

from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin


class BaseConfig(object):
    DEBUG = False
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class DevConfig(BaseConfig):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BaseConfig.BASE_DIR, "onacut.data")
    SQLALCHEMY_COMMIT_ON_TREARDOWN = True
    SQLALCHEMY_TRACK_MODIFICATION = True
    APISPEC_SPEC = APISpec(
        title="OnaCut API",
        version="v1",
        plugins=[MarshmallowPlugin()],
        openapi_version="2.0.0"
    )
    APISPEC_SWAGGER_URL = "/swagger/"
    APISPEC_SWAGGER_UI_URL = "/swagger-ui/"


class ProdConfig(BaseConfig):
    pass
