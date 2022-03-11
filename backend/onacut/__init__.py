
import os

from flask import Flask, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import ProdConfig, DevConfig
from dotenv import load_dotenv

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