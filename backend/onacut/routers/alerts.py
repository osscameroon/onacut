from typing import List, Union

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from onacut.dependencies import get_db
from onacut.models import Alert as AlertModel
from onacut.models import City as CityModel
from onacut.models import District as DistrictModel
from onacut.models import Region as RegionModel
from onacut.schemas.alert import Alert as AlertSchema
from onacut.schemas.alert import AlertCreate as AlertCreateSchema
from onacut.schemas.alert import AlertUpdate as AlertUpdateSchema

router = APIRouter(
    prefix="/alerts",
    tags=["alerts"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "",
    response_model=List[AlertSchema],
    responses={403: {"description": "Operation forbidden"}},
)
def read_alerts(
    db: Session = Depends(get_db),
    region: Union[str, None] = Query(default=None),
    city: Union[str, None] = Query(default=None),
    district: Union[str, None] = Query(default=None),
):
    alerts = db.query(AlertModel)

    if region and len(region) > 1:
        region_ = db.query(RegionModel).filter(RegionModel.name.like(region)).first()
        if region_:
            alerts = alerts.filter_by(region_id=region_.id)

    if city and len(city) > 1:
        city_ = db.query(CityModel).filter(CityModel.name.like(city)).first()
        if city_:
            alerts = alerts.filter_by(city_id=city_.id)

    if district and len(district) > 1:
        district_ = (
            db.query(DistrictModel).filter(DistrictModel.name.like(district)).first()
        )

        if district_:
            alerts = alerts.filter_by(district_id=district_.id)

    return list(map(lambda alert: alert.to_dict(), alerts.all()))


@router.get(
    "/{alert_id}",
    response_model=AlertSchema,
    responses={403: {"description": "Operation forbidden"}},
)
def get_alert(alert_id: int, db: Session = Depends(get_db)):
    alert = db.query(AlertModel).filter_by(id=alert_id).first()
    return alert.to_dict()


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
    db_alert = AlertModel(**alert.dict())

    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert.to_dict()


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
    alert = db.query(AlertModel).filter_by(id=alert_id).first()
    if not alert:
        raise HTTPException(status_code=400, detail="Bad alert's id!")

    db.delete(alert)
    db.commit()
