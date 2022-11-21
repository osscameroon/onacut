from typing import List

from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, HTTPException
from onacut.dependencies import get_db
from onacut.models import City as CityModel
from onacut.models import District as DistrictModel
from onacut.schemas.districts import District as DistrictSchema
from onacut.schemas.districts import DistrictCreate as DistrictCreateSchema
from onacut.schemas.districts import DistrictUpdate as DistrictUpdateSchema

router = APIRouter(
    prefix="/districts",
    tags=["districts"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "",
    response_model=List[DistrictSchema],
    responses={403: {"description": "Operation forbidden"}},
)
def read_districts(db: Session = Depends(get_db)):
    data = db.query(DistrictModel).all()
    return data


@router.get(
    "/{district_id}",
    response_model=DistrictSchema,
    responses={403: {"description": "Operation forbidden"}},
)
def get_district(district_id: int, db: Session = Depends(get_db)):
    data = db.query(DistrictModel).filter_by(id=district_id).first()
    return data


@router.post(
    "/",
    response_model=DistrictSchema,
    responses={403: {"description": "Operation forbidden"}},
)
def create_district(district: DistrictCreateSchema, db: Session = Depends(get_db)):
    # check if the provided city's id exists in the database
    city = db.query(CityModel).filter_by(id=district.city_id).first()
    if not city:
        raise HTTPException(status_code=400, detail="Bad city's id!")

    db_district = DistrictModel(**district.dict())
    db.add(db_district)
    db.commit()
    db.refresh(db_district)
    return db_district


@router.put(
    "/{district_id}",
    response_model=DistrictSchema,
    responses={403: {"description": "Operation forbidden"}},
)
def update_district(
    district_id: int, district: DistrictUpdateSchema, db: Session = Depends(get_db)
):
    return {}


@router.delete(
    "/{district_id}",
    responses={403: {"description": "Operation forbidden"}},
)
def delete_district(district_id: int, db: Session = Depends(get_db)):
    district = db.query(DistrictModel).filter_by(id=district_id).first()
    if not district:
        raise HTTPException(status_code=400, detail="Bad district's id!")

    db.delete(district)
    db.commit()
