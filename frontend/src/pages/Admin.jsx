import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { Plus, Trash2, Edit3, Search, LayoutGrid, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const Admin = () => {
    const { jobs, addJob, deleteJob } = useJobs();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Form state
    const [newJob, setNewJob] = useState({
        title: '',
        brandName: '',
        location: '',
        category: '',
        type: 'Full Time',
        salary: '',
        description: '',
        brandColor: 'bg-primary'
    });

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = (e) => {
        e.preventDefault();
        addJob({
            ...newJob,
            tags: [newJob.category || 'General'],
            logo: 'Briefcase'
        });
        toast.success(`Job "${newJob.title}" added successfully!`);
        setIsAddOpen(false);
        setNewJob({
            title: '', brandName: '', location: '', category: '',
            type: 'Full Time', salary: '', description: '', brandColor: 'bg-primary'
        });
    };

    const handleDelete = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            deleteJob(id);
            toast.error(`Job "${title}" deleted.`);
        }
    };

    return (
        <div className="bg-[#f8f8fd] min-h-screen pb-32">
            <div className="bg-white border-b border-gray-100 py-12 mb-12">
                <div className="container">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-[#252733] mb-3">Admin Dashboard</h1>
                            <p className="text-[#a0a3a8] text-lg font-bold uppercase tracking-wider">Manage all job listings from one place</p>
                        </div>
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="bg-primary hover:bg-primary-hover text-white px-10 py-5 rounded-lg font-black text-[18px] transition-all shadow-xl active:scale-95 shadow-indigo-100/50 flex items-center justify-center gap-3"
                        >
                            <Plus size={24} strokeWidth={3} />
                            Add New Job
                        </button>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Search Bar */}
                <div className="mb-10 max-w-md">
                    <div className="relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                            <Search size={22} />
                        </div>
                        <input
                            type="text"
                            placeholder="Find a listing to manage..."
                            className="w-full bg-white border border-transparent focus:border-primary/20 px-16 py-5 rounded-xl outline-none font-bold text-[#252733] transition-all shadow-sm placeholder:text-gray-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Job List Table */}
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-6 text-sm font-black text-[#a0a3a8] uppercase tracking-widest">Company & Job</th>
                                    <th className="px-8 py-6 text-sm font-black text-[#a0a3a8] uppercase tracking-widest hidden md:table-cell">Details</th>
                                    <th className="px-8 py-6 text-sm font-black text-[#a0a3a8] uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <AnimatePresence>
                                    {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                                        <motion.tr
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            key={job.id}
                                            className="group hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="px-8 py-8">
                                                <div className="flex items-center gap-5">
                                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${job.brandColor} shrink-0 shadow-sm text-white font-black text-xl overflow-hidden`}>
                                                        {job.brandName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-[19px] text-[#252733] mb-1 group-hover:text-primary transition-colors">{job.title}</p>
                                                        <p className="text-[#a0a3a8] font-bold text-sm uppercase tracking-wider">{job.brandName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-8 hidden md:table-cell">
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    <span className="px-3 py-1 bg-indigo-50 text-primary rounded-full text-xs font-black uppercase tracking-wider">{job.category || 'General'}</span>
                                                    <span className="px-3 py-1 bg-emerald-50 text-[#56CDAD] rounded-full text-xs font-black uppercase tracking-wider">{job.type}</span>
                                                </div>
                                                <p className="text-[#7c8087] font-bold text-sm">{job.location}</p>
                                            </td>
                                            <td className="px-8 py-8">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleDelete(job.id, job.title)}
                                                        className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95"
                                                        title="Delete Job"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="3" className="px-8 py-20 text-center">
                                                <p className="text-[#7c8087] font-black italic">No listings match your search.</p>
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Job Modal */}
            <AnimatePresence>
                {isAddOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-[#252733]/80 backdrop-blur-sm"
                            onClick={() => setIsAddOpen(false)}
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl w-full max-w-[800px] relative z-[210] overflow-hidden shadow-2xl"
                        >
                            <div className="bg-[#4640de] p-8 lg:p-10 text-white flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl lg:text-4xl font-black mb-1">Add Job Listing</h2>
                                    <p className="opacity-80 font-medium tracking-wide uppercase text-sm">Fill in the details to post a new opening</p>
                                </div>
                                <button onClick={() => setIsAddOpen(false)} className="text-white/50 hover:text-white transition-colors">
                                    <XCircle size={40} />
                                </button>
                            </div>

                            <form onSubmit={handleAdd} className="p-8 lg:p-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                    <div className="space-y-3">
                                        <label className="text-[#252733] font-black tracking-tight text-sm uppercase">Job Title</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. Senior Frontend Engineer"
                                            className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-6 py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300"
                                            value={newJob.title}
                                            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[#252733] font-black tracking-tight text-sm uppercase">Company Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. TechFlow"
                                            className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-6 py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300"
                                            value={newJob.brandName}
                                            onChange={(e) => setNewJob({ ...newJob, brandName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[#252733] font-black tracking-tight text-sm uppercase">Location</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. San Francisco, US"
                                            className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-6 py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300"
                                            value={newJob.location}
                                            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[#252733] font-black tracking-tight text-sm uppercase">Job Category</label>
                                        <select
                                            className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-6 py-4 rounded-xl outline-none font-bold text-[#252733] transition-all"
                                            value={newJob.category}
                                            onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Design">Design</option>
                                            <option value="Engineering">Engineering</option>
                                            <option value="Business">Business</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-3 mb-10">
                                    <label className="text-[#252733] font-black tracking-tight text-sm uppercase">Salary Range & Description</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. $100k - $120k"
                                        className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-6 py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300 mb-4"
                                        value={newJob.salary}
                                        onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                                    />
                                    <textarea
                                        required
                                        rows="4"
                                        placeholder="Full details about the role..."
                                        className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-6 py-6 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300 resize-none font-medium text-lg leading-relaxed"
                                        value={newJob.description}
                                        onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                                    ></textarea>
                                </div>

                                <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white py-6 rounded-2xl font-black text-[22px] transition-all shadow-xl active:scale-[0.98] shadow-indigo-100/50 flex items-center justify-center gap-3">
                                    <CheckCircle2 size={24} />
                                    Post Job Listing
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
