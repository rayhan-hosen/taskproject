import React, { useState, useEffect, useCallback } from 'react';
import { useJobs } from '../context/JobContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit3, Search, CheckCircle2, XCircle, LogOut, Loader2, Briefcase, FileText, Eye, ExternalLink, MapPin, DollarSign } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { AdminTableRowSkeleton, AdminAppRowSkeleton } from '../components/common/Skeleton/Skeleton';
import { getCompanyColor } from '../utils/colorUtils';

const Admin = () => {
    const { jobs, addJob, updateJob, deleteJob, fetchJobs, hasMore, loading, updateFilters, filters } = useJobs();
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    // Auth
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    // Tabs
    const [activeTab, setActiveTab] = useState('dashboard');

    // Stats
    const [stats, setStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(false);

    // Job UI
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [initialLoaded, setInitialLoaded] = useState(false);

    // Job form
    const [formData, setFormData] = useState({
        title: '', company: '', location: '', category: '',
        type: 'Full Time', salary: '', description: '', brandColor: 'bg-primary'
    });

    // Applications state
    const [applications, setApplications] = useState([]);
    const [appLoading, setAppLoading] = useState(false);
    const [appPage, setAppPage] = useState(1);
    const [appHasMore, setAppHasMore] = useState(true);
    const [appSearch, setAppSearch] = useState('');
    const [viewingApp, setViewingApp] = useState(null);

    // Redirect if not logged in
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Load initial data
    useEffect(() => {
        if (isAuthenticated) {
            if (activeTab === 'dashboard') fetchStats();
            else if (activeTab === 'jobs' && !initialLoaded) {
                fetchJobs(true);
                setInitialLoaded(true);
            } else if (activeTab === 'applications' && applications.length === 0) {
                loadApplications(true);
            }
        }
    }, [activeTab, isAuthenticated]);

    const fetchStats = async () => {
        setStatsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/admin/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(response.data.stats);
        } catch (error) {
            console.error('Error fetching stats:', error);
            if (error.response?.status === 401) handleLogout();
        } finally {
            setStatsLoading(false);
        }
    };

    const loadApplications = useCallback(async (isNew = false) => {
        if (appLoading) return;
        setAppLoading(true);
        try {
            const token = localStorage.getItem('token');
            const currentPage = isNew ? 1 : appPage;
            const response = await axios.get(`${API_URL}/applications`, {
                params: { page: currentPage, limit: 10, search: appSearch },
                headers: { Authorization: `Bearer ${token}` }
            });
            const { applications: newApps, totalPages } = response.data;
            setApplications(prev => isNew ? newApps : [...prev, ...newApps]);
            setAppHasMore(currentPage < totalPages);
            setAppPage(currentPage + 1);
        } catch (error) {
            if (error.response?.status === 401) {
                handleLogout();
            }
            console.error('Error loading applications:', error);
        } finally {
            setAppLoading(false);
        }
    }, [appLoading, appPage, appSearch, API_URL]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    const handleOpenAdd = () => {
        setEditingJob(null);
        setFormData({
            title: '', company: '', location: '', category: '',
            type: 'Full Time', salary: '', description: '', brandColor: 'bg-primary'
        });
        setIsFormOpen(true);
    };

    const handleOpenEdit = (job) => {
        setEditingJob(job);
        setFormData({
            title: job.title, company: job.company, location: job.location,
            category: job.category, type: job.type, salary: job.salary,
            description: job.description, brandColor: job.brandColor || 'bg-primary'
        });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingJob) {
            const success = await updateJob(editingJob.id, formData);
            if (success) { toast.success('Job updated!'); setIsFormOpen(false); }
            else toast.error('Failed to update.');
        } else {
            const success = await addJob({ ...formData, tags: [formData.category || 'General'] });
            if (success) { toast.success('Job posted!'); setIsFormOpen(false); }
            else toast.error('Failed to post.');
        }
    };

    const handleDeleteJob = async (id, title) => {
        if (window.confirm(`Delete "${title}"?`)) {
            const success = await deleteJob(id);
            if (success) toast.success('Job deleted.');
        }
    };

    const handleDeleteApp = async (id) => {
        if (window.confirm('Delete this application?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_URL}/applications/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setApplications(prev => prev.filter(a => a.id !== id));
                if (viewingApp?.id === id) setViewingApp(null);
                toast.success('Application deleted.');
            } catch (error) {
                toast.error('Failed to delete application.');
            }
        }
    };

    const handleAppSearch = () => {
        setApplications([]);
        setAppPage(1);
        setAppHasMore(true);
        // Trigger reload
        setTimeout(() => loadApplications(true), 0);
    };

    if (!isAuthenticated) return null;



    return (
        <div className="bg-[#f8f8fd] min-h-screen pb-32">
            {/* Header Section*/}
            <div className="top-[80px] lg:top-[100px] z-[100]">
                <div className="bg-white border-b border-gray-100 py-6 lg:py-8 shadow-sm">
                    <div className="container">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tighter text-[#252733] mb-1">Admin Dashboard</h1>
                                <div className="flex items-center gap-4">
                                    <p className="text-[#a0a3a8] font-bold uppercase tracking-wider text-xs lg:text-sm">{jobs.length} Jobs Loaded</p>
                                    <button onClick={handleLogout} className="flex items-center gap-1 text-rose-500 font-bold hover:underline text-xs lg:text-sm">
                                        <LogOut size={14} /> Logout
                                    </button>
                                </div>
                            </div>
                            {activeTab === 'jobs' && (
                                <button onClick={handleOpenAdd}
                                    className="bg-primary hover:bg-primary-hover text-white px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-black text-sm lg:text-[16px] transition-all shadow-xl active:scale-95 shadow-indigo-100/50 flex items-center justify-center gap-3"
                                >
                                    <Plus size={20} strokeWidth={3} /> Add New Job
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tab Navigation - PART OF STICKY */}
                <div className="bg-white border-b border-gray-100">
                    <div className="container flex gap-0">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: null },
                            { id: 'jobs', label: 'Job Listings', icon: <Briefcase size={18} /> },
                            { id: 'applications', label: 'Applications', icon: <FileText size={18} /> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 lg:px-8 py-4 font-black text-xs lg:text-[15px] uppercase tracking-wider border-b-[3px] transition-all flex items-center gap-2 ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-[#a0a3a8] hover:text-[#252733]'
                                    }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dashboard Controls & Search - Premium Centered Design */}
            <AnimatePresence mode="wait">
                {activeTab !== 'dashboard' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-[#f8f8fd] py-8 lg:py-12 border-b border-gray-100"
                    >
                        <div className="container">
                            <div className="flex justify-center w-full">
                                <div className="w-full max-w-4xl">
                                    {activeTab === 'jobs' ? (
                                        <div className="bg-white p-4 lg:p-5 rounded-[32px] shadow-[0_20px_50px_rgba(70,64,222,0.05)] border border-gray-100 space-y-5">
                                            <div className="flex flex-col md:flex-row gap-4">
                                                <div className="flex-[2] relative group">
                                                    <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-all group-focus-within:scale-110" />
                                                    <input
                                                        type="text" placeholder="Search job titles, skills, or companies..."
                                                        className="w-full bg-gray-50/70 pl-16 pr-8 py-5 rounded-2xl lg:rounded-[20px] outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300 text-sm sm:text-base border-2 border-transparent focus:border-primary/10 focus:bg-white focus:shadow-inner"
                                                        value={filters.search}
                                                        onChange={(e) => updateFilters({ search: e.target.value })}
                                                    />
                                                </div>
                                                <div className="flex-1 relative group">
                                                    <MapPin size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-all group-focus-within:scale-110" />
                                                    <input
                                                        type="text" placeholder="Location..."
                                                        className="w-full bg-gray-50/70 pl-16 pr-8 py-5 rounded-2xl lg:rounded-[20px] outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300 text-sm sm:text-base border-2 border-transparent focus:border-primary/10 focus:bg-white focus:shadow-inner"
                                                        value={filters.location}
                                                        onChange={(e) => updateFilters({ location: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-5 border-t border-gray-100/60">
                                                <div className="flex-1 relative group">
                                                    <Briefcase size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                                                    <select
                                                        className="w-full bg-gray-50/70 pl-12 pr-6 py-4 rounded-xl lg:rounded-[15px] outline-none font-bold text-[#252733] text-sm appearance-none border-2 border-transparent focus:border-primary/10 focus:bg-white transition-all cursor-pointer"
                                                        value={filters.type}
                                                        onChange={(e) => updateFilters({ type: e.target.value })}
                                                    >
                                                        <option value="">Job Type: All</option>
                                                        <option value="Full Time">Full Time</option>
                                                        <option value="Part Time">Part Time</option>
                                                        <option value="Remote">Remote</option>
                                                        <option value="Contract">Contract</option>
                                                    </select>
                                                </div>
                                                <div className="flex-1 relative group">
                                                    <DollarSign size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                                                    <input
                                                        type="text" placeholder="Salary (e.g. 50k - 100k)"
                                                        className="w-full bg-gray-50/70 pl-12 pr-6 py-4 rounded-xl lg:rounded-[15px] outline-none font-bold text-[#252733] text-sm placeholder:text-gray-300 border-2 border-transparent focus:border-primary/10 focus:bg-white transition-all"
                                                        value={filters.salary}
                                                        onChange={(e) => updateFilters({ salary: e.target.value })}
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => updateFilters({ search: '', location: '', category: '', type: '', salary: '' })}
                                                    className="flex items-center justify-center gap-2 text-primary font-black text-xs uppercase hover:text-primary-hover transition-colors whitespace-nowrap px-4 py-2 hover:bg-primary/5 rounded-lg"
                                                >
                                                    <XCircle size={14} />
                                                    Reset Filters
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative group flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(70,64,222,0.05)] border border-gray-100">
                                            <div className="relative flex-1">
                                                <Search size={22} className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-all group-focus-within:scale-110" />
                                                <input
                                                    type="text" placeholder="Search applications by name, email, or job..."
                                                    className="w-full bg-transparent pl-18 sm:pl-20 pr-8 py-5 lg:py-6 outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300 text-sm sm:text-base"
                                                    value={appSearch}
                                                    onChange={(e) => setAppSearch(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleAppSearch()}
                                                />
                                            </div>
                                            <button onClick={handleAppSearch}
                                                className="bg-primary text-white px-10 lg:px-14 py-4 lg:py-6 rounded-[24px] font-black text-sm sm:text-base hover:bg-primary-hover transition-all active:scale-[0.97] shrink-0 shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
                                            >
                                                <Search size={20} strokeWidth={3} />
                                                Search Applications
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <div className="container pt-10">
                {/* ════════════ DASHBOARD TAB ════════════ */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-10">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Total Jobs', value: stats?.totalJobs || 0, color: 'text-primary', bg: 'bg-indigo-50' },
                                { label: 'Total Views', value: stats?.totalViews || 0, color: 'text-[#252733]', bg: 'bg-gray-100' },
                                { label: 'Total Applications', value: stats?.totalApplications || 0, color: 'text-[#56CDAD]', bg: 'bg-emerald-50' },
                                { label: 'Avg. App/Job', value: stats?.totalJobs ? (stats.totalApplications / stats.totalJobs).toFixed(1) : 0, color: 'text-rose-500', bg: 'bg-rose-50' }
                            ].map((card, i) => (
                                <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                    <p className="text-xs font-black text-[#a0a3a8] uppercase tracking-widest mb-4">{card.label}</p>
                                    <div className="flex items-center justify-between">
                                        <h3 className={`text-4xl font-black ${card.color}`}>{card.value}</h3>
                                        <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center`}>
                                            <div className={`w-2 h-2 rounded-full ${card.color.replace('text-', 'bg-')}`}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Charts Area */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                            {/* Jobs by Location */}
                            <div className="bg-white p-6 lg:p-8 rounded-[24px] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                                <h3 className="text-lg lg:text-xl font-black text-[#252733] mb-8 flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                    Jobs by Location
                                </h3>
                                <div className="space-y-7">
                                    {stats?.jobsByLocation?.slice(0, 5).map((loc, i) => (
                                        <div key={i} className="space-y-3 group">
                                            <div className="flex justify-between text-[13px] font-black uppercase tracking-wider">
                                                <span className="text-[#252733]/70 group-hover:text-primary transition-colors">{loc.location}</span>
                                                <span className="text-[#252733]">{loc.count}</span>
                                            </div>
                                            <div className="h-2.5 w-full bg-gray-50 rounded-full overflow-hidden shadow-inner">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${stats?.totalJobs > 0 ? (loc.count / stats.totalJobs) * 100 : 0}%` }}
                                                    className="h-full bg-gradient-to-r from-primary to-indigo-400 rounded-full shadow-[0_0_10px_rgba(70,64,222,0.2)]"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Jobs by Type */}
                            <div className="bg-white p-6 lg:p-8 rounded-[24px] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                                <h3 className="text-lg lg:text-xl font-black text-[#252733] mb-8 flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-[#56CDAD] rounded-full"></span>
                                    Jobs by Type
                                </h3>
                                <div className="space-y-7">
                                    {stats?.jobsByType?.map((type, i) => (
                                        <div key={i} className="space-y-3 group">
                                            <div className="flex justify-between text-[13px] font-black uppercase tracking-wider">
                                                <span className="text-[#252733]/70 group-hover:text-[#56CDAD] transition-colors">{type.type}</span>
                                                <span className="text-[#252733]">{type.count}</span>
                                            </div>
                                            <div className="h-2.5 w-full bg-gray-50 rounded-full overflow-hidden shadow-inner">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${stats?.totalJobs > 0 ? (type.count / stats.totalJobs) * 100 : 0}%` }}
                                                    className="h-full bg-gradient-to-r from-[#56CDAD] to-emerald-300 rounded-full shadow-[0_0_10px_rgba(86,205,173,0.2)]"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Jobs by Salary */}
                            <div className="bg-white p-6 lg:p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-lg lg:text-xl font-black text-[#252733] mb-6 lg:mb-8">By Salary Range</h3>
                                <div className="space-y-6">
                                    {(stats?.jobsBySalary || [
                                        { salary: 'Under 20k', count: 0 },
                                        { salary: '20k - 40k', count: 0 },
                                        { salary: '41k - 60k', count: 0 },
                                        { salary: '61k - 80k', count: 0 },
                                        { salary: '80k+', count: 0 }
                                    ]).map((sal, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-sm font-bold">
                                                <span className="text-[#252733]">{sal.salary}</span>
                                                <span className="text-[#a0a3a8]">{sal.count} jobs</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${stats?.totalJobs > 0 ? (sal.count / stats.totalJobs) * 100 : 0}%` }}
                                                    className="h-full bg-[#FFB836]"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Popularity Tables Group */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Top Jobs by Applications */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-black text-[#252733] mb-8">Most Popular by Applications</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-50">
                                                <th className="pb-4 text-xs font-black text-[#a0a3a8] uppercase tracking-widest text-center w-16">Rank</th>
                                                <th className="pb-4 text-xs font-black text-[#a0a3a8] uppercase tracking-widest">Job</th>
                                                <th className="pb-4 text-xs font-black text-[#a0a3a8] uppercase tracking-widest text-right">Count</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {stats?.topJobs?.map((job, i) => (
                                                <tr key={i} className="group transition-colors">
                                                    <td className="py-5 text-center">
                                                        <span className={`w-7 h-7 rounded-sm flex items-center justify-center font-black text-xs mx-auto ${i === 0 ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'
                                                            }`}>
                                                            {i + 1}
                                                        </span>
                                                    </td>
                                                    <td className="py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                style={{ backgroundColor: getCompanyColor(job.job?.company, job.job?.brandColor) }}
                                                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-sm shrink-0"
                                                            >
                                                                {job.job?.company?.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-[#252733] text-sm leading-tight">{job.job?.title}</p>
                                                                <p className="text-[10px] font-medium text-[#a0a3a8] uppercase tracking-widest leading-none outline-none">{job.job?.company}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 text-right font-black text-primary text-sm whitespace-nowrap">
                                                        {job.count} Applications
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Top Jobs by Views */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-black text-[#252733] mb-8">Most Viewed Jobs</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-50">
                                                <th className="pb-4 text-xs font-black text-[#a0a3a8] uppercase tracking-widest text-center w-16">Rank</th>
                                                <th className="pb-4 text-xs font-black text-[#a0a3a8] uppercase tracking-widest">Job</th>
                                                <th className="pb-4 text-xs font-black text-[#a0a3a8] uppercase tracking-widest text-right">Views</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {stats?.mostViewedJobs?.map((job, i) => (
                                                <tr key={i} className="group transition-colors">
                                                    <td className="py-5 text-center">
                                                        <span className={`w-7 h-7 rounded-sm flex items-center justify-center font-black text-xs mx-auto ${i === 0 ? 'bg-indigo-100 text-primary' : 'bg-gray-100 text-gray-400'
                                                            }`}>
                                                            {i + 1}
                                                        </span>
                                                    </td>
                                                    <td className="py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                style={{ backgroundColor: getCompanyColor(job.company, job.brandColor) }}
                                                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-sm shrink-0"
                                                            >
                                                                {job.company?.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-[#252733] text-sm leading-tight">{job.title}</p>
                                                                <p className="text-[10px] font-medium text-[#a0a3a8] uppercase tracking-widest leading-none outline-none">{job.company}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 text-right font-black text-[#252733] text-sm whitespace-nowrap">
                                                        <div className="flex items-center justify-end gap-1.5 pt-px">
                                                            <Eye size={14} className="text-[#a0a3a8]" />
                                                            {job.views}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* ════════════ JOBS TAB ════════════ */}
                {activeTab === 'jobs' && (
                    <>

                        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] mb-8">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50/50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-8 py-5 text-xs font-black text-[#a0a3a8] uppercase tracking-widest">Company & Job</th>
                                            <th className="px-8 py-5 text-xs font-black text-[#a0a3a8] uppercase tracking-widest hidden md:table-cell">Details</th>
                                            <th className="px-8 py-5 text-xs font-black text-[#a0a3a8] uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        <AnimatePresence>
                                            {loading && jobs.length === 0 ? (
                                                // Skeleton loading rows
                                                Array.from({ length: 5 }).map((_, i) => <AdminTableRowSkeleton key={i} />)
                                            ) : jobs.length > 0 ? jobs.map((job) => (
                                                <motion.tr layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                                    key={job.id} className="group hover:bg-gray-50/50 transition-colors"
                                                >
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div
                                                                style={{ backgroundColor: getCompanyColor(job.company, job.brandColor) }}
                                                                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm text-white font-black text-lg overflow-hidden"
                                                            >
                                                                {job.company?.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-[17px] text-[#252733] mb-0.5 group-hover:text-primary transition-colors">{job.title}</p>
                                                                <p className="text-[#a0a3a8] font-bold text-xs uppercase tracking-wider">{job.company}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 hidden md:table-cell">
                                                        <div className="flex flex-wrap gap-1.5 mb-1.5">
                                                            <span className="px-2.5 py-0.5 bg-indigo-50 text-primary rounded-full text-[10px] font-black uppercase tracking-wider">{job.category || 'General'}</span>
                                                            <span className="px-2.5 py-0.5 bg-emerald-50 text-[#56CDAD] rounded-full text-[10px] font-black uppercase tracking-wider">{job.type}</span>
                                                        </div>
                                                        <p className="text-[#7c8087] font-bold text-xs">{job.location}</p>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button onClick={() => handleOpenEdit(job)}
                                                                className="p-2.5 bg-indigo-50 text-primary rounded-lg hover:bg-primary hover:text-white transition-all active:scale-95" title="Edit">
                                                                <Edit3 size={16} />
                                                            </button>
                                                            <button onClick={() => handleDeleteJob(job.id, job.title)}
                                                                className="p-2.5 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all active:scale-95" title="Delete">
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="3" className="px-8 py-16 text-center">
                                                        <p className="text-[#7c8087] font-black italic">No listings found.</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Load More */}
                        {hasMore && (
                            <div className="flex flex-col items-center gap-4">
                                <button onClick={() => fetchJobs()}
                                    className="bg-white border border-gray-200 px-10 py-4 rounded-xl font-black text-[#252733] hover:border-primary hover:text-primary transition-all shadow-sm flex items-center gap-3 active:scale-95 disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {loading && <Loader2 className="animate-spin" size={18} />}
                                    {loading ? 'Loading...' : 'Load More Jobs'}
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* ════════════ APPLICATIONS TAB ════════════ */}
                {activeTab === 'applications' && (
                    <>

                        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] mb-8">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50/50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-8 py-5 text-xs font-black text-[#a0a3a8] uppercase tracking-widest">Applicant</th>
                                            <th className="px-8 py-5 text-xs font-black text-[#a0a3a8] uppercase tracking-widest hidden md:table-cell">Applied For</th>
                                            <th className="px-8 py-5 text-xs font-black text-[#a0a3a8] uppercase tracking-widest hidden lg:table-cell">Date</th>
                                            <th className="px-8 py-5 text-xs font-black text-[#a0a3a8] uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {appLoading && applications.length === 0 ? (
                                            Array.from({ length: 5 }).map((_, i) => <AdminAppRowSkeleton key={i} />)
                                        ) : applications.length > 0 ? applications.map((app) => (
                                            <tr key={app.id} className="group hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-6">
                                                    <p className="font-black text-[17px] text-[#252733] mb-0.5">{app.name}</p>
                                                    <p className="text-[#a0a3a8] font-bold text-xs">{app.email}</p>
                                                </td>
                                                <td className="px-8 py-6 hidden md:table-cell">
                                                    <p className="font-bold text-[#252733] text-sm">{app.job?.title || 'N/A'}</p>
                                                    <p className="text-[#a0a3a8] font-bold text-xs">{app.job?.company || ''}</p>
                                                </td>
                                                <td className="px-8 py-6 hidden lg:table-cell">
                                                    <p className="text-[#7c8087] font-bold text-xs">{new Date(app.created_at || app.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button onClick={() => setViewingApp(app)}
                                                            className="p-2.5 bg-indigo-50 text-primary rounded-lg hover:bg-primary hover:text-white transition-all active:scale-95" title="View">
                                                            <Eye size={16} />
                                                        </button>
                                                        <button onClick={() => handleDeleteApp(app.id)}
                                                            className="p-2.5 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all active:scale-95" title="Delete">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="4" className="px-8 py-16 text-center">
                                                    <p className="text-[#7c8087] font-black italic">No applications found.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {appLoading && (
                            <div className="flex justify-center py-6">
                                <Loader2 className="animate-spin text-primary" size={32} />
                            </div>
                        )}

                        {appHasMore && !appLoading && (
                            <div className="flex flex-col items-center gap-4">
                                <button onClick={() => loadApplications()}
                                    className="bg-white border border-gray-200 px-10 py-4 rounded-xl font-black text-[#252733] hover:border-primary hover:text-primary transition-all shadow-sm flex items-center gap-3 active:scale-95"
                                >Load More Applications</button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* ════════════ VIEW APPLICATION MODAL ════════════ */}
            <AnimatePresence>
                {viewingApp && (
                    <div className="fixed inset-0 z-[200] flex justify-center p-4 sm:p-6 overflow-y-auto pt-10 pb-10">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-[#252733]/80 backdrop-blur-sm" onClick={() => setViewingApp(null)} />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[24px] sm:rounded-3xl w-full max-w-[600px] relative z-[210] overflow-hidden shadow-2xl my-auto"
                        >
                            <div className="bg-[#4640de] p-6 sm:p-8 lg:p-10 text-white flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black mb-1 leading-tight">Application Details</h2>
                                    <p className="opacity-80 font-medium text-xs sm:text-sm">{viewingApp.job?.title} <span className="hidden sm:inline">at {viewingApp.job?.company}</span></p>
                                </div>
                                <button onClick={() => setViewingApp(null)} className="text-white/50 hover:text-white transition-colors mt-1 shrink-0">
                                    <XCircle size={28} className="sm:w-8 sm:h-8" />
                                </button>
                            </div>
                            <div className="p-6 sm:p-8 lg:p-10 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-xs font-black text-[#a0a3a8] uppercase tracking-widest mb-1">Name</p>
                                        <p className="font-black text-[#252733] text-lg">{viewingApp.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-[#a0a3a8] uppercase tracking-widest mb-1">Email</p>
                                        <p className="font-bold text-[#252733]">{viewingApp.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-black text-[#a0a3a8] uppercase tracking-widest mb-1">Resume Link</p>
                                    <a href={viewingApp.resumeLink || viewingApp.resume_link} target="_blank" rel="noopener noreferrer"
                                        className="text-primary font-bold hover:underline flex items-center gap-1 break-all">
                                        {viewingApp.resumeLink || viewingApp.resume_link} <ExternalLink size={14} />
                                    </a>
                                </div>
                                <div>
                                    <p className="text-xs font-black text-[#a0a3a8] uppercase tracking-widest mb-1">Cover Note</p>
                                    <p className="text-[#5e6282] font-medium leading-relaxed bg-gray-50 p-4 rounded-xl">{viewingApp.coverNote || viewingApp.cover_note || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-black text-[#a0a3a8] uppercase tracking-widest mb-1">Applied On</p>
                                    <p className="font-bold text-[#252733]">{new Date(viewingApp.created_at || viewingApp.createdAt).toLocaleString()}</p>
                                </div>
                                <button onClick={() => { handleDeleteApp(viewingApp.id); }}
                                    className="w-full bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white py-4 rounded-xl font-black transition-all active:scale-95 flex items-center justify-center gap-2">
                                    <Trash2 size={18} /> Delete Application
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ════════════ ADD/EDIT JOB MODAL ════════════ */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-[200] flex justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto pt-10 pb-10">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-[#252733]/80 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[24px] sm:rounded-3xl w-full max-w-[800px] relative z-[210] overflow-hidden shadow-2xl my-auto"
                        >
                            <div className="bg-[#4640de] p-6 sm:p-8 lg:p-10 text-white flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1">{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
                                    <p className="opacity-80 font-medium tracking-wide uppercase text-[10px] sm:text-xs lg:text-sm">{editingJob ? 'Update the listing details' : 'Create a new opening'}</p>
                                </div>
                                <button onClick={() => setIsFormOpen(false)} className="text-white/50 hover:text-white transition-colors shrink-0">
                                    <XCircle size={32} className="lg:w-10 lg:h-10" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-10">
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label className="text-[#252733] font-black text-[10px] sm:text-xs uppercase tracking-widest">Job Title</label>
                                        <input required type="text" placeholder="e.g. Senior Frontend Engineer"
                                            className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300 text-sm sm:text-base"
                                            value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                    </div>
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label className="text-[#252733] font-black text-[10px] sm:text-xs uppercase tracking-widest">Company Name</label>
                                        <input required type="text" placeholder="e.g. Facebook"
                                            className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300 text-sm sm:text-base"
                                            value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                                    </div>
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label className="text-[#252733] font-black text-[10px] sm:text-xs uppercase tracking-widest">Location</label>
                                        <input required type="text" placeholder="e.g. Dhaka, Bangladesh"
                                            className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300 text-sm sm:text-base"
                                            value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                                    </div>
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label className="text-[#252733] font-black text-[10px] sm:text-xs uppercase tracking-widest">Category</label>
                                        <select required className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl outline-none font-bold text-[#252733] transition-all text-sm sm:text-base"
                                            value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                            <option value="">Select Category</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Design">Design</option>
                                            <option value="Engineering">Engineering</option>
                                            <option value="Business">Business</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2 sm:space-y-3 mb-8 lg:mb-10">
                                    <label className="text-[#252733] font-black text-[10px] sm:text-xs uppercase tracking-widest">Salary & Description</label>
                                    <input type="text" placeholder="e.g. ৳80k - ৳120k"
                                        className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300 mb-4 text-sm sm:text-base"
                                        value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} />
                                    <textarea required rows="4" placeholder="Full details about the role..."
                                        className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-4 sm:px-6 py-4 sm:py-6 rounded-xl outline-none text-[#252733] transition-all placeholder:text-gray-300 resize-none font-medium text-base sm:text-lg leading-relaxed"
                                        value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                                </div>
                                <button type="submit" className="w-full bg-primary border-none hover:bg-primary-hover text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-lg sm:text-[20px] transition-all shadow-xl active:scale-[0.98] shadow-indigo-100/50 flex items-center justify-center gap-3">
                                    <CheckCircle2 size={20} className="sm:w-6 sm:h-6" />
                                    {editingJob ? 'Save Changes' : 'Post Job Listing'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Admin;
