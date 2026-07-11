# 🚗 Car Dealership Inventory System — API

A RESTful backend API for managing a car dealership's vehicle inventory, built with Node.js, Express, and MongoDB.

---

## Tech Stack

| Layer          | Technology                  |
|----------------|-----------------------------|
| Runtime        | Node.js                     |
| Framework      | Express.js                  |
| Database       | MongoDB (via Mongoose)       |
| Authentication | JWT + bcrypt                 |
| Validation     | express-validator            |
| Testing        | Jest + Supertest             |
| Environment    | dotenv                       |
| Dev Server     | nodemon                      |

---

## Folder Structure

```
backend/
│
├── src/
│   ├── config/
│   │   ├── db.js                  # MongoDB connection
│   │   └── jwt.js                 # JWT configuration
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── vehicle.controller.js
│   │   └── inventory.controller.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── vehicle.service.js
│   │   └── inventory.service.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Vehicle.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── vehicle.routes.js
│   │   └── inventory.routes.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js      # JWT verification
│   │   ├── admin.middleware.js     # Role-based access
│   │   ├── error.middleware.js     # Global error handler
│   │   └── validate.middleware.js  # express-validator runner
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   └── vehicle.validator.js
│   │
│   ├── utils/
│   │   ├── generateToken.js        # JWT token factory
│   │   ├── ApiError.js             # Custom error class
│   │   └── response.js             # Standardized response helpers
│   │
│   ├── tests/
│   │   ├── auth.test.js
│   │   ├── vehicle.test.js
│   │   └── inventory.test.js
│   │
│   ├── app.js                      # Express app
│   └── server.js                   # Entry point
│
├── .env.example
├── .gitignore
├── jest.config.js
├── package.json
└── README.md
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Update `.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/car-dealership
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

---

## Commands

| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm start`     | Start server in production mode      |
| `npm run dev`   | Start server with nodemon (hot reload) |
| `npm test`      | Run Jest test suite                  |

---

## Health Check

```
GET /
```

Response:
```json
{
  "message": "Car Dealership Inventory API Running"
}
```

---

> **Note**: API documentation will be added once endpoints are implemented.
