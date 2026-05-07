# 📅 Habit Tracker with Daily Goals

## SENG5232 - Software Architecture and Design

**Mekelle University | EiT-M | Faculty of Computing**

**Student:** Aklilu Tesfay

---

## 📄 Redesigned Architecture Document

The complete **Redesigned Architecture** document includes:

- ✅ 5 Design Patterns (Singleton, Factory Method, Facade, Observer, Strategy)
- ✅ Pattern justifications and ASR mappings
- ✅ Revised Component Diagram (with patterns)
- ✅ DevOps Deployment Diagram (Docker architecture)
- ✅ Data Flow Diagram (check-in process)

### 📎 Download / View

👉 **[Click here to view the Redesigned Architecture PDF](docs/redesigned-architecture.pdf)**

---

## 🖼️ Diagrams Preview

| Diagram | Preview |
|---------|---------|
| **Revised Component Diagram** | ![Component Diagram](docs/diagrams/revised_component_diagram.png) |
| **DevOps Deployment Diagram** | ![Deployment Diagram](docs/diagrams/devops_deployment.png) |
| **Data Flow Diagram** | ![Data Flow](docs/diagrams/data_flow_diagram.png) |

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/kua-University/habit-track.git
cd habit-track

# Run with Docker
docker-compose up -d

# Or run locally
cd backend && npm install && node server.js
cd frontend-react && npm install && npm start
