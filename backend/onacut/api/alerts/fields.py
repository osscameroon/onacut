from flask_restful import fields

alert_get_fields = {
    "id": fields.Integer(),
    "observations": fields.String(),
    "date": fields.String(),
    "begin_time": fields.String(),
    "end_time": fields.String(),
    "region": fields.String(),
    "city": fields.String(),
    "quatier": fields.String()
}