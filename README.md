# 📅 Habit Tracker - Redesigned Architecture


---

## 📄 for better clarification

👉 **[Download Redesigned Architecture PDF](docs/redesigned-architecture.pdf)**

---

## 🎯 What I Used

### Architectural Style
- **3-Tier Layered Architecture**
  - Presentation Layer: React.js
  - Business Layer: Node.js + Express
  - Data Layer: PostgreSQL

### 5 Design Patterns

| Pattern | Where |
|---------|-------|
| Singleton | Database Connection Pool |
| Factory Method | Goal Factory (Daily/Weekly/Monthly) |
| Facade | API Gateway (Check-in endpoint) |
| Observer | Habit Service → Streak, Dashboard, Notification |
| Strategy | Streak Calculator (normal/frozen rules) |

### DevOps Tools

| Tool | Purpose |
|------|---------|
| Docker | Containerize backend and database |
| Docker Compose | Orchestrate containers |
| Git | Version control |
| GitHub | Remote repository |

---

## 📐 Architecture Layers
