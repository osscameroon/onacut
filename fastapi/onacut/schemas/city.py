from typing import List, Union
from pydantic import BaseModel

from .alert import Alert as AlertSchema
from .districts import District as DistrictSchema


class CityBase(BaseModel):
    name: str
    region_id: int
    longitude: float
    lattitude: float
    


class CityCreate(CityBase):
    pass


class CityUpdate(CityBase):
    id: int
    longitude: Union[float, None] = None
    lattitude: Union[float, None] = None


class City(CityBase):
    id: int
    total_alerts: Union[int, None] = None
    alerts: Union[List[AlertSchema], None] = None
    districts: Union[List[DistrictSchema], None] = None

    class Config:
        orm_mode = True
