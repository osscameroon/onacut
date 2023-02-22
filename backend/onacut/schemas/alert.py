from datetime import date, time
from typing import Literal, Union

from pydantic import BaseModel


class AlertBase(BaseModel):
    observations: Union[str, None] = None
    type: Literal["electricity", "water", "internet"]
    date: date
    begin_time: time
    end_time: Union[time, None] = None
    region_id: int
    longitude: Union[float, None] = None
    lattitude: Union[float, None] = None
    city_id: int
    district_id: int


class AlertCreate(AlertBase):
    pass


class AlertUpdate(AlertCreate, AlertBase):
    id: int


class Alert(AlertBase, BaseModel):
    id: int
    region: str
    city: str
    district: str

    class Config:
        orm_mode = True
