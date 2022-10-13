from typing import Union

from pydantic import BaseModel


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

    class Config:
        orm_mode = True
