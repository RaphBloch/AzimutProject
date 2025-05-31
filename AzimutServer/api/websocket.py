import asyncio
import random
from fastapi import WebSocket, APIRouter
from sqlalchemy import func
from sqlalchemy.orm import Session
from starlette import status

from DAL.db import SessionLocal
from models.target import Target
from datetime import datetime, timezone
from starlette.websockets import WebSocketDisconnect

ws_router = APIRouter()

THREATS = ["safe", "suspect", "dangerous", "distress"]


# function to update randomly some targets in the DB and then in the socket
def mutate_targets(db: Session, count: int = 3):
    targets = db.query(Target).order_by(func.random()).limit(count).all()

    updated = []
    for target in targets:
        lat=round(random.uniform(27, 33), 4),
        lon=round(random.uniform(27, 33), 4),
        target.threat_level = random.choice(THREATS)
        target.updated_at = datetime.now(timezone.utc)
        updated.append({
            "id": target.id,
            "lat": target.lat,
            "lon": target.lon,
            "type": target.type,
            "threat_level": target.threat_level,
            "updated_at": target.updated_at.isoformat()
        })

    db.commit()
    return updated

@ws_router.websocket("/stream")
async def stream(websocket: WebSocket):
    #  Query string is forbidden on the socket
    if websocket.url.query:
        # Close the connection immediately
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return
    await websocket.accept()
    try:
        while True:
            db = SessionLocal()
            updates = mutate_targets(db, count=random.randint(2, 5))
            await websocket.send_json({"updated_targets": updates})
            db.close()
            await asyncio.sleep(3)


    except WebSocketDisconnect:
        print("WebSocket closed by client.")
    except Exception as e:
        print(f"Unexpected error: {e}")
