# Mnemos-jrnl

A full-stack personal journaling application built with Spring Boot and React, containerized end-to-end and deployed through an automated CI/CD pipeline.

## Current Version Snapshot
<img width="1600" height="1280" alt="image" src="https://github.com/user-attachments/assets/29d38622-ae45-489d-b695-fe5a75fa5aef" />

## Key Features
- **Journaling** — create, read, update, and delete journal entries
- **User Authentication** — secure user accounts
- **Modern UI** — a clean, responsive interface built with React and Vite

## Architecture

```
Browser
   │
   ▼
┌─────────────┐      /journal, /user      ┌─────────────┐      ┌──────────┐
│   Nginx     │ ────────────────────────▶ │   Spring    │ ───▶ │ MongoDB  │
│  (frontend) │ ◀──────────────────────── │    Boot     │      │  Atlas   │
│  serves SPA │      static assets        │  (backend)  │      └──────────┘
└─────────────┘                           └─────────────┘
```

Nginx serves the built React app directly and reverse-proxies API requests (`/journal`, `/user`) to the Spring Boot backend, which connects to MongoDB Atlas. All services are orchestrated with Docker Compose and communicate over an internal Docker network.

## Tech Stack
- **Backend:** Java 21, Spring Boot, Spring Security, Spring Data MongoDB
- **Frontend:** React, Vite, Nginx (reverse proxy + static file server)
- **Database:** MongoDB (Atlas)
- **Containerization:** Docker, Docker Compose (multi-stage builds)
- **CI/CD:** GitHub Actions — automated build, test, and image publishing to Docker Hub on every push to `main`

## Getting Started

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

That's it — no need to install Java, Maven, Node, or MongoDB locally. Everything runs in containers.

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ShravannJain/Mnemos-jrnl.git
   cd Mnemos-jrnl
   ```

2. Create a `.env` file in the project root:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/mnemos?retryWrites=true&w=majority
   ```
   > Use your own MongoDB Atlas connection string (a free-tier cluster works fine).

3. Build and run everything with one command:
   ```bash
   docker compose up --build
   ```

4. Open the app:
   ```
   http://localhost
   ```

### What's happening under the hood

- `docker compose up` builds the backend (Spring Boot, multi-stage JDK → JRE image) and frontend (Node build → Nginx serve) images, then starts both containers on a shared Docker network alongside their configuration.
- Nginx (frontend container) serves the compiled React app and proxies API calls to the backend container by service name — no manual networking setup required.
- The backend reads its MongoDB connection string from the `MONGO_URI` environment variable at runtime, so no credentials are ever hardcoded into the image.

## CI/CD Pipeline

Every push to `main` automatically:
1. Builds and compiles the backend (Maven) and frontend (Vite) in parallel
2. If both succeed, builds fresh Docker images for both services
3. Publishes the images to Docker Hub, tagged `:latest`

See [`.github/workflows/ci.yml`](.github/workflows/ci.yml) for the full pipeline definition.

## Pre-built Images

Pre-built images are available on Docker Hub if you'd rather skip building locally:
- `shravanjain/mnemos-backend`
- `shravanjain/mnemos-frontend`

## Learning & Development

This project started as a full-stack CRUD app and was later extended with a complete DevOps workflow — multi-stage Docker builds, container orchestration, Nginx reverse proxying, environment-based secrets management, and CI/CD automation — as a hands-on way to learn containerization and deployment practices from the ground up.
