from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schemas.city import City as CitySchema
from ..models import City as CityModel
from ..dependencies import get_db

router = APIRouter(
    prefix="/cities",
    tags=["cities"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def read_cities(db: Session = Depends(get_db)):
    data = db.query(CityModel).all()
    return data


@router.post(
    "/",
    tags=["cities"],
    responses={403: {"description": "Operation forbidden"}},
)
async def create_city(city: CitySchema, db: Session = Depends(get_db)):
    return {}


@router.get("/{city_id}")
async def get_city(city_id: int, db: Session = Depends(get_db)):
    return {}


@router.put(
    "/{city_id}",
    tags=["cities"],
    responses={403: {"description": "Operation forbidden"}},
)
async def update_city(city_id: int, db: Session = Depends(get_db)):
    return {}


@router.delete(
    "/{city_id}",
    tags=["cities"],
    responses={403: {"description": "Operation forbidden"}},
)
async def delete_city(city_id: int, db: Session = Depends(get_db)):
    return {}
