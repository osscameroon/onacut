from typing import Union

from pydantic import BaseModel


class RegionBase(BaseModel):
    name: str


class RegionCreate(RegionBase):
    pass # why not just use the RegionBase if this class is empty ?


class RegionUpdate(RegionBase):
    id: int


class Region(RegionBase):
    id: int
    total_alerts: Union[int, None] = None

    class Config:
        orm_mode = True
