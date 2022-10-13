from typing import List, Union
from pydantic import BaseModel

from .alert import Alert as AlertSchema


class DistrictBase(BaseModel):
    name: str
    city_id: int


class DistrictCreate(DistrictBase):
    pass


class DistrictUpdate(DistrictBase):
    id: int


class District(DistrictBase):
    id: int
    total_alerts: Union[int, None] = None
    alerts: Union[List[AlertSchema], None] = None

    class Config:
        orm_mode = True
