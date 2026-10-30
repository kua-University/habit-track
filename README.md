# Habit Track Premium

<p align="center">
  <img src="https://img.shields.io/badge/Project-Habit%20Track%20Premium-6C5CE7?style=for-the-badge&logo=github" alt="Habit Track Premium" />
  <img src="https://img.shields.io/badge/Stack-React%20%2B%20Node.js%20%2B%20PostgreSQL-00B894?style=for-the-badge" alt="Tech Stack" />
  <img src="https://img.shields.io/badge/Architecture-3%20Tier%20Layered-0984E3?style=for-the-badge" alt="Architecture" />
</p>

<p align="center">
  <strong>Track your habits. Build consistency. Grow momentum.</strong>
</p>

---

## Overview

Habit Track Premium is a modern habit tracking application designed to help users stay consistent, monitor progress, and improve daily routines through a clean and efficient workflow. The system combines a responsive frontend, a robust backend API, and a structured data layer to provide a smooth user experience and scalable architecture.

This project demonstrates a redesigned architecture built around maintainability, modularity, and real-world software engineering practices.

---

## Why This Project

- Encourages daily discipline and accountability
- Makes habit progress easy to understand and track
- Supports multiple habit types and tracking strategies
- Follows layered architecture for cleaner code organization
- Demonstrates practical use of design patterns and DevOps practices

---

## Architecture

### 3-Tier Layered Architecture

- Presentation Layer: React.js
- Business Layer: Node.js + Express
- Data Layer: PostgreSQL

This structure separates responsibilities so the application remains cleaner, easier to scale, and simpler to maintain over time.

### Design Patterns Implemented

| Pattern | Where It Is Used |
|---------|------------------|
| Singleton | Database Connection Pool |
| Factory Method | Goal Factory (Daily / Weekly / Monthly) |
| Facade | API Gateway (Check-in endpoint) |
| Observer | Habit Service → Streak, Dashboard, Notification |
| Strategy | Streak Calculator (normal / frozen rules) |

### DevOps & Tooling

| Tool | Purpose |
|------|---------|
| Docker | Containerize backend and database |
| Docker Compose | Orchestrate containers |
| Git | Version control |
| GitHub | Remote repository management |

---

## Key Features

- Habit creation and tracking
- Daily check-in system
- Streak monitoring and progress insights
- Goal-based habit categories (daily, weekly, monthly)
- Modular backend services for easier extension
- Structured architecture to support future enhancements

---

## Project Structure

```text
habit-track/
├── client/                 # Frontend application
├── server/                 # Backend APIs and business logic
├── database/               # Database setup and migrations
├── docker-compose.yml      # Container orchestration
├── Dockerfile              # Service container setup
├── README.md              # Project documentation
└── package.json           # Project metadata and scripts
```

---

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Docker and Docker Compose
- Git

### Installation

```bash
git clone https://github.com/kua-University/habit-track.git
cd habit-track
npm install
```

### Run the Project

```bash
docker-compose up --build
```

Then open the application in your browser and begin tracking your habits.

---

## Documentation

For better clarification and architectural context, refer to the project documentation here:

https://drive.google.com/file/d/1fYR9hAVFB8P5P5yRE3Kin6rgnU8GVINt60/view

---

## License

This project is intended for educational and portfolio use. Please check the repository for the current licensing terms.

---

<p align="center">
  <strong>Built to help users build better habits, one day at a time.</strong>
</p>
