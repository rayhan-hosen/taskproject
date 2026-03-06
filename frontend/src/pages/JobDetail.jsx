import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import {
    Briefcase, MapPin, DollarSign, Clock, CheckCircle2,
    ArrowLeft, Send, Link as LinkIcon, FileText, User, Mail, Loader2, XCircle,
    Facebook, Instagram, Dribbble, Linkedin, Twitter
} from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { JobDetailSkeleton } from '../components/common/Skeleton/Skeleton';
import { getCompanyColor } from '../utils/colorUtils';

const JobDetail = () => {
    const { id } = useParams();
    const { getJobById, applyForJob } = useJobs();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showApplyForm, setShowApplyForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resume: '',
        coverNote: ''
    });

    useEffect(() => {
        const fetchJob = async () => {
            const data = await getJobById(id);
            setJob(data);
            setLoading(false);
        };
        fetchJob();
    }, [id, getJobById]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await applyForJob({
            jobId: id,
            name: formData.name,
            email: formData.email,
            resumeLink: formData.resume,
            coverNote: formData.coverNote
        });

        if (success) {
            toast.success('Application submitted successfully! GOOD LUCK!');
            setShowApplyForm(false);
            setFormData({ name: '', email: '', resume: '', coverNote: '' });
        } else {
            toast.error('Failed to submit application. Please check your inputs.');
        }
    };

    if (loading) {
        return <JobDetailSkeleton />;
    }

    if (!job) {
        return (
            <div className="flex flex-col items-center justify-center py-32 bg-[#f8f8fd] text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8 text-gray-400">
                    <Briefcase size={48} />
                </div>
                <h1 className="text-4xl font-black text-[#252733] mb-4 tracking-tighter">Job not found</h1>
                <Link to="/jobs" className="text-primary font-black hover:underline underline-offset-8">
                    Return to job listings
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#f8f8fd] min-h-screen pb-16 pt-10 lg:pt-14">
            {/* Header / Breadcrumb */}
            <div className="bg-white border-b border-gray-100 py-5 lg:py-8 mb-4 lg:mb-6">
                <div className="container">
                    <Link to="/jobs" className="inline-flex items-center gap-2.5 text-[#7c8087] hover:text-primary font-black transition-colors mb-4 lg:mb-6 group">
                        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                        Back to jobs
                    </Link>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div
                                style={{ backgroundColor: getCompanyColor(job.company, job.brandColor) }}
                                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center shrink-0 shadow-lg text-white font-black text-2xl lg:text-3xl overflow-hidden"
                            >
                                {job.company?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-[28px] sm:text-[32px] lg:text-[44px] font-black tracking-tight text-[#252733] leading-tight mb-2 lg:mb-3">
                                    {job.title}
                                </h1>
                                <p className="text-[#a0a3a8] text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider flex flex-wrap items-center gap-x-3 gap-y-1">
                                    {job.company} <span className="hidden sm:inline opacity-30">•</span> {job.location} <span className="hidden sm:inline opacity-30">•</span> {job.type}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowApplyForm(true)}
                            className="bg-primary hover:bg-primary-hover text-white px-10 lg:px-12 py-4 lg:py-5 rounded-lg font-black text-base lg:text-[19px] transition-all shadow-xl active:scale-95 shadow-indigo-100/50 w-full lg:w-auto"
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl p-5 lg:p-8 mb-6 border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)]">
                            <div className="prose prose-lg max-w-none text-[#5e6282] font-medium leading-relaxed">
                                <h3 className="text-xl sm:text-2xl font-black text-[#252733] mb-4 sm:mb-6">Description</h3>
                                <p className="mb-8 text-base sm:text-lg leading-relaxed sm:leading-loose">{job.description}</p>

                                <h3 className="text-2xl font-black text-[#252733] mb-6">Requirements</h3>
                                <ul className="space-y-4 mb-10 list-none p-0">
                                    {['Minimum 3 years in a similar role', 'Exceptional problem-solving skills', 'Team-oriented mindset', 'Proficiency in relevant technologies'].map((req, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 size={22} className="text-[#56CDAD] shrink-0 mt-1" />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-2xl p-5 lg:p-7 border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)] lg:sticky lg:top-[100px]">
                            <h3 className="text-xl font-black text-[#252733] mb-6">Job Overview</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-primary">
                                        <DollarSign size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[#a0a3a8] text-xs font-black uppercase tracking-widest mb-1 opacity-70">Salary</p>
                                        <p className="text-[#252733] font-black text-lg">{job.salary}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#56CDAD]">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[#a0a3a8] text-xs font-black uppercase tracking-widest mb-1 opacity-70">Location</p>
                                        <p className="text-[#252733] font-black text-lg">{job.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#FFB836]">
                                        <Briefcase size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[#a0a3a8] text-xs font-black uppercase tracking-widest mb-1 opacity-70">Job Type</p>
                                        <p className="text-[#252733] font-black text-lg">{job.type}</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowApplyForm(true)}
                                className="w-full bg-primary hover:bg-primary-hover text-white py-5 rounded-lg font-black text-[19px] transition-all shadow-xl active:scale-95 shadow-indigo-100/50 mt-12 mb-8"
                            >
                                Apply Now
                            </button>

                            <div className="pt-8 border-t border-gray-100">
                                <p className="text-[#a0a3a8] font-black text-xs uppercase tracking-widest mb-4 opacity-70 text-center">Share this job</p>
                                <div className="flex items-center justify-center gap-3">
                                    {[Facebook, Instagram, Dribbble, Linkedin, Twitter].map((Icon, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="w-10 h-10 bg-gray-50 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 group"
                                        >
                                            <Icon size={18} className="text-[#a0a3a8] group-hover:text-white transition-colors" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Apply Modal */}
            {showApplyForm && (
                <div className="fixed inset-0 z-[200] flex items-start sm:items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto bg-[#252733]/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0"
                        onClick={() => setShowApplyForm(false)}
                    ></motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-[24px] sm:rounded-3xl w-full max-w-[550px] relative z-[210] overflow-hidden shadow-2xl my-auto"
                    >
                        {/* Modal Header */}
                        <div className="bg-[#4640de] p-5 sm:p-8 lg:p-10 text-white relative">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 sm:mb-2">Apply Now</h2>
                            <p className="opacity-80 font-medium text-xs sm:text-sm lg:text-base leading-relaxed">
                                <span className="hidden sm:inline">Position:</span> <span className="underline decoration-2 underline-offset-4">{job.title}</span> <span className="sm:inline hidden">at {job.company}</span>
                            </p>
                            <button
                                onClick={() => setShowApplyForm(false)}
                                className="absolute top-6 right-6 sm:top-8 sm:right-8 text-white/50 hover:text-white transition-colors p-1"
                            >
                                <XCircle size={28} className="sm:w-8 sm:h-8" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="p-5 sm:p-8 lg:p-10 space-y-4 sm:space-y-6">
                            <div className="space-y-3 sm:space-y-5">
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                        <User size={18} className="sm:w-5 sm:h-5" />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white pl-12 sm:pl-14 pr-6 py-3.5 sm:py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300 text-sm sm:text-base"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                        <Mail size={18} className="sm:w-5 sm:h-5" />
                                    </div>
                                    <input
                                        required
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white pl-12 sm:pl-14 pr-6 py-3.5 sm:py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300 text-sm sm:text-base"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                        <LinkIcon size={18} className="sm:w-5 sm:h-5" />
                                    </div>
                                    <input
                                        required
                                        type="url"
                                        placeholder="Resume URL (Drive, Dropbox, etc.)"
                                        className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white pl-12 sm:pl-14 pr-6 py-3.5 sm:py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300 text-sm sm:text-base"
                                        value={formData.resume}
                                        onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                                    />
                                </div>

                                <div className="relative group">
                                    <div className="absolute left-5 top-6 text-gray-400 group-focus-within:text-primary transition-colors">
                                        <FileText size={18} className="sm:w-5 sm:h-5" />
                                    </div>
                                    <textarea
                                        required
                                        rows="3"
                                        placeholder="Cover Note / Intro"
                                        className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white pl-12 sm:pl-14 pr-6 py-4 rounded-xl outline-none font-medium text-[#252733] transition-all placeholder:text-gray-300 resize-none text-sm sm:text-base leading-relaxed"
                                        value={formData.coverNote}
                                        onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary-hover text-white py-4 sm:py-5 rounded-xl font-black text-lg sm:text-[20px] transition-all shadow-xl active:scale-[0.98] shadow-indigo-100/50 flex items-center justify-center gap-3 mt-2"
                            >
                                <Send size={20} className="sm:w-6 sm:h-6" />
                                Submit Application
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default JobDetail;
