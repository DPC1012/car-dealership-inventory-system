# LuxeDrive — Car Dealership Inventory System

A full-stack luxury car dealership inventory management system built with the TDD (Test-Driven Development) methodology. Features JWT authentication, role-based access control (Admin/User), real-time search & filtering, vehicle image uploads via ImageKit CDN, and a responsive dark/light theme.

## Live Demo

- **Frontend (Vercel):** [https://car-dealership-inventory-system-inky.vercel.app](https://car-dealership-inventory-system-inky.vercel.app)
- **Backend API (Render):** [https://car-dealership-inventory-system-njrt.onrender.com](https://car-dealership-inventory-system-njrt.onrender.com)

> **Note:** The backend Render service may take ~30s to spin up on first request (free tier cold start).

---

## Screenshots

### Light Mode

| Homepage | Vehicle Inventory | Search & Filter |
|----------|------------------|-----------------|
| ![Homepage](screenshots/homepage-light.png) | ![Inventory](screenshots/inventory-light.png) | ![Search](screenshots/search-filter.png) |

| Vehicle Detail | Admin Panel |
|---------------|-------------|
| ![Vehicle Detail](screenshots/vehicle-detail.png) | ![Admin Panel](screenshots/admin-panel.png) |

### Dark Mode

| Homepage | Inventory | Detail |
|----------|-----------|--------|
| ![Dark Home](screenshots/dark-mode-home.png) | ![Dark Inventory](screenshots/dark-mode-inventory.png) | ![Dark Detail](screenshots/dark-mode-detail.png) |

---

## Tech Stack

### Backend
- **Runtime:** Node.js 20+ with TypeScript 5.9
- **Framework:** Express 5
- **ORM:** Prisma 6 with PostgreSQL (Neon)
- **Auth:** JWT (bcrypt password hashing)
- **File Upload:** Multer (memory storage) → ImageKit CDN
- **Security:** Helmet, CORS, express-rate-limit, Zod validation
- **Testing:** Jest + Supertest (integration tests with Testcontainers)

### Frontend
- **Framework:** React 19 with TypeScript 6
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 4 with CSS custom properties (design tokens)
- **State:** TanStack Query (server state), React Context (auth/theme)
- **Icons:** Lucide React
- **Testing:** Vitest + React Testing Library

---

## Features

### Core Functionality
- **User Registration & Login** with JWT token-based auth
- **Vehicle CRUD** — Admin can add, edit, restock, and delete vehicles
- **Purchase System** — Users can purchase vehicles (atomic stock decrement)
- **Search & Filter** — Debounced search by make/model, filter by category and price range
- **Image Upload** — Admin can upload vehicle photos via ImageKit CDN

### UI/UX
- **Dark/Light Mode** — System preference detection + manual toggle
- **Responsive Design** — Mobile hamburger nav, adaptive layouts
- **Per-card Loading States** — Only the affected card shows a spinner during purchase
- **Stale Token Auto-Logout** — 401 responses trigger automatic session expiry
- **Modal Focus Trap** — Keyboard navigation stays within open modals
- **Reduced Motion** — Respects `prefers-reduced-motion` system setting
- **Toast Notifications** — Non-intrusive alerts with ARIA live regions

### Admin Features
- Add/edit/delete vehicles
- Upload vehicle images
- Restock inventory
- Admin-only UI elements (hidden from regular users)

---

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database (local or Neon/Render)
- ImageKit account (for image uploads)

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your DATABASE_URL, JWT_SECRET, etc.

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database
npm run seed

# Start dev server
npm run dev
```

The backend runs on `http://localhost:4000` by default.

### Frontend Setup

```bash
cd frontend
npm install

# Start dev server
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

### Environment Variables

**Backend `.env`:**
```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-32-character-secret-key-here
JWT_EXPIRES_IN=1d
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
PORT=4000
ADMIN_EMAIL=admin@dealership.com
ADMIN_PASSWORD=AdminPassword123!

# ImageKit (optional — for image uploads)
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive JWT |
| GET | `/api/vehicles` | Public | List all vehicles |
| GET | `/api/vehicles/search` | Public | Search/filter vehicles |
| GET | `/api/vehicles/:id` | Public | Get vehicle details |
| POST | `/api/vehicles` | Admin | Add a new vehicle |
| PUT | `/api/vehicles/:id` | Admin | Update vehicle details |
| DELETE | `/api/vehicles/:id` | Admin | Delete a vehicle |
| POST | `/api/vehicles/:id/purchase` | User | Purchase (decrement stock) |
| POST | `/api/vehicles/:id/restock` | Admin | Restock (increment stock) |
| POST | `/api/vehicles/upload-image` | Admin | Upload vehicle image |

---

## Test Report

### Backend — Jest Integration Tests

```
Test Suites: 5 passed, 5 total
Tests:       24 passed, 24 total

PASS tests/integration/vehicles.crud.test.ts
PASS tests/integration/vehicles.inventory.test.ts
PASS tests/integration/vehicles.media.test.ts
PASS tests/integration/auth.login.test.ts
PASS tests/integration/auth.register.test.ts
```

### Frontend — Vitest Unit/Integration Tests

```
Test Files:  3 passed, 3 total
Tests:       8 passed, 8 total

✓ SearchFilters.test.tsx  (3 tests)
✓ VehicleCard.test.tsx    (2 tests)
✓ AuthContext.test.tsx    (3 tests)
```

**Total: 32 tests passing across backend and frontend.**

---

## Project Structure

```
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   ├── seed.ts              # Seed data (35 vehicles)
│   │   └── migrations/          # Database migrations
│   ├── src/
│   │   ├── config/env.ts        # Validated env config (Zod)
│   │   ├── middleware/           # Auth, validation, error handler
│   │   ├── routes/              # Express route handlers
│   │   ├── app.ts               # Express app setup
│   │   └── server.ts            # Server entrypoint
│   └── tests/                   # Jest integration tests
├── frontend/
│   ├── src/
│   │   ├── components/          # React UI components
│   │   ├── context/             # Auth + Theme context
│   │   ├── config/api.ts        # API client with auth interceptors
│   │   └── App.tsx              # Main app layout
│   └── public/                  # Static assets
├── screenshots/                 # Application screenshots
├── PROMPTS.md                   # AI chat history
└── PROBLEM.md                   # Kata assignment brief
```

---

## My AI Usage

### Tools Used
- **OpenCode** (CLI AI assistant) — primary tool throughout the entire project

### How I Used AI

**Architecture & Planning:**
- Used AI to design the initial database schema (User, Vehicle models with Prisma)
- Brainstormed API endpoint structure and REST conventions
- Planned the TDD workflow — AI helped write failing test cases first (RED phase)

**Backend Development:**
- AI generated initial boilerplate for Express routes, middleware, and Prisma seed data
- Used AI to debug complex issues: Express 5 `req.query` getter-only property, atomic stock decrement with `UPDATE ... WHERE quantity > 0`, and Testcontainers PostgreSQL setup
- AI helped implement Multer + ImageKit integration for vehicle image uploads

**Frontend Development:**
- AI scaffolded the React component architecture (AuthContext, VehicleCard, modals)
- Used AI to implement the dark/light theme system with CSS custom properties
- AI helped fix 22+ frontend bugs in a single session (dark mode flash, localStorage crash, stale state, etc.)
- AI implemented accessibility features: modal focus trap, ARIA live regions, `prefers-reduced-motion`

**Testing:**
- AI wrote the initial failing test suites for auth, vehicles, and inventory endpoints
- Used AI to set up Vitest + React Testing Library for frontend component tests
- AI helped achieve 32 passing tests across both backend and frontend

**Debugging:**
- AI diagnosed and fixed the VehicleModal invisible button text (undefined CSS variable)
- Used AI to audit 35 Pexels photo URLs and rename vehicles to match actual photo content
- AI helped identify and fix CORS issues for multi-origin deployment

### Reflection

AI dramatically accelerated the development workflow. What would have taken weeks of reading documentation and debugging was compressed into focused sessions. The biggest value was in the TDD cycle — AI could quickly generate comprehensive test cases, then I implemented the minimum code to pass them. The AI was particularly strong at pattern recognition across the codebase (finding inconsistencies, dead code, and anti-patterns) and at implementing cross-cutting concerns like the theme system and accessibility features. However, I always reviewed, tested, and manually refined AI-generated code to ensure quality and understanding.

---

## License

ISC
