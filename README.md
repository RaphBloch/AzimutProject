# Azimut – Live Maritime Target Dashboard

A responsive web application that visualizes real-time maritime targets with location data, status badges, and an interactive map.

---

## 🧠 Technology Choices

### 🐘 PostgreSQL (Database)
We chose **PostgreSQL** for its robust support for geospatial data, transactional integrity, and ease of integration with Python backends. It's open source, widely supported, and efficient for both development and production use cases.

### ⚡ FastAPI (Backend)
The API layer is built with **FastAPI**, a modern Python web framework. The choice was driven by:
- Built-in support for both REST endpoints and WebSockets (real-time streaming).
- Personal familiarity and productivity with Python-based stacks.

### ⚛️ React (Frontend)
The frontend is developed with **React**, which offers:
- A strong ecosystem and reusable component model.
- Rich interactive libraries such as **Leaflet** and **OpenLayers** for rendering maps.
- A mature developer toolchain and vibrant community.


## 🚀 Running the Project (via Docker Compose)

### Prerequisites
Make sure you have:
- Docker
- Docker Compose
- Pytest for API test
- npm for React Component Test 

### Steps to Launch

1. **Clone the repository**

In a powershell or cmd line:
git clone https://github.com/RaphBloch/AzimutProject.git
cd AzimutProject


2. **Start all services**


docker-compose up --build


3. **Explain the docker-compose steps** 

First, we wait for the database to be ready

PostgreSQL must be ready before the API inserts data or starts serving.

The api container has a script (entrypoint.sh) that waits for PostgreSQL to be accessible before running the app and inserts random data 

The client depends on api container and when api has started the client is launched 

4. **Server**

FastAPI is exposed at http://localhost:8000

REST endpoint: GET /targets

WebSocket: ws://localhost:8000/stream

5. **Client**

React app runs at http://localhost:3000

Fetches and displays real-time maritime targets

Responsive table and map with color-coded threat levels


## 🚀 Running the Tests (via Docker Compose)


1. **Run API tests using**

First we mount only the container of the  DB for the API tests
docker-compose up -d db 
cd AzimutServer
pytest tests/test_targets.py


2 .**Run React Components tests using**

cd azimut_client
npm test -- src/__tests__/TargetTable.test.tsx src/__tests__/ThreatBadge.test.tsx

