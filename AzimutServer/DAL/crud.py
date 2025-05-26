from sqlalchemy.orm import Session
from models.target import Target

def get_targets(db: Session):
    return db.query(Target).all()