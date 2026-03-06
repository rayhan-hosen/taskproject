# QTEC Job Portal - High-Performance Backend API

Powerful, secure, and highly optimized RESTful API built to handle modern job board requirements. Engineered with a focus on **speed**, **data integrity**, and **security**.

🌐 **Connect to Frontend:** Uses `VITE_API_URL` for seamless integration.

---

## 🚀 Advanced Features

### ⚡ Performance-First Architecture
- **Parallelized Data Engine:** Analytics are fetched using `Promise.all`, running 8+ database queries simultaneously for sub-second dashboard responses.
- **Optimized SQL Aggregation:** Leveraging database-level `GROUP BY` and `COUNT` operations to minimize server-side processing overhead.
- **Smart Resource Management:** Using specific attribute selection and raw data fetching to reduce memory footprint.

### 📊 Intelligent Analytics & Bucketing
- **Precision Salary Engine:** A robust regex-based parser that handles varied salary formats (e.g., *৳80k*, *1.2 Lakh*, *80000*) and categorizes them into strict competitive ranges:
  - `Under 20k` | `20k - 40k` | `41k - 60k` | `61k - 80k` | `80k+`
- **Growth Metrics:** Real-time tracking of job views and application volume.
- **Regional Insights:** Automatic aggregation of job listings by location heatmaps.

### 🛡️ Enterprise-Grade Security
- **Dual-Layer XSS Defense:** Implements a custom-built recursive sanitizer (using the `xss` library) that deep-cleans `body`, `query`, and `params`.
- **SQL Injection Prevention:** 100% parameterization of database queries via Sequelize ORM.
- **Secure Infrastructure:**
  - **Helmet.js:** Integrated for protection against clickjacking, sniffing, and XSS.
  - **JWT Authentication:** Stateful admin access with Bcrypt salted hashing.
  - **Environment Isolation:** Sensitive config managed strictly via `.env` (git-ignored).

### ✅ Robust Validation
- **Strict Server-Side Checks:** Validates presence, email formats, and URL structures for every job and application submission.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js (v5+)
- **Database:** MySQL
- **ORM:** Sequelize
- **Security:** JWT, Bcrypt.js, Helmet, XSS Sanitizer
- **Logging:** Morgan (Dev/Prod streams)

---

## ⚡ Setup & Deployment

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Create a `.env` file with these keys:
   ```env
   PORT=5000
   NODE_ENV=production
   DB_NAME=
   DB_USER=
   DB_PASS=
   DB_HOST=
   JWT_SECRET=
   JWT_EXPIRE=30d
   ```

3. **Launch Platform:**
   ```bash
   # Development
   npm run dev
   # Production
   npm start
   ```

---

## 🔑 Demo Access
The system features an automated admin seeder:
- **Admin Username:** `admin`
- **Admin Password:** `admin`

---

## 📂 API Core Endpoints

| Category | Endpoint | Method | Key Feature |
| :--- | :--- | :--- | :--- |
| **Auth** | `/api/auth/login` | POST | Secure JWT Generation |
| **Jobs** | `/api/jobs` | GET | Multi-layer Filtering & Search |
| **Apps** | `/api/applications` | POST | Sanitized Submission |
| **Admin** | `/api/admin/stats` | GET | Parallelized Analytics Engine |

Developed with a commitment to clean code and high-security standards.
