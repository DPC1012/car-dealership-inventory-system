# Domain Context & Glossary — LuxeDrive / Roadstead Motors

## Domain Glossary

### User
A registered account in the system identified by a unique email address and bcrypt-hashed password. Users hold a system role (`USER` or `ADMIN`).
- **Role:** `USER` (customer capable of searching, viewing, and purchasing vehicles) or `ADMIN` (dealership manager with permissions to create, edit, restock, delete vehicles, and upload vehicle images).

### Vehicle
A luxury automotive inventory record identified by a unique `cuid`.
- **Attributes:** Make (Manufacturer), Model, Category (`SEDAN`, `SUV`, `TRUCK`, `COUPE`, `HATCHBACK`, `VAN`, `MOTORCYCLE`), Price (Decimal stored in INR `₹`), Stock Quantity (`Int >= 0`), and optional CDN Image URL (`imageUrl`).

### Inventory Stock & Purchase Concurrency
- **Stock Quantity:** Represents available physical inventory on the showroom floor.
- **Purchase Action:** Decrements vehicle quantity by 1 atomically. If quantity is 0, the vehicle is `SOLD OUT` and purchase requests fail with `409 Conflict`.
- **Restock Action:** Administrative operation adding a positive integer quantity to an existing vehicle's stock.

### Media Asset (Vehicle Image)
High-definition vehicle photography uploaded via Multer in-memory buffer (`multer.memoryStorage()`) to ImageKit CDN, returning a public HTTPS URL saved on `Vehicle.imageUrl`.

---

## Architectural & Design System Decisions (ADR)

### ADR 0001 — Light Minimal Luxury Frontend Theme
- **Decision:** Strict adherence to `DESIGN_SYSTEM.md` Section 2 Neutral Palette:
  - Background: `#FFFFFF` (Pure White)
  - Surface / Page Contrast: `#FAFAFA` (Off-White) & `#F5F5F5` (Light Gray)
  - Primary Text & Buttons: `#111111` (Deep Obsidian Charcoal)
  - Secondary Text: `#6B7280` / Muted `#9CA3AF`
  - Card Borders: `#E5E7EB`
- **Typography:** Manrope for headings & signage, Inter for body text.
- **Geometry:** 20px rounded cards (`rounded-2xl`), 16:10 image aspect ratio, subtle elevation shadows (`0 10px 30px rgba(0,0,0,0.04)`).
