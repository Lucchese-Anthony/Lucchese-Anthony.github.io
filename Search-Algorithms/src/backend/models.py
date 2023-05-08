from typing import Dict
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, JSON, Identity
from sqlalchemy.dialects.postgresql import JSONB, JSON

from .database import Base
JSONVariant = JSON().with_variant(JSONB(), "postgresql")

class State(Base):
    __tablename__ = "state"
    __allow_unmapped__ = True

    state_id = Column(Integer, Identity(start=1, increment=1), primary_key=True, index=True, autoincrement=True, unique=True)
    state_code = Column(String, unique=True, index=True)
    state_json = Column(String, unique=True)


