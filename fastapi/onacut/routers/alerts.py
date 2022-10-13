from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schemas.alert import (Alert as AlertSchema,
                             AlertCreate as AlertCreateSchema,
                             AlertUpdate as AlertUpdateSchema)
from ..models import Alert as AlertModel
from ..dependencies import get_db

router = APIRouter(
    prefix="/alerts",
    tags=["alerts"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "/",
    response_model=List[AlertSchema],
    responses={403: {"description": "Operation forbidden"}}
)
def read_alerts(db: Session = Depends(get_db)):
    data = db.query(AlertModel).all()
    return data


@router.get(
    "/{alert_id}",
    response_model=AlertSchema,
    responses={403: {"description": "Operation forbidden"}}
)
def get_alert(alert_id: int, db: Session = Depends(get_db)):
    data = db.query(AlertModel).filter_by(id=alert_id).first()
    return data


@router.post(
    "/",
    response_model=AlertSchema,
    responses={403: {"description": "Operation forbidden"}},
)
def create_alert(alert: AlertCreateSchema, db: Session = Depends(get_db)):
    return {}


@router.put(
    "/{alert_id}",
    response_model=AlertSchema,
    responses={403: {"description": "Operation forbidden"}},
)
def update_alert(
    alert_id: int,
    alert: AlertUpdateSchema,
    db: Session = Depends(get_db)
):
    return {}


@router.delete(
    "/{alert_id}",
    responses={403: {"description": "Operation forbidden"}},
)
def delete_alert(alert_id: int, db: Session = Depends(get_db)):
    return {}
