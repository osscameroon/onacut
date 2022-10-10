from typing import List, Union
from pydantic import BaseModel
from datetime import datetime


class District(BaseModel):
    id: int
    name: str
    city_id: int
    total_alerts: int
