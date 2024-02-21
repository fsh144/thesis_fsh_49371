from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..db import models
from ..db.schemas import pollution_type_schemas as schemas
from ..db.schemas import common_schemas as common
from ..db.database import SessionLocal, engine
from ..db.repository import pollution_type_rep

models.Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/pollution-types", tags=["Pollution Types"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=common.CreatedObjectResponse, status_code=status.HTTP_201_CREATED)
def create_pollution_type(pollution_type: schemas.PollutionTypeCreate, db: Session = Depends(get_db)):
    if pollution_type_rep.check_pollution_type_exists(db, pollution_type.name):
        raise HTTPException(status_code=400, detail="Pollution Type already exists")

    return pollution_type_rep.create_pollution_type(db, pollution_type)


@router.get("/{pollution_type_id}", response_model=schemas.PollutionType)
def get_pollution_type(pollution_type_id: int, db: Session = Depends(get_db)):
    db_pollution_type = pollution_type_rep.get_pollution_type(db, pollution_type_id=pollution_type_id)

    if db_pollution_type is None:
        raise HTTPException(status_code=404, detail="Pollution Type not found")
    return db_pollution_type


@router.get("/", response_model=list[schemas.PollutionType])
def get_pollution_types(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return pollution_type_rep.get_pollution_types_list(db, skip=skip, limit=limit)
