from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from DAL.db import Base, engine
from api.routes import api_router
from api.websocket import ws_router
from middlewares.query_protection import EnforceNoQueryMiddleware
from middlewares.security import SanitizeQueryMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://example.com",
    "https://www.example.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)  # Create tables at the launch of the API Server


#Add global middleware to protect from XSS
app.add_middleware(SanitizeQueryMiddleware)


app.add_middleware(
    EnforceNoQueryMiddleware,
    protected_paths=["/targets"],  # You can add more routes as needed
)

#Routes REST
app.include_router(api_router)

# WebSocket
app.include_router(ws_router)
