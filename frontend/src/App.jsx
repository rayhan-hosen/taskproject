import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home';
import JobListings from './pages/JobListings';
import JobDetail from './pages/JobDetail';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { JobProvider } from './context/JobContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContent = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      {/* Home page: no top padding (header is absolute/transparent over hero) */}
      {/* Other pages: top padding for fixed header */}
      <main className={`flex-grow ${isHome ? '' : 'pt-[80px] lg:pt-[100px]'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

function App() {
  return (
    <JobProvider>
      <Router>
        <AppContent />
      </Router>
    </JobProvider>
  );
}

export default App;
