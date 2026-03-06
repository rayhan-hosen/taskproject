import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, MapPin, Grid, List as ListIcon, Filter, Briefcase, DollarSign, Clock, Loader2 } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { JobListingCardSkeleton, JobListingRowSkeleton } from '../components/common/Skeleton/Skeleton';
import { getCompanyColor } from '../utils/colorUtils';

const JobListings = () => {
    const { jobs, loading, hasMore, fetchJobs, updateFilters, filters } = useJobs();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSearch = queryParams.get('search') || '';
    const initialLocation = queryParams.get('location') || '';

    const [viewMode, setViewMode] = useState('grid');
    const observer = useRef();

    useEffect(() => {
        const searchParam = queryParams.get('search') || '';
        const locationParam = queryParams.get('location') || '';

        if (searchParam || locationParam) {
            // Update filters and trigger a fresh search
            updateFilters({ search: searchParam, location: locationParam });
        } else {
            fetchJobs(true);
        }
    }, [location.search]);

    const lastJobElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchJobs();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, fetchJobs]);

    const handleSearchChange = (e) => {
        updateFilters({ search: e.target.value });
    };

    const handleLocationChange = (e) => {
        updateFilters({ location: e.target.value });
    };

    return (
        <div className="bg-[#f8f8fd] min-h-screen py-16">
            <div className="container">
                {/* Search & Header */}
                <div className="mb-12">
                    <h1 className="text-4xl lg:text-5xl font-black text-[#252733] mb-8 tracking-tighter">
                        Find your <span className="text-[#4640de]">dream job</span>
                    </h1>

                    <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-gray-100 space-y-4">
                        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                            <div className="flex-[2] flex items-center gap-4 px-4 py-3 bg-gray-50/50 rounded-xl border border-transparent focus-within:border-primary/20 transition-all">
                                <Search size={22} className="text-[#252733] opacity-40" />
                                <input
                                    type="text"
                                    placeholder="Search by job title, company..."
                                    className="w-full bg-transparent outline-none font-bold text-[#252733] placeholder:text-gray-300"
                                    value={filters.search}
                                    onChange={handleSearchChange}
                                />
                            </div>

                            <div className="flex-1 flex items-center gap-4 px-4 py-3 bg-gray-50/50 rounded-xl border border-transparent focus-within:border-primary/20 transition-all">
                                <MapPin size={22} className="text-[#252733] opacity-40" />
                                <input
                                    type="text"
                                    placeholder="Filter by location..."
                                    className="w-full bg-transparent outline-none font-bold text-[#252733] placeholder:text-gray-300"
                                    value={filters.location}
                                    onChange={handleLocationChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 border-t border-gray-50 pt-4">
                            <div className="flex-1 min-w-[150px] flex items-center gap-3 px-4 py-2.5 bg-gray-50/50 rounded-xl border border-transparent focus-within:border-primary/20 transition-all">
                                <Briefcase size={18} className="text-[#252733] opacity-40" />
                                <select
                                    className="w-full bg-transparent outline-none font-black text-[#252733] text-sm appearance-none"
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

                            <div className="flex-1 min-w-[150px] flex items-center gap-3 px-4 py-2.5 bg-gray-50/50 rounded-xl border border-transparent focus-within:border-primary/20 transition-all">
                                <DollarSign size={18} className="text-[#252733] opacity-40" />
                                <input
                                    type="text"
                                    placeholder="Salary e.g. 80k"
                                    className="w-full bg-transparent outline-none font-black text-[#252733] text-sm placeholder:text-gray-300"
                                    value={filters.salary}
                                    onChange={(e) => updateFilters({ salary: e.target.value })}
                                />
                            </div>

                            <div className="hidden lg:block w-px h-6 bg-gray-100 mx-2"></div>

                            <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg shrink-0">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <Grid size={22} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <ListIcon size={22} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid Layout */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {loading && jobs.length === 0
                            ? Array.from({ length: 8 }).map((_, i) => <JobListingCardSkeleton key={i} />)
                            : jobs.map((job, index) => {
                                if (jobs.length === index + 1) {
                                    return (
                                        <div ref={lastJobElementRef} key={job.id}>
                                            <JobCard job={job} />
                                        </div>
                                    )
                                } else {
                                    return <JobCard key={job.id} job={job} />
                                }
                            })
                        }
                        {/* Append skeletons while loading more */}
                        {loading && jobs.length > 0 && Array.from({ length: 4 }).map((_, i) => <JobListingCardSkeleton key={`skel-${i}`} />)}
                    </div>
                ) : (
                    /* List Layout */
                    <div className="flex flex-col gap-4">
                        {loading && jobs.length === 0
                            ? Array.from({ length: 6 }).map((_, i) => <JobListingRowSkeleton key={i} />)
                            : jobs.map((job, index) => {
                                if (jobs.length === index + 1) {
                                    return (
                                        <div ref={lastJobElementRef} key={job.id}>
                                            <JobRow job={job} />
                                        </div>
                                    )
                                } else {
                                    return <JobRow key={job.id} job={job} />
                                }
                            })
                        }
                        {/* Append skeletons while loading more */}
                        {loading && jobs.length > 0 && Array.from({ length: 3 }).map((_, i) => <JobListingRowSkeleton key={`skel-${i}`} />)}
                    </div>
                )}

                {!loading && jobs.length === 0 && (
                    <div className="text-center py-32">
                        <h2 className="text-3xl font-black text-[#252733] mb-4">No jobs found</h2>
                        <button
                            onClick={() => updateFilters({ search: '', location: '' })}
                            className="mt-8 text-primary font-black hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const JobCard = ({ job }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-100 rounded-xl p-8 transition-all hover:shadow-2xl hover:-translate-y-2 group cursor-pointer flex flex-col h-full relative"
    >
        <div className="flex justify-between items-start mb-8">
            <div
                style={{ backgroundColor: getCompanyColor(job.company, job.brandColor) }}
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm overflow-hidden text-white font-black text-xl"
            >
                {job.company?.charAt(0).toUpperCase()}
            </div>
            <span className="px-3 py-1.5 rounded-sm border border-[#4640de] text-[#4640de] text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-primary bg-opacity-5">
                {job.type}
            </span>
        </div>
        <h3 className="text-xl font-black mb-1.5 text-[#252733] group-hover:text-primary transition-colors leading-tight">{job.title}</h3>
        <p className="text-[#a0a3a8] text-[13px] font-bold uppercase tracking-wider mb-4 flex items-center">
            {job.company} <span className="mx-1.5">•</span> {job.location}
        </p>
        <p className="text-[#7c8087] text-[15px] leading-relaxed mb-8 flex-grow line-clamp-2">
            {job.description}
        </p>
        <Link to={`/jobs/${job.id}`} className="block w-full text-center bg-primary hover:bg-primary-hover text-white py-4 rounded-lg font-black text-[15px] transition-all shadow-lg active:scale-95">
            View Details
        </Link>
    </motion.div>
);

const JobRow = ({ job }) => (
    <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-6 lg:p-8 rounded-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl transition-all group"
    >
        <div className="flex items-center gap-8 flex-grow text-left">
            <div
                style={{ backgroundColor: getCompanyColor(job.company, job.brandColor) }}
                className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 shadow-sm text-white font-black text-2xl"
            >
                {job.company?.charAt(0).toUpperCase()}
            </div>
            <div>
                <h3 className="text-2xl font-black text-[#252733] group-hover:text-primary transition-colors leading-tight mb-2">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="text-[#7c8087] font-bold text-[17px] flex items-center gap-1.5">
                        <Briefcase size={18} /> {job.company}
                    </span>
                    <span className="text-[#7c8087] font-bold text-[17px] flex items-center gap-1.5">
                        <MapPin size={18} /> {job.location}
                    </span>
                    <span className="text-emerald-500 font-bold text-[17px] flex items-center gap-1.5">
                        <DollarSign size={18} /> {job.salary}
                    </span>
                </div>
            </div>
        </div>
        <Link to={`/jobs/${job.id}`} className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-black text-[17px] transition-all whitespace-nowrap">
            View Details
        </Link>
    </motion.div>
);

export default JobListings;
