import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home';
import JobListings from './pages/JobListings';
import JobDetail from './pages/JobDetail';
import Admin from './pages/Admin';
import { JobProvider } from './context/JobContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <JobProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans">
          <Header />
          <main className="flex-grow pt-[100px]"> {/* Height of absolute header */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<JobListings />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="bottom-right" theme="dark" />
        </div>
      </Router>
    </JobProvider>
  );
}

export default App;
