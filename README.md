# QTEC Job Portal - Full Stack Solution

🌐 **Live Demo:** [https://rayhanweb.site](https://rayhanweb.site)

A premium, high-performance job board platform designed for the modern ecosystem. This project features a stunning React-based frontend and a robust, secure Node.js backend.

---

## 📂 Quick Links
- **[Detailed Frontend Documentation](./frontend/README.md)**
- **[Detailed Backend Documentation](./backend/README.md)**

---

## 🌟 Core Features

### 💻 Frontend (User & Admin UI)
- **Stunning Aesthetics:** Modern, premium UI featuring glassmorphism, smooth gradients, and Inter typography.
- **Dynamic Transitions:** Powered by **Framer Motion** for silky-smooth page entries and layout changes.
- **Job Seeker Experience:**
    - Real-time search and multi-layer filtering.
    - Toggleable view modes (Professional List vs. Creative Grid).
    - Premium "Apply Now" modal with state-aware feedback.
- **Admin Command Center:**
    - Advanced Analytics Dashboard with dynamic progress bars.
    - Full Job & Application Management (CRUD).
    - Responsive mobile-first admin controls.

### ⚙️ Backend (API & Data)
- **High Performance:** Optimized parallel query execution using `Promise.all`.
- **Intelligent Analytics:** Automatic data bucketing for Salaries, Locations, and Job Types.
- **RESTful Architecture:** Clean, well-documented API endpoints.
- **Database:** MySQL persistence managed via **Sequelize ORM**.

---

## 🛡️ Security Implementation

- **SQL Injection Defense:** All database queries are fully parameterized through Sequelize ORM. No raw SQL concatenation is used.
- **XSS Protection:**
    - **Frontend:** React's automatic JSX escaping prevents script injection.
    - **Backend:** Custom `xssMiddleware` using the `xss` library to sanitize all incoming `body`, `query`, and `params`.
- **Secure Headers:** Integrated **Helmet.js** to set security-focused HTTP headers (CSP, XSS Protection, HSTS).
- **Authentication:** Secure Admin access via **JWT (JSON Web Tokens)** with encrypted passwords (Bcryptjs).
- **Validation:** Strict server-side and client-side validation for emails, URLs, and required fields.

---

## 🔍 Filtering & Analytics Process

### 👤 User Panel Filtering
The user panel provides a real-time searching experience:
1. **Keyword Search:** Scans job titles, company names, and descriptions.
2. **Location Filter:** Partial matching for cities and regions.
3. **Category Selection:** Dropdown filtering for specific industries (Engineering, Design, etc.).
4. **Job Type:** Filter by Full-Time, Part-Time, or Remote roles.

### 👨‍💼 Admin Panel & Analytics
The dashboard transforms raw data into actionable insights:
1. **Salary Bucketing:** A custom parsing engine converts varied salary strings (e.g., "৳8ok", "1.2 Lakh") into standardized ranges:
    - Under 20k | 20k-40k | 41k-60k | 61k-80k | 80k+
2. **Location Heatmap:** Aggregates jobs by city to show hiring hotspots.
3. **Application Tracking:** Intelligent joins to identify the most popular job listings by application count.
4. **Optimized Search:** Admin listings feature advanced filters for rapid management of large datasets.

---

## 💻 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend:** Node.js, Express, Sequelize, MySQL.
- **Middleware:** JWT, Helmet, XSS, Morgan, CORS.

---

## 🛠️ Installation Summary

1. **Backend:**
   ```bash
   cd backend && npm install
   # Configure .env then:
   npm run dev
   ```

2. **Frontend:**
   ```bash
   cd frontend && npm install
   npm run dev
   ```

