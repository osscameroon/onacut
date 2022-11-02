from typing import Union

from pydantic import BaseModel


class DistrictBase(BaseModel):
    name: str


class DistrictCreate(DistrictBase):
    city_id: int


class DistrictUpdate(DistrictBase):
    id: int
    city_id: int


class District(DistrictUpdate, DistrictBase):
    total_alerts: Union[int, None] = None

    class Config:
        orm_mode = True
