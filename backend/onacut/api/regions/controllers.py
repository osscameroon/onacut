from flask import request
from flask_apispec import doc, marshal_with, use_kwargs
from flask_apispec.views import MethodResource
from flask_restful import Resource

from onacut.models import Region

from .fields import RegionGetResponseSchema
from .parsers import RegionGetParser


class RegionsApi(MethodResource, Resource):
    @doc(description="GET all Region.", tags=["Region"])
    @use_kwargs(RegionGetParser, location=("json"))
    @marshal_with(RegionGetResponseSchema(many=True))
    def get(self):
        regions = []
        reg_id = request.args.get("id", None)
        if reg_id:
            region = Region.query.get(reg_id)
            if not region:
                return [], 200
            return [region], 200

        regions = Region.query.all()
        return regions, 200
