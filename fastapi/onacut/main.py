from fastapi import Depends, FastAPI

# from .dependencies import get_query_token, get_token_header
from .routers.cities import router as cities_router

# app = FastAPI(dependencies=[Depends(get_query_token)])
app = FastAPI()

app.include_router(cities_router)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
