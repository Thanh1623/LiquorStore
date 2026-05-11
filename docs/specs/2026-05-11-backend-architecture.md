# Specification: Backend Architecture for LiquorStore

## 1. Overview
This document outlines the architecture for the Backend component of the LiquorStore project, leveraging Next.js API Routes (App Router) for an integrated full-stack solution.

## 2. Tech Stack
- **Framework:** Next.js API Routes (Serverless functions).
- **ORM:** Prisma (Type-safe database interaction).
- **Database:** PostgreSQL (Development: SQLite/PostgreSQL locally).
- **Authentication:** Auth.js (NextAuth.js) for JWT-based authentication.

## 3. Database Schema (Prisma)
- **User:** ID, Email, Password (hashed), Role, CreatedAt.
- **Product:** ID, Name, Price, Description, ImageUrl, StockQuantity, Category.
- **Order:** ID, UserID, TotalAmount, Status, Items (Relation), CreatedAt.
- **Cart:** ID, UserID, Items (JSON or Relation).

## 4. API Endpoints
### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Products
- `GET /api/products` (List)
- `GET /api/products/:id` (Detail)

### Orders
- `GET /api/orders` (My Orders)
- `POST /api/orders` (Create)

## 5. Auth Flow
- Client sends credentials -> Auth.js handles JWT creation.
- Session stored in secure Http-only cookie.
- API Routes protected by Auth.js session checks.

## 6. Implementation Plan
1. Setup Prisma & Database connection.
2. Define Schema & Run Migrations.
3. Configure Auth.js (Providers).
4. Implement API Route Handlers.
