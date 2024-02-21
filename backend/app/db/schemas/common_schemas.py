from pydantic import BaseModel


class CreatedObjectResponse(BaseModel):
    id: int