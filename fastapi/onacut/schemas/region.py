from typing import List, Union
from pydantic import BaseModel

from .city import City as CitySchema
from .alert import Alert as AlertSchema


class RegionBase(BaseModel):
    id: int
    name: str
    total_alerts: int


class RegionCreate(RegionBase):
    pass


class RegionUpdate(RegionBase):
    id: int


class Region(RegionBase):
    id: int
    total_alerts: Union[int, None] = None
    cities: Union[List[CitySchema], None] = None
    alerts: Union[List[AlertSchema], None] = None

    class Config:
        orm_mode = True
