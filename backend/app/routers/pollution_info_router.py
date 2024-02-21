from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..db import models
from ..db.schemas import pollution_info_schemas as schemas
from ..db.schemas import common_schemas as common
from ..db.database import SessionLocal, engine
from ..db.repository import pollution_info_rep, monitoring_station_rep, pollution_type_rep

models.Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/pollution-info", tags=["Pollution"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=common.CreatedObjectResponse, status_code=status.HTTP_201_CREATED)
def add_pollution_info(pollution_raw_data: schemas.PollutionInfoRawData, db: Session = Depends(get_db)):
    pollution_type = pollution_raw_data.pollution_type
    monitoring_station = pollution_raw_data.monitoring_station

    pollution_type_id = pollution_type_rep.get_pollution_type_id(db, pollution_type.name)

    if pollution_type_id is None:
        pollution_type_id = pollution_type_rep.create_pollution_type(db, pollution_type).id

    monitoring_station_id = monitoring_station_rep.get_monitoring_station_id(db, monitoring_station.station_number)

    if monitoring_station_id is None:
        monitoring_station_id = monitoring_station_rep.create_monitoring_station(db, monitoring_station).id

    pollution_info = schemas.PollutionInfoCreate(
        pollution_type_id=pollution_type_id,
        monitoring_station_id=monitoring_station_id,
        value=pollution_raw_data.value,
        timestamp=pollution_raw_data.timestamp
    )

    return pollution_info_rep.add_pollution_info(db, pollution_info)


@router.get("/", response_model=list[schemas.PollutionInfoLight])
def get_pollution_info_list(skip: int = 0, limit: int = 100, pollution_type_id: int = None,
                            monitoring_station_id: int = None, db: Session = Depends(get_db)):
    return pollution_info_rep.get_pollutions(db, skip=skip, limit=limit, pollution_type_id=pollution_type_id,
                                             monitoring_station_id=monitoring_station_id)


@router.get("/all-fields", response_model=list[schemas.PollutionInfo])
def get_pollution_info_list_all_fields(skip: int = 0, limit: int = 100, pollution_type_id: int = None,
                            monitoring_station_id: int = None, db: Session = Depends(get_db)):
    return pollution_info_rep.get_pollutions(db, skip=skip, limit=limit, pollution_type_id=pollution_type_id,
                                             monitoring_station_id=monitoring_station_id)


@router.get("/{pollution_info_id}", response_model=schemas.PollutionInfo)
def get_pollution_info(pollution_info_id: int, db: Session = Depends(get_db)):
    db_pollution_info = pollution_info_rep.get_pollution_info(db, pollution_info_id=pollution_info_id)

    if db_pollution_info is None:
        raise HTTPException(status_code=404, detail="Pollution Info not found")
    return db_pollution_info
