import os

class BaseConfig(object):
    DEBUG = False
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class DevConfig(BaseConfig):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BaseConfig.BASE_DIR, "onacut.data")
    SQLALCHEMY_COMMIT_ON_TREARDOWN = True
    SQLALCHEMY_TRACK_MODIFICATION = True


class ProdConfig(BaseConfig):
    pass