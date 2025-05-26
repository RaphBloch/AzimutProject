#!/bin/bash
set -e

echo "⏳ Attente que PostgreSQL soit prêt..."

#  Waiting for PostgreSQL to answer on port 5432
while ! nc -z db 5432; do
  sleep 1
done

echo "✅ PostgreSQL is  ready. Launch of Fast API and insert data..."

# Lancer le script de population (tu peux le rendre idempotent si tu veux)
python populate_fake_targets.py || echo "⚠️ Script has failed or has been already executed."

# Lancer le serveur FastAPI
exec uvicorn main:app --host 0.0.0.0 --port 8000
