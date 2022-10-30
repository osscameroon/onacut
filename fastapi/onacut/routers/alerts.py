from typing import List

from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, HTTPException

from ..dependencies import get_db
from ..models import (
    Alert as AlertModel,
    City as CityModel,
    District as DistrictModel,
    Region as RegionModel
)
from ..schemas.alert import Alert as AlertSchema
from ..schemas.alert import AlertCreate as AlertCreateSchema
from ..schemas.alert import AlertUpdate as AlertUpdateSchema

router = APIRouter(
    prefix="/alerts",
    tags=["alerts"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "/",
    response_model=List[AlertSchema],
    responses={403: {"description": "Operation forbidden"}},
)
def read_alerts(db: Session = Depends(get_db)):
    data = db.query(AlertModel).all()
    return data


@router.get(
    "/{alert_id}",
    response_model=AlertSchema,
    responses={403: {"description": "Operation forbidden"}},
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
    # check if the provided region exists in db
    region = db.query(RegionModel).filter_by(id=alert.region_id).first()
    if not region:
        raise HTTPException(status_code=400, detail="Bad region's id!")

    # check if the provided city exists in db
    city = db.query(CityModel).filter_by(id=alert.city_id).first()
    if not city:
        raise HTTPException(status_code=400, detail="Bad city's id!")

    # check if the provided districk exists in db
    district = db.query(DistrictModel).filter_by(id=alert.district_id).first()
    if not district:
        raise HTTPException(status_code=400, detail="Bad district's id!")
    
    # create the new Alert
    db_alert = AlertModel()
    db_alert.observations = alert.observations
    db_alert.type = alert.type
    db_alert.longitude = alert.longitude
    db_alert.lattitude = alert.lattitude
    db_alert.date = alert.date
    db_alert.begin_time = alert.begin_time
    db_alert.end_time = alert.end_time
    db_alert.region_id = alert.region_id
    db_alert.city_id = alert.city_id
    db_alert.district_id = alert.district_id

    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert


@router.put(
    "/{alert_id}",
    response_model=AlertSchema,
    responses={403: {"description": "Operation forbidden"}},
)
def update_alert(
    alert_id: int, alert: AlertUpdateSchema, db: Session = Depends(get_db)
):
    return {}


@router.delete(
    "/{alert_id}",
    responses={403: {"description": "Operation forbidden"}},
)
def delete_alert(alert_id: int, db: Session = Depends(get_db)):
    return {}
