from fastapi import FastAPI

from DAL.db import Base, engine
from api.routes import api_router
from api.websocket import ws_router

app = FastAPI()


Base.metadata.create_all(bind=engine)  # Crée les tables au lancement

(app.
# Routes REST
 include_router(api_router))

# WebSocket
app.include_router(ws_router)
