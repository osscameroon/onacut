from fastapi import APIRouter

from ..schemas.alert import Alert as AlertSchema 

router = APIRouter(
    prefix="/alerts",
    tags=["alerts"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def read_alerts():
    return []


@router.get("/{alert_id}")
async def get_alert(alert_id: int):
    return {}


@router.post(
    "/",
    tags=["alerts"],
    responses={403: {"description": "Operation forbidden"}},
)
async def create_alert(alert: AlertSchema):
    return {}


@router.put(
    "/{alert_id}",
    tags=["alerts"],
    responses={403: {"description": "Operation forbidden"}},
)
async def update_alert(alert_id: int, alert: AlertSchema):
    return {}


@router.delete(
    "/{alert_id}",
    tags=["alerts"],
    responses={403: {"description": "Operation forbidden"}},
)
async def delete_alert(alert_id: int):
    return {}
