from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import models
from .db.database import engine
from .routers import pollution_type_router, monitoring_station_router, pollution_info_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI(root_path="/monitoring-api/v1")

origins = [
    "https://localhost:3000",
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pollution_type_router.router)
app.include_router(monitoring_station_router.router)
app.include_router(pollution_info_router.router)