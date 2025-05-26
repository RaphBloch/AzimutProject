import psycopg2

conn = psycopg2.connect(
    dbname="azimut_db",
    user="raphael",
    password="Rahel2102!",
    host="localhost",
    port=5432
)

print("Connexion OK !")
conn.close()