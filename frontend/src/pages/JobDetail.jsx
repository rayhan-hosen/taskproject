import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import {
    Briefcase, MapPin, DollarSign, Clock, CheckCircle2,
    ArrowLeft, Send, Link as LinkIcon, FileText, User, Mail
} from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const JobDetail = () => {
    const { id } = useParams();
    const { jobs } = useJobs();
    const [showApplyForm, setShowApplyForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resume: '',
        coverNote: ''
    });

    const job = useMemo(() => jobs.find(j => j.id === id), [jobs, id]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Application submitted successfully! GOOD LUCK!');
        setShowApplyForm(false);
        setFormData({ name: '', email: '', resume: '', coverNote: '' });
    };

    return (
        <div className="bg-[#f8f8fd] min-h-screen pb-32">
            {/* Header / Breadcrumb */}
            <div className="bg-white border-b border-gray-100 py-6 mb-12">
                <div className="container">
                    <Link to="/jobs" className="inline-flex items-center gap-2.5 text-[#7c8087] hover:text-primary font-black transition-colors mb-4 group">
                        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                        Back to jobs
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mt-4">
                        <div className="flex items-center gap-6">
                            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${job.brandColor} shrink-0 shadow-lg text-white font-black text-3xl overflow-hidden`}>
                                {job.brandName.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-[32px] lg:text-[40px] font-black tracking-tight text-[#252733] leading-none mb-3">
                                    {job.title}
                                </h1>
                                <p className="text-[#a0a3a8] text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                                    {job.brandName} <span className="opacity-30">•</span> {job.location} <span className="opacity-30">•</span> {job.type}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowApplyForm(true)}
                            className="bg-primary hover:bg-primary-hover text-white px-12 py-5 rounded-lg font-black text-[19px] transition-all shadow-xl active:scale-95 shadow-indigo-100/50"
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl p-10 lg:p-12 mb-12 border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)]">
                            <div className="prose prose-lg max-w-none text-[#5e6282] font-medium leading-relaxed">
                                <h3 className="text-2xl font-black text-[#252733] mb-6">Description</h3>
                                <p className="mb-10 text-lg leading-loose">{job.description}</p>

                                <h3 className="text-2xl font-black text-[#252733] mb-6">Requirements</h3>
                                <ul className="space-y-4 mb-10 list-none p-0">
                                    {(job.requirements || ['Minimum 3 years in a similar role', 'Exceptional problem-solving skills', 'Team-oriented mindset']).map((req, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 size={22} className="text-[#56CDAD] shrink-0 mt-1" />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>

                                <h3 className="text-2xl font-black text-[#252733] mb-6">Responsibilities</h3>
                                <p className="mb-10 text-lg leading-loose">
                                    You will lead the design effort for key user product features, identifying the user problem, exploring potential solutions and designing the best user experience for our users.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)] sticky top-[120px]">
                            <h3 className="text-xl font-black text-[#252733] mb-8">Job Overview</h3>
                            <div className="space-y-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-primary">
                                        <DollarSign size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[#a0a3a8] text-xs font-black uppercase tracking-widest mb-1 opacity-70">Salary</p>
                                        <p className="text-[#252733] font-black text-lg">{job.salary || '$100k - $150k'}</p>
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
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[#a0a3a8] text-xs font-black uppercase tracking-widest mb-1 opacity-70">Job Created</p>
                                        <p className="text-[#252733] font-black text-lg">2 days ago</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowApplyForm(true)}
                                className="w-full bg-primary hover:bg-primary-hover text-white py-5 rounded-lg font-black text-[19px] transition-all shadow-xl active:scale-95 shadow-indigo-100/50 mt-12"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Apply Modal */}
            {showApplyForm && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-[#252733]/80 backdrop-blur-sm"
                        onClick={() => setShowApplyForm(false)}
                    ></motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-3xl w-full max-w-[600px] relative z-[210] overflow-hidden shadow-2xl"
                    >
                        <div className="bg-[#4640de] p-8 lg:p-10 text-white relative">
                            <h2 className="text-3xl lg:text-4xl font-black mb-3">Apply Now</h2>
                            <p className="opacity-80 font-medium">Position: <span className="underline">{job.title}</span> at {job.brandName}</p>
                            <button
                                onClick={() => setShowApplyForm(false)}
                                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={32} className="rotate-90 md:rotate-0" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-8">
                            <div className="space-y-6">
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                        <User size={20} />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-16 py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <input
                                        required
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-16 py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                        <LinkIcon size={20} />
                                    </div>
                                    <input
                                        required
                                        type="url"
                                        placeholder="Resume URL (G-Drive, Dropbox, LinkedIn)"
                                        className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-16 py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300"
                                        value={formData.resume}
                                        onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                                    />
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-6 top-6 text-gray-400 group-focus-within:text-primary transition-colors">
                                        <FileText size={20} />
                                    </div>
                                    <textarea
                                        required
                                        rows="4"
                                        placeholder="Cover Note / Intro"
                                        className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-16 py-6 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300 resize-none"
                                        value={formData.coverNote}
                                        onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white py-5 rounded-xl font-black text-[20px] transition-all shadow-xl active:scale-[0.98] shadow-indigo-100/50 flex items-center justify-center gap-3">
                                <Send size={24} />
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
