from typing import List

from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends

from ..dependencies import get_db
from ..models import City as CityModel
from ..schemas.city import City as CitySchema
from ..schemas.city import CityCreate as CityCreateSchema
from ..schemas.city import CityUpdate as CityUpdateSchema

router = APIRouter(
    prefix="/cities",
    tags=["cities"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "/",
    response_model=List[CitySchema],
    responses={403: {"description": "Operation forbidden"}},
)
def read_cities(db: Session = Depends(get_db)):
    datas = db.query(CityModel).all()
    return datas


@router.get(
    "/{city_id}",
    response_model=CitySchema,
    responses={403: {"description": "Operation forbidden"}},
)
def get_city(city_id: int, db: Session = Depends(get_db)):
    data = db.query(CityModel).filter_by(id=city_id).first()
    return data


@router.post(
    "/",
    response_model=CitySchema,
    responses={403: {"description": "Operation forbidden"}},
)
def create_city(city: CityCreateSchema, db: Session = Depends(get_db)):
    return {}


@router.put(
    "/{city_id}",
    response_model=CitySchema,
    responses={403: {"description": "Operation forbidden"}},
)
def update_city(city_id: int, city: CityUpdateSchema, db: Session = Depends(get_db)):
    return {}


@router.delete(
    "/{city_id}",
    responses={403: {"description": "Operation forbidden"}},
)
def delete_city(city_id: int, db: Session = Depends(get_db)):
    return {}
