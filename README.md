<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
</p>

# 🚗 Car Dealership Inventory System

A full-stack web application for managing a car dealership's vehicle inventory. Built with a **Node.js/Express REST API** backend and a **React SPA** frontend, featuring JWT authentication, role-based authorization, vehicle CRUD operations, search & filtering, purchase flow, and inventory restocking.

> **Developed using TDD (Test-Driven Development)** — all backend features were built following the Red → Green → Refactor cycle.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Folder Structure](#-folder-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Test Report](#-test-report)
- [My AI Usage](#-my-ai-usage)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

## 🧾 Project Overview

The **Car Dealership Inventory System** is a full-stack application that allows:

- **Users** to browse the vehicle inventory, search/filter vehicles by various criteria, and purchase vehicles.
- **Admins** to manage the entire inventory — add new vehicles, update details, delete listings, and restock quantities.

The system uses **JWT-based authentication** to secure all API endpoints and implements **role-based access control** (RBAC) to differentiate between regular users and administrators. The backend follows a **layered architecture** (Controller → Service → Prisma ORM) and was developed using **Test-Driven Development (TDD)** with comprehensive integration tests.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **🔐 Authentication** | User registration and login with secure password hashing (bcrypt) and JWT token generation |
| **🚘 Vehicle Management** | Full CRUD operations for vehicles — Create, Read, Update, Delete (Admin only) |
| **🔍 Search & Filter** | Search vehicles by make, model, category, and price range with flexible query building |
| **🛒 Purchase** | Users can purchase vehicles; quantity decrements atomically using database transactions |
| **📦 Restock** | Admins can restock vehicle quantities with validated amounts (Admin only) |
| **🛡️ Admin Authorization** | Role-based middleware separating admin-only routes from general user access |
| **🔑 JWT Security** | Stateless authentication using JSON Web Tokens with configurable expiration |
| **✅ Input Validation** | Request body validation using express-validator on all endpoints |
| **🎨 Modern UI** | Responsive React SPA with dark theme, glassmorphism design, and toast notifications |
| **⚡ Protected Routes** | Frontend route guards for authenticated and admin-only pages |

---

## 🛠️ Technology Stack

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **Prisma ORM** | Database toolkit and ORM for PostgreSQL |
| **PostgreSQL** | Relational database |
| **JSON Web Token** | Stateless authentication |
| **bcrypt** | Password hashing |
| **express-validator** | Request validation middleware |
| **cors** | Cross-Origin Resource Sharing |
| **dotenv** | Environment variable management |

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 19** | UI component library |
| **Vite 8** | Build tool and dev server |
| **React Router DOM 7** | Client-side routing |
| **Axios** | HTTP client with interceptors |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **React Toastify** | Toast notification system |
| **Context API** | Global state management (Auth) |

### Database

| Technology | Purpose |
|------------|---------|
| **PostgreSQL** | Primary database (production & development) |
| **Prisma Migrate** | Database schema migrations |

### Testing

| Technology | Purpose |
|------------|---------|
| **Jest** | Testing framework and test runner |
| **Supertest** | HTTP integration testing for Express |

---

## 📂 Folder Structure

### Backend

```
backend/
├── prisma/
│   ├── schema.prisma              # Database schema (User, Vehicle models)
│   └── migrations/                # Prisma migration files
│
├── src/
│   ├── config/
│   │   ├── db.js                  # Prisma client instance
│   │   └── jwt.js                 # JWT configuration
│   │
│   ├── constants/
│   │   └── auth.constants.js      # Auth-related message constants
│   │
│   ├── controllers/
│   │   ├── auth.controller.js     # Register & Login handlers
│   │   ├── vehicle.controller.js  # Vehicle CRUD handlers
│   │   └── inventory.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js     # JWT verification
│   │   ├── admin.middleware.js    # Admin role check
│   │   ├── validate.middleware.js # express-validator runner
│   │   └── error.middleware.js    # Global error handler
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Vehicle.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js         # /api/auth/*
│   │   ├── vehicle.routes.js      # /api/vehicles/*
│   │   └── inventory.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js        # Business logic for auth
│   │   ├── vehicle.service.js     # Business logic for vehicles
│   │   └── inventory.service.js   # Purchase & restock logic
│   │
│   ├── tests/
│   │   ├── setup.js               # Test environment setup
│   │   ├── auth.test.js           # Auth endpoint tests (12 cases)
│   │   └── vehicle.test.js        # Vehicle endpoint tests (39 cases)
│   │
│   ├── utils/
│   │   ├── ApiError.js            # Custom error class
│   │   ├── generateToken.js       # JWT token generator
│   │   ├── queryBuilder.js        # Dynamic search query builder
│   │   └── response.js            # Standardized response helpers
│   │
│   ├── validators/
│   │   ├── auth.validator.js      # Registration & login validation rules
│   │   └── vehicle.validator.js   # Vehicle create/update/restock rules
│   │
│   ├── app.js                     # Express application setup
│   └── server.js                  # Server entry point
│
├── .env.example
├── jest.config.js
└── package.json
```

### Frontend

```
frontend/
├── src/
│   ├── api/
│   │   ├── axios.js               # Axios instance with JWT interceptors
│   │   ├── authApi.js             # Auth API calls (login, register)
│   │   └── vehicleApi.js          # Vehicle API calls (CRUD, purchase, restock)
│   │
│   ├── components/
│   │   ├── Navbar.jsx             # Navigation bar with role badge & logout
│   │   ├── VehicleCard.jsx        # Vehicle display card with purchase button
│   │   ├── SearchBar.jsx          # Search input component
│   │   ├── Filter.jsx             # Category & price range filter dropdown
│   │   ├── VehicleForm.jsx        # Create/Edit vehicle form
│   │   ├── Loading.jsx            # Animated loading spinner
│   │   └── ProtectedRoute.jsx     # Auth & admin route guard
│   │
│   ├── context/
│   │   └── AuthContext.jsx        # Authentication state provider
│   │
│   ├── hooks/
│   │   └── useAuth.js             # Custom auth hook
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx         # App shell with Navbar
│   │
│   ├── pages/
│   │   ├── Login.jsx              # Login page
│   │   ├── Register.jsx           # Registration page
│   │   ├── Dashboard.jsx          # Vehicle inventory browse & purchase
│   │   ├── AdminDashboard.jsx     # Admin CRUD & restock panel
│   │   └── NotFound.jsx           # 404 page
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx          # Route definitions
│   │
│   ├── utils/
│   │   ├── constants.js           # API URL, categories, roles
│   │   └── helpers.js             # Currency format, error extraction
│   │
│   ├── App.jsx                    # Root component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Tailwind CSS entry
│
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **npm** (v9 or higher)

### 1. Clone the Repository

```bash
git clone https://github.com/bansalsangani09/TDD-Kata-Car-Dealership-Inventory-System-.git
cd TDD-Kata-Car-Dealership-Inventory-System-
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env with your database credentials (see Environment Variables section)

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

The backend server will start at **http://localhost:3000**

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start at **http://localhost:5173**

> **Note:** The Vite dev server proxies `/api/*` requests to `http://localhost:3000` automatically.

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

Create a `.env` file in the `backend/` directory:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/car_dealership?schema=public"
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `development` |
| `PORT` | Server port number | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/dbname` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `my_super_secret_key_123` |
| `JWT_EXPIRES_IN` | Token expiration duration | `7d` |

### Frontend (`frontend/.env`)

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000/api` |

> **Note:** Vite requires environment variables to be prefixed with `VITE_` to be exposed to client-side code via `import.meta.env`.

---

## 📡 API Endpoints

### Authentication

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| `POST` | `/api/auth/register` | ❌ None | Register a new user account. Expects `name`, `email`, `password`. Returns user object and JWT token. |
| `POST` | `/api/auth/login` | ❌ None | Login with existing credentials. Expects `email`, `password`. Returns user object and JWT token. |

### Vehicles

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| `GET` | `/api/vehicles` | 🔑 JWT | Get all vehicles in the inventory. Returns an array of vehicle objects. |
| `GET` | `/api/vehicles/search` | 🔑 JWT | Search and filter vehicles. Supports query params: `make`, `model`, `category`, `minPrice`, `maxPrice`. |
| `POST` | `/api/vehicles` | 🛡️ Admin | Create a new vehicle. Expects `make`, `model`, `category`, `price`, `quantity`. |
| `PUT` | `/api/vehicles/:id` | 🛡️ Admin | Update an existing vehicle by ID. Accepts partial updates for any vehicle field. |
| `DELETE` | `/api/vehicles/:id` | 🛡️ Admin | Delete a vehicle by ID. Permanently removes the vehicle from inventory. |
| `POST` | `/api/vehicles/:id/purchase` | 🔑 JWT | Purchase a vehicle. Decrements quantity by 1. Returns 400 if out of stock. |
| `POST` | `/api/vehicles/:id/restock` | 🛡️ Admin | Restock a vehicle. Expects `amount` (positive integer). Increments quantity. |

### Response Format

All API responses follow a standardized format:

```json
// Success
{
  "success": true,
  "message": "Descriptive success message",
  "data": { ... }
}

// Error
{
  "success": false,
  "message": "Descriptive error message"
}
```

---

## 📸 Screenshots

### Login Page
![Login Page](frontend/src/assets/Login.png)

### Register Page
![Register Page](frontend/src/assets/Register.png)

### Dashboard (Vehicle Inventory)
![Dashboard](frontend/src/assets/Dashboard.png)

### Admin Panel
![Admin Panel](frontend/src/assets/Admin-panel.png)

---

## 🧪 Test Report

The backend is thoroughly tested using **Jest** and **Supertest** with integration tests covering all API endpoints.

### Test Suite Summary

| Test Suite | Test Cases | Coverage |
|------------|-----------|----------|
| `auth.test.js` — Registration | 6 | Valid registration, duplicate email, missing fields, short password, invalid email |
| `auth.test.js` — Login | 6 | Valid login, wrong password, user not found, missing fields, invalid email |
| `vehicle.test.js` — Create Vehicle | 7 | Admin create, non-admin blocked, no token, missing fields, invalid price, invalid quantity |
| `vehicle.test.js` — Get & Search | 6 | Get all, filter by make, filter by model, filter by category, filter by price range, no results |
| `vehicle.test.js` — Purchase | 5 | Successful purchase, out of stock, no token, vehicle not found, invalid ID |
| `vehicle.test.js` — Restock | 8 | Admin restock, non-admin blocked, no token, missing amount, negative amount, non-integer, not found, invalid ID |
| `vehicle.test.js` — Update Vehicle | 8 | Admin update, non-admin blocked, no token, negative price, non-integer qty, negative qty, not found, invalid ID |
| `vehicle.test.js` — Delete Vehicle | 5 | Admin delete, non-admin blocked, no token, not found, invalid ID |
| **Total** | **51** | |

### Running Tests

```bash
cd backend
npm test
```

### What's Tested

- ✅ **Authentication** — Registration, login, validation, duplicate prevention
- ✅ **Authorization** — JWT verification, admin-only route protection
- ✅ **Vehicle CRUD** — Create, read, update, delete with validation
- ✅ **Search & Filter** — Multi-criteria search with query parameters
- ✅ **Purchase Flow** — Stock decrement, out-of-stock prevention, transactional safety
- ✅ **Restock** — Quantity increment with amount validation
- ✅ **Error Handling** — Invalid IDs, missing resources, malformed requests

---

## 🤖 My AI Usage

This project utilized AI tools as a development assistant:

- **ChatGPT** was used for **architecture planning** — helping design the layered service architecture and REST API structure.
- **AI assisted with boilerplate generation** — scaffolding repetitive patterns like controller/service/route files, middleware, and validators.
- **AI suggested test cases** — providing coverage ideas for edge cases, validation scenarios, and error handling paths.
- **All generated code was manually reviewed and modified** — every piece of AI-suggested code was carefully reviewed, tested, understood, and adapted to fit the project's specific requirements and coding standards.

> AI was used as a **productivity tool**, not as a replacement for understanding. All architectural decisions, debugging, and final implementations were done with full comprehension.

---

## 🔮 Future Improvements

- **📄 Pagination** — Add server-side pagination for vehicle listings with cursor-based or offset pagination
- **🖼️ Image Upload** — Allow admins to upload vehicle images using cloud storage (AWS S3 / Cloudinary)
- **☁️ Cloud Deployment** — Deploy backend to Render/Railway and frontend to Vercel/Netlify
- **🐳 Docker** — Containerize the full stack with Docker Compose for consistent development and deployment
- **🔄 CI/CD** — Set up GitHub Actions pipeline for automated testing, linting, and deployment on push

---

## 📄 License

This project is licensed under the **ISC License**.
