from pydantic import BaseModel

class PollutionTypeBase(BaseModel):
    name: str
    displayName: str
    description: str
    unit: str

class PollutionTypeCreate(PollutionTypeBase):
    pass

class PollutionType(PollutionTypeBase):
    id: int
