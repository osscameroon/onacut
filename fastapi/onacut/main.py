from fastapi import FastAPI

from dotenv import load_dotenv
load_dotenv()

from .models import Base
from .routers.cities import router as cities_router
from .routers.alerts import router as alerts_router
from .routers.districts import router as districts_router
from .routers.regions import router as regions_router
from .database import engine


Base.metadata.create_all(bind=engine)
app = FastAPI()


app.include_router(cities_router)
app.include_router(alerts_router)
app.include_router(districts_router)
app.include_router(regions_router)


@app.get("/")
async def root():
    return {"message": "Onacut Backend made with FastApi"}
