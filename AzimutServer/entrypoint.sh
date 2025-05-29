#!/bin/bash
set -e

echo "⏳ Wait for PostgreSQL to be ready..."

#  Waiting for PostgreSQL to answer on port 5432
while ! nc -z db 5432; do
  sleep 1
done

echo "✅ PostgreSQL is  ready. Launch of Fast API and insert data..."

# Launch script for populate targets
python populate_fake_targets.py || echo "⚠️ Script has failed or has been already executed."

# Launch FastAPI Server
exec uvicorn main:app --host 0.0.0.0 --port 8000
