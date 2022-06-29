FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt config.py Makefile server.py ./

RUN pip install -U pip && \
    pip install --no-cache-dir -r requirements.txt

COPY onacut onacut

CMD [ "python", "./server.py" ]
