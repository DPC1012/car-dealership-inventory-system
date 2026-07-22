# Design — Car Dealership Inventory System

> Frozen design from a grilling session (2026-07-22). This is the build blueprint.
> Source spec: `PROBLEM.md`. Sequencing: **cake (core + tests + deliverables) first, then cherry (deploy).**

## Repo layout
- Single repo: `/backend` + `/frontend`, independent `package.json` each.
- From commit #1: `.gitignore` (ignore `node_modules`, `.env`, build output, coverage), empty `PROMPTS.md`, and Claude co-author trailer.

## Backend
- **Stack:** Node (dev on 24, `engines: >=20`) + TypeScript **5.9** + **Express 5**.
  - _Actual pinned versions (deviations from original plan, decided during scaffolding 2026-07-22):_
    - **Express 5** (not 4): v5 is stable in 2026 and installed by default. It propagates async errors to error middleware natively, so **no `asyncHandler` wrapper needed**.
    - **TypeScript 5.9** (not 7): TS 7 is the new native/Go compiler and ts-jest/ts-node don't support it yet. Pinned 5.x for ecosystem compatibility.
    - **Prisma 6** (not 7): Prisma 7 dropped the `url = env(...)` datasource model for a driver-adapter/`prisma.config.ts` setup. Pinned 6.x to keep the standard, documented schema.
- **Architecture:** three layers — routes → controllers → services → Prisma. All business logic + transactions live in **services**. Controllers stay thin.
- **Database:** PostgreSQL via **Prisma**.
  - **Neon** = dev + production DB (prod configured in Render dashboard env vars, never committed).
  - **Local Docker Postgres** (`docker compose up`) = documented reviewer local-run path (no signup).
  - **Testcontainers** = ephemeral Postgres for the test suite.
- **Auth:** single stateless **JWT** (no refresh token). **bcrypt** cost 10–12, async API (fallback `bcryptjs` if native build bites). Role enum `USER`/`ADMIN`. Register creates `USER`; **admin seeded from env vars** (`ADMIN_EMAIL`/`ADMIN_PASSWORD`). No admin-promotes-others endpoint.
- **Token storage (frontend):** `localStorage` + `Authorization: Bearer` header.
- **Validation:** **Zod** + reusable `validate` middleware. Zod mirrors Prisma enums. Enforces valid email + min 8-char password.
- **Errors:** custom error classes (`NotFoundError`, `ConflictError`, `UnauthorizedError`, `ForbiddenError`, `ValidationError`) → single Express error-handling middleware → envelope `{ error: { message, code } }` (Zod errors add `details`). Express 5 propagates async errors natively (no `asyncHandler` wrapper needed).
- **CORS:** `cors` middleware, frontend origin from env var (needed even locally — different ports).
- **Health:** `GET /health` → 200.

## Data model (Prisma, two tables — no orders table)
**User:** `id` cuid · `email` unique · `password` bcrypt hash · `role` enum `Role{USER,ADMIN}` default USER · `createdAt` · `updatedAt`

**Vehicle:** `id` cuid · `make` · `model` · `category` enum `VehicleCategory{SEDAN,SUV,TRUCK,COUPE,HATCHBACK,VAN,MOTORCYCLE}` · `price` **Decimal** (currency **INR**; frontend formats ₹ via en-IN; no symbol stored) · `quantity` Int default 0 (`>= 0`) · `createdAt` · `updatedAt`

## Inventory logic (the heart)
- **Purchase** `POST /:id/purchase`: buys exactly **1**. Atomic conditional update — `updateMany` with `quantity: { gt: 0 }`, decrement 1; if `count === 0` → **409**. (Showcase: concurrent-purchase test asserting stock never goes negative.)
- **Restock** `POST /:id/restock` (admin): required positive `quantity` in body, increment; `quantity <= 0` → **400**.

## Search `GET /api/vehicles/search`
- Filters **AND-combined**. `make`/`model` case-insensitive partial (`contains`, `mode: insensitive`). `category` exact enum match. `minPrice`/`maxPrice` inclusive (`gte`/`lte`), each optional.
- No params → return all. No pagination (verbal "next step").

## Endpoint contract
| Method | Route | Auth | Success | Errors |
|---|---|---|---|---|
| POST | `/api/auth/register` | public | 201 (+token, auto-login) | 400, 409 (email taken) |
| POST | `/api/auth/login` | public | 200 (+token) | 400, 401 |
| GET | `/api/vehicles` | user | 200 | 401 |
| GET | `/api/vehicles/search` | user | 200 | 401 |
| POST | `/api/vehicles` | user | 201 | 400, 401 |
| PUT | `/api/vehicles/:id` | user | 200 | 400, 401, 404 |
| DELETE | `/api/vehicles/:id` | **admin** | 204 | 401, 403, 404 |
| POST | `/api/vehicles/:id/purchase` | user | 200 | 401, 404, 409 |
| POST | `/api/vehicles/:id/restock` | **admin** | 200 | 400, 401, 403, 404 |

All vehicle routes protected (incl. GETs). POST/PUT allowed for any authenticated user; only DELETE + restock are admin-only (verbal: "in prod I'd gate all mutations to admin").

## Frontend
- HTML5 + CSS3 + **Tailwind** + **React** + TypeScript.
- **TanStack Query** for server state (queries + mutations; `invalidateQueries(['vehicles'])` after purchase/restock). React Context for auth. Local state for forms. No Redux.
- Screens: register/login forms, vehicle dashboard, search/filter, purchase button (disabled at qty 0), admin add/update/delete UI.
- Price display: `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`.

## Testing
- **Jest + Supertest + Testcontainers**, integration-weighted (proves real DB/transaction behavior).
- **Per-behavior Red-Green-Refactor** commits on backend: `test:` (red) → `feat:` (green) → `refactor:` (when warranted).
- Light **React Testing Library** layer on a couple of key frontend flows (e.g. purchase button disabled at zero stock).
- Run with `--coverage`; paste summary into README / `TEST_REPORT.md`.

## Deliverables (mandatory unless noted)
- README: project explanation, setup (backend + frontend, prereqs, Node 20, Docker, `.env.example` walkthrough, `docker compose up → prisma migrate → seed → run`, how to run tests), **screenshots**, **"My AI Usage"** (honest reflection — Claude Code for design/boilerplate/tests/debugging; where it helped vs. needed steering), **test report**.
- **PROMPTS.md** — full AI chat history incl. prompts, maintained **incrementally from commit #1** (this grilling session belongs here).
- Co-author trailer on every AI-assisted commit: `Co-authored-by: Claude <noreply@anthropic.com>` (body notes AI-vs-manual split).
- `.env.example` vars: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `PORT` (+ frontend origin for CORS).
- **Cherry (after cake):** deploy frontend → Vercel, backend → Render, DB → Neon. Then: CORS origins, `prisma migrate deploy` on Render, prod admin seed, env vars in both dashboards, live URL in README. Live URL is **optional/brownie-points** — not a pass/fail item.

## What passes vs. fails (from spec)
- **Pass/fail:** working API + real DB + auth + endpoints + React frontend; strong meaningful tests; clear R-G-R git history; README + "My AI Usage" + PROMPTS.md + setup + test report. Plagiarism = auto-reject.
- **Bonus only:** live deployment.

## First build steps
1. Scaffold `/backend` + `/frontend`, `.gitignore`, empty `PROMPTS.md`, co-author trailer — commit #1.
2. Prisma schema + first migration.
3. First **RED** test: register endpoint (before any implementation).
