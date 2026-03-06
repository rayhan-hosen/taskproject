# QuickHire - Premium Full-Stack Job Platform

QuickHire is a state-of-the-art job search platform that marries high-fidelity aesthetics with high-performance functionality. Designed to deliver an **ultra-smooth** and **highly intuitive** experience for both job seekers and administrators.

🌐 **Demo Live:** [https://rayhanweb.site](https://rayhanweb.site)

---

## 🚀 Key Feature Highlights

### 🎨 World-Class UI/UX
- **Inter Font Experience:** Fully integrated Google Fonts for superior readability and premium typography.
- **Glassmorphic Elements:** Modern design language with subtle blurs, sleek shadows, and layered aesthetics.
- **Interactive Animations:** Powered by **Framer Motion**, featuring seamless page transitions, layout shifts, and hover-triggered micro-interactions.

### 🔍 Advanced Search & Filter Engine
- **Centric Dashboard:** A refined, centered search interface optimized for all screen sizes.
- **Real-Time Responsiveness:** Instant filtering by Title, Company, Location, and Type.
- **Visual Diversity:** One-click toggle between **Grid View** (Creative) and **List View** (Professional).

### 👨‍💼 Professional Admin Command Center
- **Power Analytics:** High-fidelity data visualization with dynamic progress bars track:
  - **Salary Ranges:** Precision bucketing (Under 20k, 20-40k, 41-60k, 61-80k, 81k+).
  - **Location Heatmap:** Geographical job distribution.
  - **Growth Metrics:** Real-time views and application success rates.
- **Mobile-Ready Management:** Full CRUD job management optimized for on-the-go administration.

### 🛡️ Enterprise-Ready Foundations
- **Seamless SEO:** Robust metadata, OpenGraph tags, and Twitter Cards for social media dominance.
- **Secure Submissions:** Sanitized form handling and encrypted API communication.

---

## 💻 Technical Excellence

- **Core Framework:** [React.js](https://reactjs.org/) (v18+)
- **Build Engine:** [Vite](https://vitejs.dev/)
- **Visual Science:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation Orchestration:** [Framer Motion](https://www.framer.com/motion/)
- **Communication:** Axios + React Context API
- **Feedback:** React Toastify for instant user notification.

---

## ⚡ Setup & Launch

### 1. Prerequisites
- Node.js (v18+)
- Backend server running (refer to `/backend/README.md`)

### 2. Deployment
```bash
# Clone the repository
git clone https://github.com/rayhan-hosen/taskproject.git
cd taskproject/frontend

# Setup connection
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Install & Launch
npm install
npm run dev
```

---

## 📂 Architecture

```text
src/
├── components/       # Atomic UI system (common/home/layout)
├── context/          # Global State (JobContext.jsx)
├── pages/            # View Orchestration (Home, JobListings, Admin)
├── utils/            # Logic (Color parsing, Salary logic)
└── App.jsx           # Main routing and security layers
```

Developed with a passion for high-end web performance and premium visual storytelling.
