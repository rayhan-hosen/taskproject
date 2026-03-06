# QTEC Job Portal - Backend API

Robust and secure RESTful API built with Node.js, Express, and MySQL (Sequelize ORM) to power the QTEC Job Portal.

## 🚀 Features

- **Job Management:** Comprehensive CRUD operations for job listings.
- **Application System:** Secure job application submission with validation.
- **Admin Dashboard Analytics:** Advanced data bucketing (Salary ranges, Locations, Job Types).
- **Security Suite:** 
  - **SQL Injection Protection:** via Sequelize parameterized queries.
  - **XSS Protection:** via custom sanitization middleware.
  - **Secure Headers:** via Helmet.js.
  - **JWT Authentication:** Secure admin access.
- **Performance:** Parallelized database queries for analytics.

## 🛠️ Tech Stack

- **Core:** Node.js, Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Security:** JWT, Bcrypt.js, Helmet, XSS-Clean logic.
- **Logging:** Morgan

---

## ⚡ Quick Start

### 1. Prerequisites
- Node.js (v16+)
- MySQL Server

### 2. Installation
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the `backend` directory:
```env
PORT=5000
NODE_ENV=
DB_NAME=
DB_USER=
DB_PASS=
DB_HOST=
JWT_SECRET=
JWT_EXPIRE=
```

### 4. Database Setup
The system uses Sequelize's `sync` feature. Ensure your MySQL server is running and the database specified in `DB_NAME` exists. The server will automatically create/update tables on startup.

### 5. Running the Application
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

---

## 🔑 Admin Credentials (Demo)
By default, the system initializes an admin account if none exists:
- **Username:** `admin`
- **Password:** `admin`

---

## 📂 API Structure (Major Endpoints)

| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/auth/login` | POST | Admin Login | Public |
| `/api/jobs` | GET | List Jobs (Filters & Search) | Public |
| `/api/jobs/:id` | GET | Get Job Details | Public |
| `/api/applications` | POST | Submit Application | Public |
| `/api/admin/stats` | GET | Dashboard Analytics | Admin Only |
| `/api/admin/jobs` | POST/PUT/DELETE | Manage Job Listings | Admin Only |

---

## 🛡️ Security Implementation
- **Data Sanitization:** All incoming requests (Body/Query/Params) are sanitized against XSS.
- **Parameterization:** All database interactions use Sequelize abstraction to prevent SQL Injection.
- **Encryption:** Admin passwords are hashed using Bcrypt.js (10 salts).
- **Validation:** Strict server-side validation for required fields, email formats, and URLs.
