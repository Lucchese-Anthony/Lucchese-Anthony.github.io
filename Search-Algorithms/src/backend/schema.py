from typing import Dict
from pydantic import BaseModel


class StateBase(BaseModel):
    state_code: str
    state_json: str

class State(StateBase):
    state_id: int

    class Config:
        orm_mode = True