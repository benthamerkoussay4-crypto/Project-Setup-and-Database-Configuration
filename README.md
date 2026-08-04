# Project Setup and Database Configuration — BookNest (MERN Stack)

BookNest is a community platform for discovering and sharing memorable book recommendations.

This project is built using the **MERN Stack** paradigm:
- **MongoDB** (via **Mongoose**)
- **Express.js** / REST API Routes
- **React.js** (App Router & Client Components)
- **Node.js** runtime
- **JWT** (`jsonwebtoken`) and **bcrypt** (`bcryptjs`) for Authentication & Authorization

---

## Progress Overview

- [x] **Phase 1: Project Setup & Database Configuration**
  - Connected MongoDB via Mongoose.
  - Created initial Book Recommendation schema.
  - Setup REST API health-check endpoint (`/api/health`).

- [x] **Phase 2: User Authentication and Authorization**
  - Created Mongoose `User` model with email uniqueness and validation.
  - Implemented password hashing using `bcryptjs` (10 salt rounds) in Mongoose pre-save hook.
  - Built registration endpoint (`POST /api/auth/register`).
  - Built login endpoint (`POST /api/auth/login`).
  - Implemented JWT token generation and verification (`jsonwebtoken`).
  - Built protected user route (`GET /api/auth/me`).
  - Integrated React `AuthContext` and interactive auth modals for registration and login.

- [ ] **Phase 3: Book Search and Recommendation** *(Next)*
- [ ] **Phase 4: Book Details and Rating**
- [ ] **Phase 5: Community Features**
- [ ] **Phase 6: UI / UX Polish**
- [ ] **Phase 7: Deployment**

---

## Mongoose Schemas

### User Schema (`src/models/User.ts`)
- `name`: String (Required, min 2 chars, max 50 chars)
- `email`: String (Required, unique, lowercase, trimmed)
- `password`: String (Required, hashed with bcrypt)
- `role`: String (`user` | `admin`, default `user`)
- `avatar`: String (Optional)
- `bio`: String (Optional)
- Timestamps (`createdAt`, `updatedAt`)

### Book Recommendation Schema (`src/models/BookRecommendation.ts`)
- `title`: String (Required)
- `author`: String (Required)
- `isbn`: String (Optional)
- `genre`: String (Required)
- `description`: String (Required)
- `coverUrl`: String (Optional)
- `rating`: Number (1–5)
- `user`: ObjectId (Ref to `User`)
- `recommendedBy`: String
- `status`: String (`draft` | `published`)
- Timestamps (`createdAt`, `updatedAt`)

---

## REST API Endpoints (Phase 2)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Registers a new user, hashes password with bcrypt, and issues JWT token |
| `POST` | `/api/auth/login` | Public | Verifies email and password with bcrypt, returns JWT token |
| `GET` | `/api/auth/me` | Protected (JWT) | Validates active JWT token and returns current user profile |
| `POST` | `/api/auth/logout` | Public | Clears authorization token and session |
| `GET` | `/api/health` | Public | Returns database connection status and system state |

---

## Local Setup & Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables (`.env`):**
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/booknest_db
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000`.

---

## Phase 2 Submission Details

- **Commit Message:** `feat(auth): complete phase 2 user authentication with MongoDB, Mongoose, bcrypt, and JWT`
- **Scope:** Phase 2 complete. Ready for Phase 3.
