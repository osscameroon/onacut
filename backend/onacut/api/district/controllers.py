import datetime

from onacut import db, app
from onacut.models import District
from flask_restful import Resource
from flask_apispec import marshal_with, doc, use_kwargs
from flask_apispec.views import MethodResource
from .parsers import DistrictGetParser, district_get_parser
from .fields import DistrictGetResponseSchema

class DistrictsApi(MethodResource, Resource):
    @doc(description='GET all Districts.', tags=['Districts'])
    @use_kwargs(DistrictGetParser, location=("json"))
    @marshal_with(DistrictGetResponseSchema(many=True))
    def get(self):
        args = district_get_parser.parse_args()
        district_id = args["id"]
        if district_id:
            district = District.query.get(district_id)
            if not district:
                abort(404)
            return [district], 200
        
        districts = District.query.all()
        
        return districts, 200
