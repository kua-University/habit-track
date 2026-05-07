# 📅 Habit Tracker with Daily Goals

## SENG5232 - Software Architecture and Design

**Student:** Aklilu Tesfay  
**Institution:** Mekelle University | EiT-M | Faculty of Computing  
**Program:** Software Engineering

---

## 📄 Deliverable #6: Redesigned Architecture

### Architecture Diagrams

| Diagram | Preview |
|---------|---------|
| **Revised Component Diagram** (with 5 Design Patterns) | ![Component Diagram](docs/diagrams/revised_component_diagram.png) |
| **DevOps Deployment Diagram** (Docker Architecture) | ![Deployment Diagram](docs/diagrams/devops_deployment.png) |
| **Data Flow Diagram** (Habit Check-in Process) | ![Data Flow Diagram](docs/diagrams/data_flow_diagram.png) |

### 📎 Download Full Document

👉 **[Click here to download the Redesigned Architecture PDF](docs/redesigned-architecture.pdf)**

---

## 🎨 Design Patterns Applied

| Pattern | Category | Location | ASRs |
|---------|----------|----------|------|
| Singleton | Creational | Database Connection Pool | ASR-03, ASR-07 |
| Factory Method | Creational | Goal Factory | BL-03 |
| Facade | Structural | API Gateway | ASR-01, FE-01 |
| Observer | Behavioral | Habit Service | ASR-05, FE-05 |
| Strategy | Behavioral | Streak Calculator | BL-01, BL-02 |

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- Docker (optional)

### Run with Docker

```bash
git clone https://github.com/kua-University/habit-track.git
cd habit-track
docker-compose up -d
