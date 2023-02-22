FROM python:3.10-slim

WORKDIR /app

# We create our env file for the database path
RUN echo "SQLALCHEMY_DATABASE_URL=sqlite:///onacut.data" > /app/.env

COPY onacut.data requirements.txt Makefile ./

RUN pip install -U pip && \
    pip install --no-cache-dir -r requirements.txt

COPY onacut onacut

EXPOSE 8000

CMD ["uvicorn", "onacut.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
