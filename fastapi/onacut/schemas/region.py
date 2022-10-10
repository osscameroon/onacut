from typing import List, Union
from pydantic import BaseModel
from datetime import datetime


class Region(BaseModel):
    id: int
    name: str
