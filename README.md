# 📅 Habit Tracker with Daily Goals

## SENG5232 - Software Architecture and Design

**Student:** Aklilu Tesfay  
**Institution:** Mekelle University | EiT-M

---

## 📄 Deliverable #6: Redesigned Architecture

👉 **[Click here to view/download the Redesigned Architecture PDF](docs/redesigned-architecture.pdf)**

---

## 🏗️ What Changed from Initial to Redesigned?

| Initial Architecture | Redesigned Architecture |
|---------------------|------------------------|
| Basic 3-tier layered | Same 3-tier + 5 Design Patterns |
| No design patterns | Singleton, Factory Method, Facade, Observer, Strategy |
| Generic connections | Observer pattern for event updates |
| Simple database access | Singleton pattern for connection pooling |
| Fixed streak logic | Strategy pattern for flexible rules |
| Direct object creation | Factory Method for goals |
| Manual deployment | Docker containerization |

---

## 🎨 The 5 Design Patterns I Applied

### 1. Singleton Pattern
- **Where:** Database Connection Pool
- **Why:** Ensures only ONE connection pool exists
- **Better than:** Factory Method (which could create multiple pools)

### 2. Factory Method Pattern
- **Where:** Goal Factory
- **Why:** Creates Daily/Weekly/Monthly goals without knowing concrete class
- **Better than:** Abstract Factory (overkill for single product family)

### 3. Facade Pattern
- **Where:** API Gateway (check-in endpoint)
- **Why:** One API call handles validation, database save, streak calculation
- **Better than:** Adapter (converts interfaces, doesn't simplify)

### 4. Observer Pattern
- **Where:** Habit Service → Streak, Dashboard, Notification
- **Why:** When habit checked, multiple things update automatically
- **Better than:** Mediator (would create central bottleneck)

### 5. Strategy Pattern
- **Where:** Streak Calculator
- **Why:** Different streak rules (normal, frozen, grace) can be swapped
- **Better than:** State pattern (tracks lifecycle, not algorithms)

---

## 📐 My Architecture Layers

---

## 🔧 DevOps Implementation

| Tool | Purpose |
|------|---------|
| Docker | Containerize backend and database |
| Docker Compose | Orchestrate multi-container setup |
| Git | Version control |
| GitHub | Remote repository |

---

## ✅ How ASRs Are Addressed

| ASR | How My Architecture Solves It |
|-----|-------------------------------|
| ASR-01 (1 sec load) | Facade pattern reduces network calls |
| ASR-02 (Data isolation) | PostgreSQL row-level security |
| ASR-03 (Failover) | Singleton connection pool |
| ASR-05 (500ms streak) | Observer pattern for parallel updates |
| ASR-07 (10k users) | Singleton prevents connection leaks |
| BL-01 (Streak reset) | Strategy pattern with normal rule |
| BL-02 (Streak freeze) | Strategy pattern with frozen rule |

---

## 🚀 How to Run My Project

### With Docker
```bash
docker-compose up -d
# Backend
cd backend && npm install && node server.js

# Frontend (new terminal)
cd frontend-react && npm install && npm start
