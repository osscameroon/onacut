from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schemas.region import Region as RegionSchema
from ..models import Region as RegionModel
from ..dependencies import get_db

router = APIRouter(
    prefix="/regions",
    tags=["regions"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def read_regions(db: Session = Depends(get_db)):
    data = db.query(RegionModel).all()
    return data


@router.get("/{region_id}")
async def get_region(region_id: int, db: Session = Depends(get_db)):
    data = db.query(RegionModel).filter_by(id=region_id).first()
    return data


@router.post(
    "/",
    tags=["regions"],
    responses={403: {"description": "Operation forbidden"}},
)
async def create_region(region: RegionSchema, db: Session = Depends(get_db)):
    return {}


@router.put(
    "/{region_id}",
    tags=["regions"],
    responses={403: {"description": "Operation forbidden"}},
)
async def update_region(
    region_id: int,
    region: RegionSchema,
    db: Session = Depends(get_db)
):
    return {}


@router.delete(
    "/{region_id}",
    tags=["regions"],
    responses={403: {"description": "Operation forbidden"}},
)
async def delete_region(region_id: int, db: Session = Depends(get_db)):
    return {}
