from pydantic import BaseModel


class MonitoringStationBase(BaseModel):
    station_number: int
    location_name: str
    city: str
    country: str
    latitude: float
    longitude: float


class MonitoringStationCreate(MonitoringStationBase):
    pass


class MonitoringStation(MonitoringStationBase):
    id: int
