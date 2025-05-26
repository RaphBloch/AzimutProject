#!/bin/bash
set -e

echo "⏳ Attente que PostgreSQL soit prêt..."

# Attendre que PostgreSQL réponde sur le port 5432
while ! nc -z db 5432; do
  sleep 1
done

echo "✅ PostgreSQL est prêt. Lancement de FastAPI et insertion des données..."

# Lancer le script de population (tu peux le rendre idempotent si tu veux)
python populate_fake_targets.py || echo "⚠️ Le script a échoué ou a déjà été exécuté."

# Lancer le serveur FastAPI
exec uvicorn main:app --host 0.0.0.0 --port 8000
