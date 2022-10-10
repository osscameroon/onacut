from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schemas.alert import Alert as AlertSchema
from ..models import Alert as AlertModel
from ..dependencies import get_db

router = APIRouter(
    prefix="/alerts",
    tags=["alerts"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def read_alerts(db: Session = Depends(get_db)):
    data = db.query(AlertModel).all()
    return data


@router.get("/{alert_id}")
async def get_alert(alert_id: int, db: Session = Depends(get_db)):
    data = db.query(AlertModel).filter_by(id=alert_id).first()
    return data


@router.post(
    "/",
    tags=["alerts"],
    responses={403: {"description": "Operation forbidden"}},
)
async def create_alert(alert: AlertSchema, db: Session = Depends(get_db)):
    return {}


@router.put(
    "/{alert_id}",
    tags=["alerts"],
    responses={403: {"description": "Operation forbidden"}},
)
async def update_alert(
    alert_id: int,
    alert: AlertSchema,
    db: Session = Depends(get_db)
):
    return {}


@router.delete(
    "/{alert_id}",
    tags=["alerts"],
    responses={403: {"description": "Operation forbidden"}},
)
async def delete_alert(alert_id: int, db: Session = Depends(get_db)):
    return {}
