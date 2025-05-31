FROM python:3.11

WORKDIR /app

# install packages 
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y netcat-openbsd

# copy entire project
COPY . .


# run initial script to 
#   - wait and check DB is mounted
#   - create mock data and insert them in the table 
#   -  launch the server
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
