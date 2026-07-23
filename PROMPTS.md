# AI Prompt History

This file documents the AI tooling chat history for the Car Dealership Inventory
System, including the prompts written and how the AI assisted. Maintained
incrementally throughout development, per the assignment's AI transparency policy.

**AI tool used:** Claude Code (Anthropic).

---

## Session 1 — Design / requirements grilling (2026-07-22)

Used Claude Code's `/grill-me` skill to run a relentless interview over the
assignment (`PROBLEM.md`) and lock every design decision before writing code.

Decisions settled: backend stack (Node + TypeScript + Express 4, three-layer
architecture), database (PostgreSQL via Prisma — Neon for dev/prod, local Docker
Postgres for reviewers, Testcontainers for tests), auth (single stateless JWT,
bcrypt, seeded admin from env vars), inventory concurrency (atomic conditional
update so stock can't oversell), search semantics, Zod validation, centralized
error handling, data model (User + Vehicle, price as Decimal in INR), the full
endpoint contract, TanStack Query on the frontend, Jest + Supertest +
Testcontainers testing, and the per-behavior Red-Green-Refactor commit workflow.

Full frozen design captured in `DESIGN.md`.

---

## Session 2 — Backend scaffolding & first TDD cycle (2026-07-22)

Used Claude Code to scaffold the backend and drive the first Red-Green-Refactor
cycle. Representative prompts and how the AI was used:

- **"nodejs typescript with express" / "use postgres i have neon db string plus
  prisma"** — locked the stack during the design grilling; the AI scaffolded
  accordingly.
- **"yess" / "do it" / "continue"** — approvals to proceed through scaffolding
  steps. The AI initialized the `backend/` package, installed dependencies, and
  wrote `tsconfig`, Jest config, and the folder structure.
- The AI **de-risked the toolchain** before building on it: a smoke test
  revealed that the auto-installed **TypeScript 7** (new native compiler) is not
  supported by ts-jest, and **Prisma 7** dropped the `url = env(...)` datasource
  model. On its recommendation we pinned **TypeScript 5.9** and **Prisma 6** for
  ecosystem compatibility, and kept the default **Express 5** (which removes the
  need for an `asyncHandler` wrapper). Rationale recorded in `DESIGN.md`.
- The AI authored the **Prisma schema** (User + Vehicle, enums, INR Decimal),
  ran the first migration against a local Docker Postgres, and built a
  **Testcontainers** Jest harness (ephemeral Postgres per run, migrations
  applied, tables truncated between tests).
- **First Red-Green-Refactor cycle for `POST /api/auth/register`:** the AI wrote
  the failing integration test first (committed RED at 404), then implemented
  the layered slice to pass it (committed GREEN) — config/env validation, custom
  error hierarchy, error + validation middleware, bcrypt/JWT utils, and the
  service/controller/route layers.

Commits from this session carry the `Co-authored-by: Claude` trailer and follow
`test:` → `feat:` (Red → Green) messages.

---

## Session 3 — Auth Login, Vehicle CRUD & Concurrency TDD (2026-07-22)

Continued test-driven development for all remaining backend endpoints and verified
concurrency behavior under load:

- **Auth Login (`POST /api/auth/login`):** Wrote failing integration tests (`auth.login.test.ts`),
  then implemented Zod `loginSchema`, `loginUser` in `auth.service.ts` using bcrypt `verifyPassword`,
  and JWT token issuance.
- **JWT & Role Authentication Middleware:** Created `authenticate` and `requireAdmin` middleware
  in `auth.middleware.ts` to protect vehicle endpoints.
- **Vehicle CRUD & Search (`GET`, `POST`, `PUT`, `DELETE`, `GET /search`):** Wrote failing integration
  tests in `vehicles.crud.test.ts`. Implemented case-insensitive partial search (`contains`,
  `mode: 'insensitive'`), category filters, and inclusive price range (`gte`/`lte`) filtering in
  `vehicle.service.ts`.
- **Inventory Concurrency & Restock:** Wrote failing tests in `vehicles.inventory.test.ts`, then
  implemented an atomic conditional update (`updateMany` with `quantity > 0`) for
  `POST /api/vehicles/:id/purchase` to ensure thread-safe stock decrements. The 5-request simultaneous
  `Promise.all` test verifies exactly 1 request succeeds with 200 and 4 fail with 409 Conflict,
  preventing negative inventory under high concurrency.
- **Test Suite Results:** 17/17 tests passing across 4 integration test suites with zero failures.

---

## Session 4 — Red-Green-Refactor history cleanup (2026-07-23)

Process correction for AI transparency. The Session 3 work had first landed as a single bundled
commit, which violated the assignment's requirement (Process & Technical Guidelines #1) of a *clear*
Red-Green-Refactor pattern in the backend commit history. With Claude Code we tagged a backup of the
pushed commit, reset it, and rebuilt the same work as genuine test-first slices — each RED commit was
run and confirmed failing before the matching GREEN implementation was committed:

- `test(auth): …login (RED)` → `feat(auth): …login (GREEN)`
- `test(vehicles): …CRUD, search & auth guards (RED)` → `feat(vehicles): …(GREEN)`
- `test(inventory): …purchase, restock & concurrency (RED)` → `feat(inventory): …(GREEN)`

The bundled `vehicles.test.ts` was split into `vehicles.crud.test.ts` and `vehicles.inventory.test.ts`
so each cycle has an independently-failing RED. History was then force-pushed (with a local backup tag
retained). No behavior changed — the same 17 tests pass.

---

## Session 5 — Frontend SPA Implementation & High-Value RTL Tests (2026-07-23)

Built the modern single-page React application conforming to `DESIGN_SYSTEM.md` and verified key component logic via Vitest + React Testing Library:

- **Design System & Aesthetics (`DESIGN_SYSTEM.md` & `index.css`):** Created the "Showroom Floor" dark design language using graphite neutrals (`#13151A`, `#1B1E24`), single-voice amber accent (`#E3A143`), status-locked colors (Moss `#6FA787` for in-stock/success, Rust `#C4574A` for sold out/delete, Chrome `#5B7A99` for admin metadata), and Barlow Condensed signage typography split with Inter body text.
- **Frontend SPA Architecture:** Scaffolded Vite + React + TypeScript with TanStack Query (`QueryClientProvider`), React Context (`AuthContext`), and custom fetch client handling JWT Bearer tokens in `localStorage`.
- **Components:**
  - `Navbar`: Showroom wordmark, active user/admin badge, sign-in/register trigger, and admin "Add Vehicle" button.
  - `AuthModal`: Tabbed Login / Register form with validation and error alerts.
  - `SearchFilters`: Search input by make, vehicle category chips (SEDAN, SUV, TRUCK, COUPE, HATCHBACK, VAN, MOTORCYCLE), min/max price inputs, and filter clearing.
  - `VehicleCard`: Window sticker cards displaying make/model, category badge, stock status (IN STOCK, LOW STOCK, SOLD OUT), visually dominant amber price in INR (`₹`), purchase button (disabled when stock is 0), and admin edit/restock/delete controls.
  - `VehicleModal` & `RestockModal`: Admin forms for adding/editing vehicles and quick restocking.
  - `ToastContainer`: Real-time notification banners for purchase, restock, edit, delete, and error events.
- **High-Value RTL Tests (8/8 Passing):**
  - `AuthContext.test.tsx`: Verifies authentication state, token persistence in `localStorage`, and admin role determination.
  - `SearchFilters.test.tsx`: Verifies input change events, category selection, and filter clearing.
  - `VehicleCard.test.tsx`: Verifies vehicle spec rendering, INR price formatting, and asserts that the Purchase button is strictly disabled with `SOLD OUT` label when `quantity === 0`.
- **Granular Git Commits:** Committed frontend in small conventional commits (`style:`, `feat:`) each carrying the `Co-authored-by: Claude <noreply@anthropic.com>` trailer.

---

## Session 6 — Multer + ImageKit Media Upload Feature (R-G-R Cycle) (2026-07-23)

Designed and implemented vehicle image uploads using Multer in-memory storage (`multer.memoryStorage()`) and ImageKit Node.js SDK following strict Red-Green-Refactor commits:

- **Domain Glossary (`CONTEXT.md`):** Updated domain glossary defining `Media Asset (Vehicle Image)` hosted via ImageKit CDN.
- **Red State Commit (`test(media): … (RED)`):** Authored `backend/tests/integration/vehicles.media.test.ts` asserting authentication (`401`), admin authorization (`403`), and missing file validation (`400`) on `POST /api/vehicles/upload-image`. Verified test failure at `404` prior to mounting route.
- **Green State Commit (`feat(media): … (GREEN)`):** Added Prisma migration `20260723062956_add_vehicle_image_url` adding `imageUrl String?` to `Vehicle`, created ImageKit helper (`backend/src/lib/imagekit.ts`), Multer memory storage middleware (`backend/src/middleware/upload.middleware.ts`), service, controller, and routes. Verified tests passing `GREEN`.
- **Frontend Media UI Commit (`feat(frontend-media): …`):** Updated `VehicleCard` to render vehicle images with fallback showroom styling, added file upload button & live thumbnail preview in `VehicleModal`, and implemented multipart `FormData` API client helper.



