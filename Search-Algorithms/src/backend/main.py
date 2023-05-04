from typing import Union
import sqlalchemy
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def default():
    return {"Hello": "World"}


@app.get("/{short_url}")
def get_website_state(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/create")
def create_short_url():
    # create short url using math that never repeats
    return {"short_url": "short_url"}
