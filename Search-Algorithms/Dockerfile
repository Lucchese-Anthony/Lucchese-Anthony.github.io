FROM tiangolo/uvicorn-gunicorn-fastapi:latest

COPY ./src /app

RUN pip3 install --upgrade pip
RUN pip3 install --ignore-installed -r /app/requirements.txt
RUN pip3 install --log /tmp/pip.log -r /app/requirements.txt
RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2


CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]