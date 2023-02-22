from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()

from fastapi.middleware.cors import CORSMiddleware

from onacut.database import engine
from onacut.models import Base
from onacut.routers.alerts import router as alerts_router
from onacut.routers.cities import router as cities_router
from onacut.routers.districts import router as districts_router
from onacut.routers.regions import router as regions_router

Base.metadata.create_all(bind=engine)
app = FastAPI()


app.include_router(cities_router)
app.include_router(alerts_router)
app.include_router(districts_router)
app.include_router(regions_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # origins we allow
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Onacut Backend made with FastApi"}
