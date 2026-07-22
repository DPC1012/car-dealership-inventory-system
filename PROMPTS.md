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

<!-- Append subsequent sessions below as development proceeds. -->
