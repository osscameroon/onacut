from fastapi import APIRouter, Depends, HTTPException

from ..schemas.region import Region as RegionSchema 

router = APIRouter(
    prefix="/regions",
    tags=["regions"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def read_regions():
    return []


@router.get("/{region_id}")
async def get_region(region_id: int):
    return {}


@router.post(
    "/",
    tags=["regions"],
    responses={403: {"description": "Operation forbidden"}},
)
async def create_region(region: RegionSchema):
    return {}


@router.put(
    "/{region_id}",
    tags=["regions"],
    responses={403: {"description": "Operation forbidden"}},
)
async def update_region(region_id: int, region: RegionSchema):
    return {}


@router.delete(
    "/{region_id}",
    tags=["regions"],
    responses={403: {"description": "Operation forbidden"}},
)
async def delete_region(region_id: int):
    return {}
