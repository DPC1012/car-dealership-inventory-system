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

<!-- Append subsequent sessions below as development proceeds. -->
