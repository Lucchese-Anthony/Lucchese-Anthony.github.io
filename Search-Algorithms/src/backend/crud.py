from sqlalchemy.orm import Session

from . import models, schema

def create_state(db: Session, state: schema.StateBase):
    db_state = models.State(state_code=state.state_code, state_json=state.state_json)
    db.add(db_state)
    db.commit()
    db.refresh(db_state)
    return db_state

def get_state_by_code(db: Session, state_id: int):
    return db.query(models.State).filter(models.State.state_id == state_id).first()

def get_state_by_id(db: Session, state_code: str):
    return db.query(models.State).filter(models.State.state_code == state_code).first()

def get_states(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.State).offset(skip).limit(limit).all()

def update_state(db: Session, state: schema.StateBase):
    db_state = db.query(models.State).filter(models.State.state_id == state.state_id).first()
    db_state.state_code = state.state_code
    db_state.state_json = state.state_json
    db.commit()
    db.refresh(db_state)
    return db_state
