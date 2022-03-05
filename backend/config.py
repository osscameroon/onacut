import os

class BaseConfig(object):
    DEBUG = False


class DevConfig(BaseConfig):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///onacut.data"
    SQLALCHEMY_COMMIT_ON_TREARDOWN = True
    SQLALCHEMY_TRACK_MODIFICATION = True


class ProdConfig(BaseConfig):
    pass