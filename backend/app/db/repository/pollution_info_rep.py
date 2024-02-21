from typing import Optional, Type
from sqlalchemy.orm import Session

from ..models import PollutionInfo
from ...db.schemas import pollution_info_schemas as schemas


def add_pollution_info(db: Session, pollution: schemas.PollutionInfoCreate) -> schemas.PollutionInfo:
    db_pollution = PollutionInfo(**pollution.dict())
    db.add(db_pollution)
    db.commit()
    db.refresh(db_pollution)

    return db_pollution


def get_pollution_info(db: Session, pollution_info_id: int) -> Optional[Type[PollutionInfo]]:
    return db.query(PollutionInfo).filter(PollutionInfo.id == pollution_info_id).first()


def get_pollutions(db: Session, skip: int = 0, limit: int = 100, pollution_type_id: int = None,
                   monitoring_station_id: int = None) -> list[Type[PollutionInfo]]:
    query = db.query(PollutionInfo)

    if pollution_type_id:
        query = query.filter(PollutionInfo.pollution_type_id == pollution_type_id)

    if monitoring_station_id:
        query = query.filter(PollutionInfo.monitoring_station_id == monitoring_station_id)

    return query.offset(skip).limit(limit).all()
