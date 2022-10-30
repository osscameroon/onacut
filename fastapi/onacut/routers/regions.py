from typing import List

from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends

from ..dependencies import get_db
from ..models import Region as RegionModel
from ..schemas.region import Region as RegionSchema
from ..schemas.region import RegionCreate as RegionCreateSchema
from ..schemas.region import RegionUpdate as RegionUpdateSchema

router = APIRouter(
    prefix="/regions",
    tags=["regions"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "/",
    response_model=List[RegionSchema],
    responses={403: {"description": "Operation forbidden"}},
)
def read_regions(db: Session = Depends(get_db)):
    data = db.query(RegionModel).all()
    return data


@router.get(
    "/{region_id}",
    response_model=RegionSchema,
    responses={403: {"description": "Operation forbidden"}},
)
def get_region(region_id: int, db: Session = Depends(get_db)):
    data = db.query(RegionModel).filter_by(id=region_id).first()
    return data


@router.post(
    "/",
    response_model=RegionSchema,
    responses={403: {"description": "Operation forbidden"}},
)
def create_region(region: RegionCreateSchema, db: Session = Depends(get_db)):
    db_region = RegionModel(**region.dict())
    db.add(db_region)
    db.commit()
    db.refresh(db_region)
    return db_region


@router.put(
    "/{region_id}",
    response_model=RegionSchema,
    responses={403: {"description": "Operation forbidden"}},
)
def update_region(
    region_id: int, region: RegionUpdateSchema, db: Session = Depends(get_db)
):
    return {}


@router.delete(
    "/{region_id}",
    tags=["regions"],
    responses={403: {"description": "Operation forbidden"}},
)
def delete_region(region_id: int, db: Session = Depends(get_db)):
    return {}
