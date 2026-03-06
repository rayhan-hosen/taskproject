import React from 'react';
import { ArrowRight, CreditCard, Box, PieChart, Eye, Ticket, Palette, Globe, Twitter, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../../context/JobContext';

const JobCard = ({ id, logo: LogoComponent, brandName, location, title, description, tags, type, brandColor }) => {
    return (
        <Link to={`/jobs/${id}`} className="bg-white border border-gray-100 rounded-xl p-8 transition-all hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:border-transparent group cursor-pointer relative flex flex-col h-full transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-8">
                {/* Brand Logo in stylized circle/square */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${brandColor} transition-all duration-300 group-hover:scale-110 shadow-sm overflow-hidden`}>
                    {typeof LogoComponent === 'string' ? (
                        <span className="text-white font-black text-xl">{brandName.charAt(0)}</span>
                    ) : (
                        <LogoComponent size={28} className={brandColor.includes('bg-white') ? 'text-primary' : 'text-white'} />
                    )}
                </div>
                <span className="px-3 py-1.5 rounded-sm border border-primary text-primary text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-primary bg-opacity-5">
                    {type || 'Full Time'}
                </span>
            </div>

            <h3 className="text-[20px] font-black mb-2 text-[#252733] group-hover:text-primary transition-colors leading-tight">{title}</h3>

            <p className="text-[#a0a3a8] text-[14px] font-bold uppercase tracking-wider mb-4 flex items-center">
                {brandName} <span className="mx-2 w-1 h-1 rounded-full bg-gray-300"></span> {location}
            </p>

            <p className="text-[#7c8087] text-[15px] leading-relaxed mb-8 line-clamp-2 flex-grow">
                {description}
            </p>

            <div className="flex flex-wrap gap-2.5 mt-auto">
                {tags.map((tag, i) => (
                    <span
                        key={i}
                        className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider ${tag === 'Marketing' ? 'bg-orange-50 text-orange-500 border border-orange-100' :
                            tag === 'Design' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' :
                                tag === 'Business' ? 'bg-indigo-50 text-indigo-500 border border-indigo-100' :
                                    tag === 'Technology' ? 'bg-blue-50 text-blue-500 border border-blue-100' :
                                        'bg-gray-50 text-gray-500 border border-gray-100'
                            }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </Link>
    );
};

const FeaturedJobs = () => {
    const { jobs } = useJobs();

    // Featured are first 8
    const featuredJobs = jobs.slice(0, 8);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-[48px] lg:text-[54px] font-black text-[#252733] tracking-tighter">
                        Featured <span className="text-primary">jobs</span>
                    </h2>
                    <Link to="/jobs" className="flex items-center gap-2.5 text-primary font-black transition-all hover:gap-3.5 group">
                        <span className="text-[17px] border-b-2 border-transparent group-hover:border-primary transition-all">Show all jobs</span>
                        <ArrowRight size={22} strokeWidth={2.5} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-2">
                    {featuredJobs.map((job) => (
                        <JobCard key={job.id} {...job} logo={Briefcase} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedJobs;
