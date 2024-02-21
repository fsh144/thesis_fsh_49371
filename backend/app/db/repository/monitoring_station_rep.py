from typing import Optional, Type

from sqlalchemy.orm import Session

from ..models import MonitoringStation
from ...db.schemas import monitoring_station_schemas as schemas


def create_monitoring_station(db: Session, monitoring_station: schemas.MonitoringStationCreate) -> MonitoringStation:
    db_monitoring_station = MonitoringStation(**monitoring_station.dict())
    db.add(db_monitoring_station)
    db.commit()
    db.refresh(db_monitoring_station)

    return db_monitoring_station


def get_monitoring_station(db: Session, monitoring_station_id: int) -> Optional[Type[MonitoringStation]]:
    return db.query(MonitoringStation).filter(MonitoringStation.id == monitoring_station_id).first()


def get_monitoring_station_id(db: Session, station_number: int) -> int:
    return db.query(MonitoringStation.id).filter(MonitoringStation.station_number == station_number).scalar()


def get_monitoring_stations(db: Session, skip: int = 0, limit: int = 100) -> list[Type[MonitoringStation]]:
    return db.query(MonitoringStation).offset(skip).limit(limit).all()


def check_monitoring_station_exists(db: Session, station_number: int) -> bool:
    query = db.query(MonitoringStation).filter(MonitoringStation.station_number == station_number)

    return db.query(query.exists()).scalar()
