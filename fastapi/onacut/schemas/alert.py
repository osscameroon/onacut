from datetime import date, time
from typing import Union

from pydantic import BaseModel
from pydantic_choices import choice


class AlertBase(BaseModel):
    observations: str
    type: choice(["electricity", "water", "internet"])
    date: date
    begin_time: time
    region_id: int
    longitude: float
    lattitude: float
    city_id: int
    district_id: int


class AlertCreate(AlertBase):
    longitude: Union[float, None] = None
    lattitude: Union[float, None] = None
    end_time: Union[time, None] = None


class AlertUpdate(AlertBase):
    id: int
    longitude: Union[float, None] = None
    lattitude: Union[float, None] = None
    end_time: Union[time, None] = None


class Alert(AlertBase):
    id: int
    end_time: Union[time, None] = None

    class Config:
        orm_mode = True
