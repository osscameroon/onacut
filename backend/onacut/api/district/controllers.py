from flask import request
from flask_apispec import doc, marshal_with, use_kwargs
from flask_apispec.views import MethodResource
from flask_restful import Resource

from onacut.models import District

from .fields import DistrictGetResponseSchema
from .parsers import DistrictGetParser


class DistrictsApi(MethodResource, Resource):
    @doc(description="GET all Districts.", tags=["Districts"])
    @use_kwargs(DistrictGetParser, location=("json"))
    @marshal_with(DistrictGetResponseSchema(many=True))
    def get(self):
        district_id = request.args.get("id", None)
        if district_id:
            district = District.query.get(district_id)
            if not district:
                return [], 200
            return [district], 200

        districts = District.query.all()

        return districts, 200
