from typing import List, Union
from pydantic import BaseModel


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

    class Config:
        orm_mode = True
