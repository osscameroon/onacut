from typing import Union

from pydantic import BaseModel


class RegionBase(BaseModel):
    name: str


class RegionCreate(RegionBase):
    pass


class RegionUpdate(RegionBase):
    id: int


class Region(RegionBase):
    id: int | None
    total_alerts: Union[int, None] = None

    class Config:
        orm_mode = True
