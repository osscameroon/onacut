
import os

from config import DevConfig, ProdConfig
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

app = Flask(__name__)

if os.environ.get("FLASK_ENV", "development") == "production":
    app.config.from_object(ProdConfig)
else:
    app.config.from_object(DevConfig)

cors = CORS(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db, render_as_batch=True)

from onacut.api import create_module as api_create_module

api_create_module(app)
