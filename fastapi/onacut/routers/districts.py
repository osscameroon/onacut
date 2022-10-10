from fastapi import APIRouter

from ..schemas.districts import District as DistrictSchema 

router = APIRouter(
    prefix="/districts",
    tags=["districts"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def read_districts():
    return []


@router.get("/{district_id}")
async def get_district(district_id: int):
    return {}


@router.post(
    "/",
    tags=["districts"],
    responses={403: {"description": "Operation forbidden"}},
)
async def create_district(district: DistrictSchema):
    return {}


@router.put(
    "/{district_id}",
    tags=["districts"],
    responses={403: {"description": "Operation forbidden"}},
)
async def update_district(district_id: int, district: DistrictSchema):
    return {}


@router.delete(
    "/{district_id}",
    tags=["districts"],
    responses={403: {"description": "Operation forbidden"}},
)
async def delete_district(district_id: int):
    return {}
