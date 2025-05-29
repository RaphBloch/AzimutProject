import psycopg2

conn = psycopg2.connect(
    dbname="azimut_db",
    user="xx",
    password="xxxx",
    host="localhost",
    port=5432
)

print("Connexion OK !")
conn.close()