from typing import List, Union
from pydantic import BaseModel
from datetime import datetime


class Alert(BaseModel):
    id: int
    observations: str
    type: str
    date: datetime
    begin_time: datetime
    end_time: datetime
    region_id: int
    longitude: float
    lattitude: float
    city_id: int
    district_id: int
