from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from DAL.db import Base, engine
from api.routes import api_router
from api.websocket import ws_router

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

Base.metadata.create_all(bind=engine)  # Crée les tables au lancement

(app.
# Routes REST
 include_router(api_router))

# WebSocket
app.include_router(ws_router)
