from pydantic import BaseModel
from datetime import datetime
from .pollution_type_schemas import PollutionType, PollutionTypeCreate
from .monitoring_station_schemas import MonitoringStation, MonitoringStationCreate


class PollutionInfoBase(BaseModel):
    timestamp: datetime
    value: float


class PollutionInfoRawData(PollutionInfoBase):
    pollution_type: PollutionTypeCreate
    monitoring_station: MonitoringStationCreate


class PollutionInfoCreate(PollutionInfoBase):
    pollution_type_id: int
    monitoring_station_id: int


class PollutionInfo(PollutionInfoBase):
    id: int
    pollution_type: PollutionType
    monitoring_station: MonitoringStation

    class Config:
        from_attributes = True



class PollutionInfoLight(PollutionInfoBase):
    id: int
    pollution_type_id: int
    monitoring_station_id: int
