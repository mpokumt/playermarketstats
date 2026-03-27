# Player Market Stats

A full-stack TypeScript application for managing and analyzing **basketball player prop markets**, backed by a MySQL database and exposed via a REST API.

## 📌 Overview

Player Market Stats is a **monorepo** containing:

* A **Node.js + Express backend** (TypeScript)
* A **React + Vite frontend** (TypeScript)
* A **MySQL database** (Dockerized)

The system models player statistics markets (e.g., points, assists, rebounds) and provides filtering, querying, and suspension controls for betting-style market lines.

## 🚀 Features

* 🏀 Player prop market management
* 📊 Advanced filtering (position, stat type, suspension status, search)
* 🔄 Manual suspension toggling for markets
* 📈 Alternate lines with odds
* 🗄️ Strong relational schema (MySQL)
* 🐳 Dockerized database setup
* ⚡ Full TypeScript stack
* 🧪 Unit & integration testing (Jest)

---

## 🏗️ Project Structure

```
playermarketstats/
│
├── client/                     # React frontend (Vite + TS)
│   ├── src/
│   ├── package.json
│
├── server/                     # Express backend (TypeScript)
│   ├── src/
│   │   ├── index.ts           # Server entry point
│   │   ├── routes/            # Express route handlers
│   │   ├── services/          # Business logic (MarketService)
│   │   ├── scripts/           # migrate.ts, seed.ts
│   ├── dist/                  # Compiled output
│   ├── package.json
│
├── docker-compose.yml         # MySQL container config
├── init.sql                   # Database schema + seed data
│
├── package.json               # Root scripts
└── README.md
```

---

## 🛠️ Technologies Used

### Backend

* **Node.js**
* **TypeScript**
* **Express**
* **MySQL (mysql2)**

### Frontend

* **React 18**
* **TypeScript**
* **Vite**
* **Axios**
* **React Router**

### Database

* **MySQL (Dockerized)**

### Testing

* **Jest**
  
---

## 🗄️ Database Schema

### 🧠 Entity Relationship Diagram (ERD)

```
players (1) ────────< (∞) markets >──────── (1) stat_types
    │                     │
    │                     └──────────────< alternates (∞)
    │
    └────────────────────< alternates (∞)
```

### Relationships

* A **player** has many **markets**
* A **stat_type** applies to many players
* A **market** is uniquely identified by `(player_id, stat_type_id)`
* A **player** has many **alternate lines**
* Alternates extend the primary market with odds

---

### Core Tables

#### `players`

* Player metadata (team, position, etc.)

#### `stat_types`

* points, assists, rebounds, steals

#### `markets`

* Primary betting line
* Includes suspension flags
* Unique per `(player_id, stat_type_id)`

#### `alternates`

* Alternate lines with:

  * `under_odds`
  * `over_odds`
  * `push_odds`

---

## 📊 How Player Market Data is Computed

### Flow

1. **Seed Data**

   * Players and stat types initialized

2. **Market Creation**

   * One base line per player/stat type

3. **Filtering Layer**

   * Markets filtered by:

     * Position
     * Stat type
     * Suspension status
     * Text search

4. **Suspension Logic**

   * `market_suspended` → automatic
   * `manual_suspension` → override flag

5. **Aggregation**

   * Markets joined with player + stat metadata
   * Returned as `MarketWithDetails`

---

## 🔌 API Endpoints

**Base URL**: `/api/markets`

### GET `/api/markets/filterOptions`

Returns available filter values derived from market data.

#### Response

```json
{
  "success": true,
  "data": {
    "positions": ["G", "F", "C"],
    "statTypes": ["points", "assists"],
    "suspensionStatuses": ["suspended", "active"]
  }
}
```

### GET `/api/markets`

Fetch markets with filtering.

#### Query Parameters

| Param            | Type   | Description               |
| ---------------- | ------ | ------------------------- |
| position         | string | Filter by player position |
| statType         | string | Filter by stat type       |
| suspensionStatus | string | "active" or "suspended"   |
| search           | string | Search player name        |

#### Example

```
/api/markets?position=G&statType=points&search=lebron
```

#### Response

```json
{
  "success": true,
  "data": [...],
  "count": 25
}
```

### PUT `/api/markets/:id/suspension`

Update manual suspension status.

#### Body

```json
{
  "suspended": true
}
```

#### Notes

* Calls: `marketService.updateManualSuspension`
* Currently marked as **candidate task / partially implemented**
* Returns `501` if not implemented

---

## ⚙️ Installation

```bash
git clone https://github.com/mpokumt/playermarketstats.git
cd playermarketstats
npm run setup
```

## ▶️ Running the Project

### Full stack (recommended)

```bash
npm run dev
```

---

### Individual services

```bash
cd server && npm run dev
cd client && npm run dev
```

---

## 🏗️ Database Operations

```bash
npm run migrate
npm run seed
```

---

## 🐳 Docker

```bash
npm run docker:up
npm run docker:down
npm run docker:verify
```

**The app will be available at**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health check: http://localhost:3001/health

---

## 🔌 Architecture Overview

```
[ React Client ] ---> [ Express API ] ---> [ MySQL ]
         │                    │
         │                    └── MarketService (business logic)
         └── Axios requests
```

---

## 🧪 Testing

```bash
npm test
```

Server:

```bash
cd server && npm run test
```

Client:

```bash
cd client && npm run test
```
---

## 📬 Contact

Open an issue on GitHub for questions or suggestions.

---


## Troubleshooting

**Port Requirements:**
- Ports `3000`, `3001`, and `3306` must be available
- If you have MySQL running locally, stop it first: `brew services stop mysql` (macOS) or stop the MySQL service (Windows)

### Docker Issues
- **"Docker not found"**: Ensure Docker Desktop is installed and running
- **"Port 3306 already in use"**: Stop local MySQL:
  - macOS: `brew services stop mysql`
  - Windows: Stop MySQL service in Services app
  - Linux: `sudo systemctl stop mysql`
- **"Cannot connect to Docker daemon"**: Start Docker Desktop application
- **Container fails to start**: Try `npm run docker:down` then `npm run docker:up`

### Database Issues
- **"Connection refused"**: MySQL container is still initializing (setup script waits automatically up to 30 seconds)
- **"Seeding failed"**: Ensure `props.json` and `alternates.json` exist in `database/` folder
- **"Migration failed"**: Try `npm run docker:down && npm run docker:up` to reset database

### Port Conflicts
- **Frontend (3000) conflict**: Change port in `client/vite.config.ts`
- **Backend (3001) conflict**: Set `PORT=3002` in `.env` file
- **MySQL (3306) conflict**: Update `DB_PORT` in `.env` and `docker-compose.yml`

### General Issues
- **"Module not found"**: Run `npm run install:all` to install dependencies
- **TypeScript errors**: Check Node.js version (must be 16+)
- **Blank page**: Check browser console and network tab for errors
- **API not working**: Verify backend is running at http://localhost:3001/health

### Still Having Issues?
1. Try a clean restart: `npm run docker:down && npm run setup && npm start`
2. Check all prerequisites are installed and running
3. Verify no other services are using ports 3000, 3001, 3306
