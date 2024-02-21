from datetime import datetime

from sqlalchemy import ForeignKey, Integer, String, TIMESTAMP, Double
from sqlalchemy.orm import relationship, Mapped, mapped_column

from .database import Base


class PollutionType(Base):
    __tablename__ = "pollution_types"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True)
    displayName: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    unit: Mapped[str] = mapped_column(String)


class MonitoringStation(Base):
    __tablename__ = "monitoring_stations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    station_number: Mapped[int] = mapped_column(Integer, unique=True)
    location_name: Mapped[str] = mapped_column(String)
    city: Mapped[str] = mapped_column(String)
    country: Mapped[str] = mapped_column(String)
    latitude: Mapped[float] = mapped_column(Double)
    longitude: Mapped[float] = mapped_column(Double)


class PollutionInfo(Base):
    __tablename__ = "pollution"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    timestamp: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True))
    pollution_type_id: Mapped[int] = mapped_column(Integer, ForeignKey("pollution_types.id"))
    monitoring_station_id: Mapped[int] = mapped_column(Integer, ForeignKey("monitoring_stations.id"))
    value: Mapped[float] = mapped_column(Double)

    pollution_type = relationship("PollutionType", backref="pollution_types")
    monitoring_station = relationship("MonitoringStation", backref="monitoring_stations")
