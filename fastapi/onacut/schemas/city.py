from typing import Union

from pydantic import BaseModel


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
    num_alerts: Union[int, None] = None

    class Config:
        orm_mode = True
