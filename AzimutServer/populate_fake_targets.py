# populate_fake_targets.py
import random
from datetime import datetime
from DAL.db import SessionLocal, engine, Base
from models.target import Target

TYPES = ["cargo", "fishing_boat", "yacht", "patrol", "unknown_vessel", "lifeboat"]
THREATS = ["safe", "suspect", "dangerous", "distress"]
Base.metadata.create_all(bind=engine)
def generate_targets(n=25):
    return [
        Target(
            id=i,
            lat=round(random.uniform(27, 33), 4),
            lon=round(random.uniform(27, 33), 4),
            type=random.choice(TYPES),
            threat_level=random.choice(THREATS),
            updated_at=datetime.utcnow()
        )
        for i in range(1, n + 1)
    ]

def main():
    db = SessionLocal()
    targets = generate_targets()
    db.add_all(targets)
    db.commit()
    db.close()

if __name__ == "__main__":
    main()
