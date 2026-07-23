# Domain Context & Glossary — Car Dealership Inventory System

## Core Domain Terms

### User
An authenticated actor in the system with a unique email and role (`USER` or `ADMIN`).

### Vehicle
A vehicle listed in the dealership inventory with specs (`make`, `model`, `category`), price in INR, available stock `quantity`, optional CDN `imageUrl`, and ImageKit `imageFileId` for remote asset management.

### Vehicle Category
Enum classifier for vehicle body types: `SEDAN`, `SUV`, `TRUCK`, `COUPE`, `HATCHBACK`, `VAN`, `MOTORCYCLE`.

### Inventory Stock
The physical count of vehicles available for purchase. Reduced atomically on purchase and increased during admin restock.

### Media Asset (Vehicle Image)
A remote image file stored on ImageKit CDN via `multer.memoryStorage()`, referenced by a public URL and file ID in the database.
