from typing import Optional, Type
from sqlalchemy.orm import Session

from ..models import PollutionType
from ...db.schemas import pollution_type_schemas as schemas


def create_pollution_type(db: Session, pollution_type: schemas.PollutionTypeCreate) -> PollutionType:
    db_pollution_type = PollutionType(**pollution_type.dict())
    db.add(db_pollution_type)
    db.commit()
    db.refresh(db_pollution_type)

    return db_pollution_type


def get_pollution_type(db: Session, pollution_type_id: int) -> Optional[Type[PollutionType]]:
    return db.query(PollutionType).filter(PollutionType.id == pollution_type_id).first()


def get_pollution_type_id(db: Session, name: str) -> int:
    return db.query(PollutionType.id).filter(PollutionType.name == name).scalar()

def get_pollution_types_list(db: Session, skip: int = 0, limit: int = 100) -> list[Type[PollutionType]]:
    return db.query(PollutionType).offset(skip).limit(limit).all()


def check_pollution_type_exists(db: Session, name: str) -> bool:
    query = db.query(PollutionType).filter(PollutionType.name == name)

    return db.query(query.exists()).scalar()
