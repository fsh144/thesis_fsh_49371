from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..db import models
from ..db.schemas import monitoring_station_schemas as schemas
from ..db.schemas import common_schemas as common
from ..db.database import SessionLocal, engine
from ..db.repository import monitoring_station_rep

models.Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/monitoring-stations", tags=["Monitoring Station"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=common.CreatedObjectResponse, status_code=status.HTTP_201_CREATED)
def create_monitoring_station(monitoring_station: schemas.MonitoringStationCreate, db: Session = Depends(get_db)):
    if monitoring_station_rep.check_monitoring_station_exists(db, monitoring_station.station_number):
        raise HTTPException(status_code=400, detail="Monitoring Station already exists")

    return monitoring_station_rep.create_monitoring_station(db, monitoring_station)


@router.get("/{monitoring_station_id}", response_model=schemas.MonitoringStation)
def get_monitoring_station(monitoring_station_id: int, db: Session = Depends(get_db)):
    db_monitoring_station = monitoring_station_rep.get_monitoring_station(db,
                                                                          monitoring_station_id=monitoring_station_id)

    if db_monitoring_station is None:
        raise HTTPException(status_code=404, detail="Monitoring Station not found")
    return db_monitoring_station


@router.get("/", response_model=list[schemas.MonitoringStation])
def get_monitoring_stations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return monitoring_station_rep.get_monitoring_stations(db, skip=skip, limit=limit)
