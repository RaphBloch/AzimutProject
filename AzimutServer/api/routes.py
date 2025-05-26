from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from DAL.db import SessionLocal
from DAL import crud

api_router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@api_router.get("/targets")
def read_users(db: Session = Depends(get_db)):
    return crud.get_targets(db)