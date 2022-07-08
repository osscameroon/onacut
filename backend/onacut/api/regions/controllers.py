from flask import abort
from flask_apispec import doc, marshal_with, use_kwargs
from flask_apispec.views import MethodResource
from flask_restful import Resource
from werkzeug.exceptions import BadRequest

from onacut.models import Region

from .fields import RegionGetResponseSchema
from .parsers import RegionGetParser, region_get_parser


class RegionsApi(MethodResource, Resource):
    @doc(description="GET all Region.", tags=["Region"])
    @use_kwargs(RegionGetParser, location=("json"))
    @marshal_with(RegionGetResponseSchema(many=True))
    def get(self):
        regions = []
        try:
            args = region_get_parser.parse_args()
            reg_id = args.get("id", None)
            if reg_id:
                region = Region.query.get(reg_id)
                if not region:
                    abort(404)
                return [region], 200

            regions = Region.query.all()
            return regions, 200

        except BadRequest:
            # FIXME , this is a temp solution 9we should not return results
            # on bad request +that's means no arguments got passed or a weird argument was
            # passed so that the json parsing crashed
            regions = Region.query.all()

        return regions, 200
