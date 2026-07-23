# LuxeDrive — Car Dealership Inventory System

<p align="center">
  <strong>A full-stack luxury car marketplace built with TDD methodology</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Tests-32%20passing-brightgreen" alt="Tests" />
</p>

---

## Live Demo

| | Link |
|---|---|
| **Frontend** | [car-dealership-inventory-system-inky.vercel.app](https://car-dealership-inventory-system-inky.vercel.app) |
| **Backend API** | [car-dealership-inventory-system-njrt.onrender.com](https://car-dealership-inventory-system-njrt.onrender.com) |

> **Note:** The Render backend uses a free tier — the first request after idle may take ~30s to spin up.

---

## Screenshots

### Light Mode

| Hero |
|------|
| ![Light Hero](screenshots/light-mode-hero.png) |

<details>
<summary><strong>Dark Mode (click to expand)</strong></summary>

| Hero | Vehicle Grid | Vehicle Detail |
|------|-------------|----------------|
| ![Dark Hero](screenshots/dark-mode-hero.png) | ![Car Grid](screenshots/dark-mode-car-grid.png) | ![Car Detail](screenshots/dark-mode-car.png) |

| Category Filter | Admin Dashboard |
|----------------|-----------------|
| ![Category](screenshots/dark-mode-category.png) | ![Admin](screenshots/dark-mode-admin.png) |

| Add Vehicle | Update Vehicle | Restock |
|-------------|---------------|---------|
| ![Add Vehicle](screenshots/dark-mode-add-vehicle.png) | ![Update Car](screenshots/dark-mode-update-car.png) | ![Restock](screenshots/dark-mode-restock.png) |

| Ending |
|--------|
| ![Ending](screenshots/dark-mode-ending.png) |

</details>

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    VERCEL (Frontend)                     │
│   React 19 · Vite 8 · Tailwind CSS 4 · TanStack Query  │
└────────────────────────┬────────────────────────────────┘
                         │ REST API calls
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   RENDER (Backend)                       │
│   Express 5 · Prisma 6 · JWT Auth · Multer + ImageKit   │
└────────────────────────┬────────────────────────────────┘
                         │ Prisma Client
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    NEON (Database)                       │
│                    PostgreSQL                            │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Backend

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20+ with TypeScript 5.9 |
| Framework | Express 5 |
| ORM | Prisma 6 |
| Database | PostgreSQL (Neon) |
| Auth | JWT + bcrypt |
| File Upload | Multer → ImageKit CDN |
| Security | Helmet, CORS, express-rate-limit, Zod |
| Testing | Jest + Supertest + Testcontainers |

### Frontend

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| State | TanStack Query (server) + React Context (auth/theme) |
| Icons | Lucide React |
| Testing | Vitest + React Testing Library |

---

## Features

### Authentication & Authorization
- User registration with full name, email, and password
- JWT token-based login with automatic expiry
- Role-based access: `USER` (customer) and `ADMIN` (dealership manager)
- Admin-only routes protected by both backend middleware and frontend UI hiding

### Vehicle Management
- **35 pre-seeded vehicles** across Sedans, SUVs, Hatchbacks, Coupes, Trucks, and Vans
- Full CRUD operations (Admin only for create/update/delete)
- Atomic stock decrement on purchase (prevents overselling)
- Admin restock functionality
- Vehicle image uploads via Multer → ImageKit CDN

### Search & Discovery
- Real-time debounced search by make and model (300ms delay)
- Category filtering (Sedan, SUV, Hatchback, Coupe, Truck, Van)
- Price range filtering
- Dynamic hero banner showing manufacturer counts from live data

### UI/UX
- **Dark/Light theme** — system preference detection + manual toggle
- **Responsive design** — mobile hamburger nav, adaptive grid layouts
- **Per-card loading states** — only the purchased card shows a spinner
- **Modal focus trap** — keyboard navigation stays within open modals
- **Body scroll lock** — prevents background scrolling when modals are open
- **Reduced motion** — respects `prefers-reduced-motion` system setting
- **Toast notifications** — ARIA live regions for screen reader accessibility
- **Stale token auto-logout** — 401 responses trigger automatic session expiry
- **Delete confirmation** — two-click confirm with 3-second auto-reset

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database ([Neon](https://neon.tech) free tier works)
- [ImageKit](https://imagekit.io) account (optional, for image uploads)

### 1. Clone & Install

```bash
git clone https://github.com/DPC1012/car-dealership-inventory-system.git
cd car-dealership-inventory-system

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 2. Configure Environment

Create `backend/.env`:

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
JWT_SECRET=your-32-character-secret-key-here
JWT_EXPIRES_IN=1d
CORS_ORIGIN=http://localhost:5173
PORT=4000
ADMIN_EMAIL=admin@dealership.com
ADMIN_PASSWORD=AdminPassword123!

# Optional — for image uploads
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

### 3. Initialize Database

```bash
cd backend
npx prisma generate
npx prisma migrate dev
npm run seed
```

### 4. Start Development

```bash
# Terminal 1 — Backend (port 4000)
cd backend && npm run dev

# Terminal 2 — Frontend (port 5173)
cd frontend && npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@dealership.com` | `AdminPassword123!` |

---

## API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login, returns JWT |

### Vehicles

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/vehicles` | Public | List all vehicles |
| `GET` | `/api/vehicles/search?make=&model=&category=&minPrice=&maxPrice=` | Public | Search & filter |
| `GET` | `/api/vehicles/:id` | Public | Get vehicle details |
| `POST` | `/api/vehicles` | Admin | Add a new vehicle |
| `PUT` | `/api/vehicles/:id` | Admin | Update vehicle |
| `DELETE` | `/api/vehicles/:id` | Admin | Delete vehicle |

### Inventory

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/vehicles/:id/purchase` | User | Purchase (atomic stock −1) |
| `POST` | `/api/vehicles/:id/restock` | Admin | Restock (add quantity) |
| `POST` | `/api/vehicles/upload-image` | Admin | Upload vehicle image |

---

## Test Report

### Backend — Jest (24 tests)

```
 PASS  tests/integration/auth.register.test.ts
 PASS  tests/integration/auth.login.test.ts
 PASS  tests/integration/vehicles.crud.test.ts
 PASS  tests/integration/vehicles.inventory.test.ts
 PASS  tests/integration/vehicles.media.test.ts

 Test Suites:  5 passed, 5 total
 Tests:        24 passed, 24 total
```

### Frontend — Vitest (8 tests)

```
 PASS  src/components/__tests__/SearchFilters.test.tsx  (3 tests)
 PASS  src/components/__tests__/VehicleCard.test.tsx    (2 tests)
 PASS  src/context/__tests__/AuthContext.test.tsx       (3 tests)

 Test Files:  3 passed, 3 total
 Tests:       8 passed, 8 total
```

> **Total: 32 tests passing across backend and frontend.**

---

## Project Structure

```
car-dealership-inventory-system/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma              # User + Vehicle models
│   │   ├── seed.ts                    # 35 vehicles with Pexels photos
│   │   └── migrations/                # 3 migrations (init, image, name)
│   ├── src/
│   │   ├── config/env.ts              # Zod-validated environment
│   │   ├── middleware/
│   │   │   ├── requireAdmin.ts        # Admin-only guard
│   │   │   ├── requireUser.ts         # Authenticated-user guard
│   │   │   ├── validate.ts            # Zod request validation
│   │   │   └── errorHandler.ts        # Centralized error handler
│   │   ├── routes/
│   │   │   ├── auth.routes.ts         # Register + Login
│   │   │   └── vehicle.routes.ts      # CRUD + Inventory + Upload
│   │   ├── app.ts                     # Express app (helmet, cors, routes)
│   │   └── server.ts                  # Server entrypoint
│   └── tests/                         # 5 integration test suites
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx             # Nav with mobile drawer
│   │   │   ├── HeroBanner.tsx         # Dynamic hero with manufacturer stats
│   │   │   ├── SearchFilters.tsx      # Debounced search + category filter
│   │   │   ├── VehicleCard.tsx        # Card with purchase + delete confirm
│   │   │   ├── VehicleModal.tsx       # Add/edit vehicle form
│   │   │   ├── RestockModal.tsx       # Admin restock dialog
│   │   │   ├── AuthModal.tsx          # Login/register form
│   │   │   ├── ModalPortal.tsx        # Focus trap + scroll lock + portal
│   │   │   ├── ShowcaseSections.tsx   # Category showcase with lazy images
│   │   │   └── Toast.tsx              # ARIA live notifications
│   │   ├── context/
│   │   │   ├── AuthContext.tsx         # JWT auth + auto-logout
│   │   │   └── ThemeContext.tsx        # Dark/light mode
│   │   ├── config/api.ts              # Fetch client with auth interceptor
│   │   └── App.tsx                    # Main layout + routing
│   └── public/                        # Static assets
├── screenshots/                       # 8 application screenshots
├── PROMPTS.md                         # AI chat history
└── README.md                          # This file
```

---

## Development Journey

This project was built following **Test-Driven Development (TDD)** with a clear Red-Green-Refactor cycle:

| Phase | What Was Built | Tests |
|-------|---------------|-------|
| Session 1 | Project setup, Prisma schema, design system | — |
| Session 2 | Auth endpoints (register/login) with Zod validation | Auth test suite |
| Session 3 | Vehicle CRUD endpoints | Vehicle CRUD tests |
| Session 4 | Purchase & restock with atomic stock management | Inventory tests |
| Session 5 | Frontend scaffold, components, API client | Frontend tests |
| Session 6 | Image upload (Multer + ImageKit CDN) | Media tests |
| Session 7 | Dark/light theme, responsive design, 22 bug fixes | — |
| Session 8 | 15 UX improvements (debounce, focus trap, a11y) | SearchFilters tests |
| Session 9 | Seed data audit, deployment, README | — |

---

## My AI Usage

### Tool Used

**OpenCode** — AI-powered CLI coding assistant (primary tool throughout the project)

### How I Used AI

**Architecture & Planning**
- Designed the Prisma database schema (User + Vehicle models with roles)
- Planned the RESTful API endpoint structure
- Defined the TDD workflow — AI generated failing test cases first

**Backend Development**
- Generated boilerplate for Express routes, middleware, and Prisma seed data
- Debugged Express 5 `req.query` getter-only property issue using `Object.defineProperty`
- Implemented atomic stock decrement with `UPDATE ... WHERE quantity > 0`
- Set up Testcontainers for isolated PostgreSQL integration tests
- Integrated Multer + ImageKit for vehicle image uploads

**Frontend Development**
- Scaffolded the React component architecture and context providers
- Implemented the dark/light theme system with CSS custom properties
- Built the modal focus trap, body scroll lock, and keyboard navigation
- Added ARIA live regions, `prefers-reduced-motion`, and label `htmlFor` pairing
- Fixed 22+ frontend bugs in a single debugging session

**Testing**
- Generated comprehensive failing test suites for all 5 backend integration test files
- Set up Vitest + React Testing Library for frontend component tests
- Achieved 32 passing tests across both backend and frontend

**Deployment & Debugging**
- Audited 35 Pexels photo URLs and renamed vehicles to match actual photo content
- Diagnosed and fixed the VehicleModal invisible button text (undefined CSS variable)
- Resolved CORS configuration for multi-origin deployment (Vercel + Render)
- Debugged Render build failures (devDependencies in production, Jest type definitions)

### Reflection

AI was most valuable in three areas: **speed of boilerplate generation** (routes, tests, components), **pattern recognition** (finding dead code, inconsistencies, and anti-patterns across the codebase), and **cross-cutting concerns** (theme system, accessibility, deployment configs). The TDD cycle was significantly accelerated — AI could generate comprehensive failing tests, then I wrote the minimum code to pass them. Every AI-generated piece of code was reviewed, tested, and refined to ensure quality. The human-AI collaboration felt like pair programming where the AI handled breadth (scanning the entire codebase) while I handled depth (understanding business logic and making design decisions).

---

## License

ISC
