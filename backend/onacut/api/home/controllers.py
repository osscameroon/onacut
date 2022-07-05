from flask_apispec import doc
from flask_apispec.views import MethodResource
from flask_restful import Resource


class Home(MethodResource, Resource):
    @doc(description="Home", tags=[""])
    def get(self):
        return {"status": "success", "message": "API up and running..."}, 200
