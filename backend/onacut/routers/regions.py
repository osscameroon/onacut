from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from onacut.dependencies import get_db
from onacut.models import Region as RegionModel
from onacut.schemas.region import Region as RegionSchema
from onacut.schemas.region import RegionCreate as RegionCreateSchema
from onacut.schemas.region import RegionUpdate as RegionUpdateSchema

router = APIRouter(
    prefix="/regions",
    tags=["regions"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "",
    response_model=List[RegionSchema],
    responses={403: {"description": "Operation forbidden"}},
)
def read_regions(db: Session = Depends(get_db)):
    regions = db.query(RegionModel)
    return list(map(lambda region: region.to_dict(), regions.all()))


@router.get(
    "/{region_id}",
    response_model=RegionSchema,
    responses={403: {"description": "Operation forbidden"}},
)
def get_region(region_id: int, db: Session = Depends(get_db)):
    region = db.query(RegionModel).filter_by(id=region_id).first()
    return region.to_dict()


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
    region = db.query(RegionModel).filter_by(id=region_id).first()
    if not region:
        raise HTTPException(status_code=400, detail="Bad region's id!")

    db.delete(region)
    db.commit()
