from pydantic import BaseModel

from onacut.common import model_to_json


def test_model_to_json():
    """testing if this serializer function works properly"""
    # simple
    assert model_to_json(["ok", 223, None]) == ["ok", 223, None]

    # with pydantic model in a nested way
    class YY(BaseModel):
        value3: float

    class XX(BaseModel):
        value1: str
        value2: YY

    yy = YY(value3=0.99)
    xx = XX(value1="welcome", value2=yy)
    assert model_to_json(
        ["test", 234, {"this": {"oups": {"yy": yy}, "test": xx}}, yy]
    ) == [
        "test",
        234,
        {
            "this": {
                "oups": {"yy": {"value3": 0.99}},
                "test": {"value1": "welcome", "value2": YY(value3=0.99)},
            }
        },
        {"value3": 0.99},
    ]
