from flask import abort
from onacut.models import Region
from flask_restful import Resource
from flask_apispec import marshal_with, doc, use_kwargs
from flask_apispec.views import MethodResource
from .parsers import region_get_parser, RegionGetParser
from .fields import RegionGetResponseSchema


class RegionsApi(MethodResource, Resource):
    @doc(description="GET all Region.", tags=["Region"])
    @use_kwargs(RegionGetParser, location=("json"))
    @marshal_with(RegionGetResponseSchema(many=True))
    def get(self):
        args = region_get_parser.parse_args()
        reg_id = args["id"]
        if reg_id:
            region = Region.query.get(reg_id)
            if not region:
                abort(404)
            return [region], 200

        regions = Region.query.all()

        return regions, 200
