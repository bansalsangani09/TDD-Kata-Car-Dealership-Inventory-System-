# Car Dealership Inventory System — Frontend

A modern React SPA built with Vite, Tailwind CSS v4, React Router, and React Toastify.

## Tech Stack

- **React** (Vite)
- **React Router DOM** — client-side routing
- **Axios** — HTTP client with JWT interceptors
- **Tailwind CSS v4** — utility-first styling
- **Context API** — global auth state
- **React Toastify** — toast notifications

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (default: http://localhost:5173)
npm run dev

# Build for production
npm run build
```

> The dev server proxies `/api/*` requests to `http://localhost:3000` — make sure your backend is running.

## Folder Structure

```
frontend/
├── src/
│   ├── api/              # Axios instance & API modules
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context providers
│   ├── hooks/            # Custom hooks
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   ├── routes/           # Route definitions
│   ├── utils/            # Constants & helpers
│   ├── App.jsx           # Root component
│   ├── main.jsx          # Entry point
│   └── index.css         # Tailwind entry
├── vite.config.js
└── package.json
```

## Features

- **Authentication** — Register, Login, JWT storage, auto-redirect on 401
- **Dashboard** — Browse vehicles, search by make/model, filter by category/price, purchase
- **Admin Panel** — Add, update, delete, restock vehicles (admin-only)
- **Protected Routes** — Auth guard and admin guard
- **Responsive Design** — Mobile-first with Tailwind
- **Toast Notifications** — Success/error feedback
- **Loading States** — Animated spinners
- **Empty States** — Informative placeholders
