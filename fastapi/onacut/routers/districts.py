from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schemas.districts import District as DistrictSchema
from ..models import District as DistrictModel
from ..dependencies import get_db

router = APIRouter(
    prefix="/districts",
    tags=["districts"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def read_districts(db: Session = Depends(get_db)):
    return []


@router.get("/{district_id}")
async def get_district(district_id: int, db: Session = Depends(get_db)):
    return {}


@router.post(
    "/",
    tags=["districts"],
    responses={403: {"description": "Operation forbidden"}},
)
async def create_district(district: DistrictSchema, db: Session = Depends(get_db)):
    return {}


@router.put(
    "/{district_id}",
    tags=["districts"],
    responses={403: {"description": "Operation forbidden"}},
)
async def update_district(
    district_id: int,
    district: DistrictSchema,
    db: Session = Depends(get_db)
):
    return {}


@router.delete(
    "/{district_id}",
    tags=["districts"],
    responses={403: {"description": "Operation forbidden"}},
)
async def delete_district(district_id: int, db: Session = Depends(get_db)):
    return {}
