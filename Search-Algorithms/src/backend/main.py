#!/usr/bin/env python

from typing import Union
import sqlalchemy
from sqlalchemy.orm import Session
from fastapi import Depends, FastAPI, HTTPException
from . import crud, schema, models
from backend.database import SessionLocal, engine
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import os

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.mount("/", StaticFiles(directory="frontend", html=True), name="static")

# Remove the existing root route
@app.get("/", response_class=HTMLResponse, response_model=None)
async def root():
    print(os.getcwd())
    # send the index.html file alongside the frontend js and css files
    return FileResponse("frontend/index.html")



@app.get("/{short_url}", response_model=schema.State, response_class=HTMLResponse)
def get_website_state(short_url: str, db: Session = Depends(get_db)):
    state = crud.get_state_by_code(db, short_url)
    if state is None:
        # show alert that the url is not valid
        return FileResponse("frontend/index.html")
    return state
    

@app.post("/save", response_model=schema.State)
def create_short_url(db: Session = Depends(get_db), json: str = None):
    code = crud.generate_code()
    db_state = crud.get_state_by_code(db, code)
    if db_state:
        return crud.update_state(db=db, state=state)
    state = schema.StateBase(state_code=code, state_json=json)
    return crud.create_state(db=db, state=state)
