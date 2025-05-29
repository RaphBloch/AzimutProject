import pytest

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from DAL.db import Base, engine, SessionLocal
from main import app
from models.target import Target



client = TestClient(app)


# Insert Data in the DB for the test and then remove it
@pytest.fixture(scope="function", autouse=True)
def setup_db():
    # Reset schema
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db: Session = SessionLocal()
    try:
        # Insert sample data
        db.add_all([
           Target(id=1, lat=5.0, lon=5.0, type="drone", threat_level="dangerous"),
            Target(id=2, lat=6.0, lon=4.5, type="vehicle", threat_level="safe"),
        ])
        db.commit()
        yield
        # Cleanup: remove only inserted targets
        db.query(Target).delete()
        db.commit()
    finally:
        db.close()
def test_get_targets_happy_path():
    response = client.get("/targets")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert "id" in response.json()[0]
    assert "lat" in response.json()[0]