from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schemas.districts import (District as DistrictSchema,
                                 DistrictCreate as DistrictCreateSchema,
                                 DistrictUpdate as DistrictUpdateSchema)
from ..models import District as DistrictModel
from ..dependencies import get_db

router = APIRouter(
    prefix="/districts",
    tags=["districts"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "/",
    response_model=List[DistrictSchema],
    responses={403: {"description": "Operation forbidden"}}
)
def read_districts(db: Session = Depends(get_db)):
    data = db.query(DistrictModel).all()
    return data


@router.get(
    "/{district_id}",
    response_model=DistrictSchema,
    responses={403: {"description": "Operation forbidden"}}
)
def get_district(district_id: int, db: Session = Depends(get_db)):
    data = db.query(DistrictModel).filter_by(id=district_id).first()
    return data


@router.post(
    "/",
    response_model=DistrictSchema,
    responses={403: {"description": "Operation forbidden"}},
)
def create_district(
    district: DistrictCreateSchema,
    db: Session = Depends(get_db)
):
    return {}


@router.put(
    "/{district_id}",
    response_model=DistrictSchema,
    responses={403: {"description": "Operation forbidden"}},
)
def update_district(
    district_id: int,
    district: DistrictUpdateSchema,
    db: Session = Depends(get_db)
):
    return {}


@router.delete(
    "/{district_id}",
    responses={403: {"description": "Operation forbidden"}},
)
def delete_district(
    district_id: int,
    db: Session = Depends(get_db)
):
    return {}
