from typing import List, Union
from pydantic import BaseModel


class City(BaseModel):
    id: int
    name: str
    region_id: int
    longitude: float
    lattitude: float
    total_alerts: int
