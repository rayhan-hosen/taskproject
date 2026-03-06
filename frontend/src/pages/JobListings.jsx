import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Grid, List as ListIcon, Filter, Briefcase, DollarSign, Clock } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const JobListings = () => {
    const { jobs } = useJobs();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSearch = queryParams.get('search') || '';

    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [locationFilter, setLocationFilter] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // grid or list

    useEffect(() => {
        setSearchTerm(queryParams.get('search') || '');
    }, [location.search]);

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.brandName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = job.location.toLowerCase().includes(locationFilter.toLowerCase());
            return matchesSearch && matchesLocation;
        });
    }, [jobs, searchTerm, locationFilter]);

    return (
        <div className="bg-[#f8f8fd] min-h-screen py-16">
            <div className="container">
                {/* Search & Header */}
                <div className="mb-12">
                    <h1 className="text-4xl lg:text-5xl font-black text-[#252733] mb-8 tracking-tighter">
                        Find your <span className="text-[#4640de]">dream job</span>
                    </h1>

                    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                        <div className="flex-grow flex items-center gap-4 px-4 py-3 bg-gray-50/50 rounded-lg border border-transparent focus-within:border-primary/20 transition-all">
                            <Search size={22} className="text-[#252733] opacity-40" />
                            <input
                                type="text"
                                placeholder="Search by job title, company..."
                                className="w-full bg-transparent outline-none font-bold text-[#252733] placeholder:text-gray-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex-grow flex items-center gap-4 px-4 py-3 bg-gray-50/50 rounded-lg border border-transparent focus-within:border-primary/20 transition-all">
                            <MapPin size={22} className="text-[#252733] opacity-40" />
                            <input
                                type="text"
                                placeholder="Filter by location..."
                                className="w-full bg-transparent outline-none font-bold text-[#252733] placeholder:text-gray-300"
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg shrink-0 h-[56px]">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <Grid size={24} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <ListIcon size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Count & Sort */}
                <div className="flex justify-between items-center mb-8">
                    <p className="text-[#7c8087] font-bold">
                        Showing <span className="text-[#252733]">{filteredJobs.length}</span> results
                    </p>
                </div>

                {/* Grid Layout */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {filteredJobs.map((job) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={job.id}
                                    className="bg-white border border-gray-100 rounded-xl p-8 transition-all hover:shadow-2xl hover:-translate-y-2 group cursor-pointer flex flex-col h-full relative"
                                >
                                    <div className="flex justify-between items-start mb-8">
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${job.brandColor.includes('bg-white') ? 'bg-gray-50 border border-gray-100' : job.brandColor} transition-all duration-300 group-hover:scale-110 shadow-sm overflow-hidden`}>
                                            <span className={`font-black text-xl ${job.brandColor.includes('bg-white') || job.brandColor.includes('bg-black') ? 'text-primary' : 'text-white'}`}>
                                                {job.brandName.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="px-3 py-1.5 rounded-sm border border-[#4640de] text-[#4640de] text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-primary bg-opacity-5">
                                            {job.type}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-black mb-1.5 text-[#252733] group-hover:text-primary transition-colors leading-tight">{job.title}</h3>
                                    <p className="text-[#a0a3a8] text-[13px] font-bold uppercase tracking-wider mb-4 flex items-center">
                                        {job.brandName} <span className="mx-1.5">•</span> {job.location}
                                    </p>

                                    <p className="text-[#7c8087] text-[15px] leading-relaxed mb-8 flex-grow line-clamp-2">
                                        {job.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {job.tags?.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gray-50 text-gray-500 border border-gray-100">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <Link to={`/jobs/${job.id}`} className="block w-full text-center bg-primary hover:bg-primary-hover text-white py-4 rounded-lg font-black text-[15px] transition-all shadow-lg active:scale-95 shadow-indigo-100/50">
                                        View Details
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    /* List Layout */
                    <div className="flex flex-col gap-4">
                        <AnimatePresence>
                            {filteredJobs.map((job) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    key={job.id}
                                    className="bg-white p-6 lg:p-8 rounded-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl hover:shadow-indigo-900/5 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-8 flex-grow">
                                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${job.brandColor.includes('bg-white') ? 'bg-gray-50' : job.brandColor} shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                                            <span className={`font-black text-2xl ${job.brandColor.includes('bg-white') || job.brandColor.includes('bg-black') ? 'text-primary' : 'text-white'}`}>
                                                {job.brandName.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-[#252733] group-hover:text-primary transition-colors leading-tight mb-2">{job.title}</h3>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                                <span className="text-[#7c8087] font-bold text-[17px] flex items-center gap-1.5">
                                                    <Briefcase size={18} /> {job.brandName}
                                                </span>
                                                <span className="text-[#7c8087] font-bold text-[17px] flex items-center gap-1.5">
                                                    <MapPin size={18} /> {job.location}
                                                </span>
                                                <span className="text-emerald-500 font-bold text-[17px] flex items-center gap-1.5">
                                                    <DollarSign size={18} /> {job.salary || '$100k - $150k'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 shrink-0">
                                        <div className="hidden lg:flex flex-wrap gap-2">
                                            {job.tags?.map((tag, i) => (
                                                <span key={i} className="px-4 py-1.5 rounded-full text-[13px] font-black uppercase tracking-wider bg-primary/5 text-primary border border-primary/10">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <Link to={`/jobs/${job.id}`} className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-black text-[17px] transition-all shadow-lg active:scale-95 whitespace-nowrap">
                                            Apply Now
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {filteredJobs.length === 0 && (
                    <div className="text-center py-32">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-8 text-gray-400">
                            <Search size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-[#252733] mb-4">No jobs found</h2>
                        <p className="text-[#7c8087] font-medium text-xl">Try searching for something else or clearing filters.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setLocationFilter(''); }}
                            className="mt-8 text-primary font-black hover:underline underline-offset-8"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobListings;
