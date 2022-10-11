from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schemas.city import (City as CitySchema,
                            CityCreate as CityCreateSchema,
                            CityUpdate as CityUpdateSchema)
from ..models import City as CityModel
from ..dependencies import get_db

router = APIRouter(
    prefix="/cities",
    tags=["cities"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "/",
    response_model=List[CitySchema],
    responses={403: {"description": "Operation forbidden"}}
)
async def read_cities(db: Session = Depends(get_db)):
    data = db.query(CityModel).all()
    return data


@router.get(
    "/{city_id}",
    response_model=CitySchema,
    responses={403: {"description": "Operation forbidden"}}
)
async def get_city(city_id: int, db: Session = Depends(get_db)):
    data = db.query(CityModel).filter_by(id=city_id).first()
    return data


@router.post(
    "/",
    response_model=CitySchema,
    responses={403: {"description": "Operation forbidden"}},
)
async def create_city(
    city: CityCreateSchema,
    db: Session = Depends(get_db)
):
    return {}


@router.put(
    "/{city_id}",
    response_model=CitySchema,
    responses={403: {"description": "Operation forbidden"}},
)
async def update_city(
    city_id: int,
    city: CityUpdateSchema,
    db: Session = Depends(get_db)
):
    return {}


@router.delete(
    "/{city_id}",
    responses={403: {"description": "Operation forbidden"}},
)
async def delete_city(city_id: int, db: Session = Depends(get_db)):
    return {}
