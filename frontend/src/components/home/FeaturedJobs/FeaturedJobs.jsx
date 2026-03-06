import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../../context/JobContext';
import { FeaturedJobCardSkeleton } from '../../common/Skeleton/Skeleton';
import { getCompanyColor } from '../../../utils/colorUtils';

const tagColors = {
    Marketing: 'bg-orange-50 text-orange-500 border border-orange-100',
    Design: 'bg-emerald-50 text-emerald-500 border border-emerald-100',
    Business: 'bg-indigo-50 text-indigo-500 border border-indigo-100',
    Engineering: 'bg-blue-50 text-blue-500 border border-blue-100',
};

const getTagClass = (tag) => tagColors[tag] || 'bg-gray-50 text-gray-500 border border-gray-100';

const JobCard = ({ id, company, location, title, description, tags, type, brandColor }) => (
    <Link to={`/jobs/${id}`}
        className="bg-white border border-gray-100 rounded-xl p-7 lg:p-8 transition-all hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:border-transparent group cursor-pointer relative flex flex-col h-full transform hover:-translate-y-1 min-w-[280px] sm:min-w-0 snap-start shrink-0 w-[85vw] sm:w-auto"
    >
        <div className="flex justify-between items-start mb-6 lg:mb-8">
            <div
                style={{ backgroundColor: getCompanyColor(company, brandColor) }}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm overflow-hidden text-white font-black text-lg lg:text-xl"
            >
                {company?.charAt(0)}
            </div>
            <span className="px-3 py-1.5 rounded-sm border border-primary text-primary text-[10px] lg:text-[11px] font-black uppercase tracking-widest whitespace-nowrap bg-primary bg-opacity-5">
                {type || 'Full Time'}
            </span>
        </div>

        <h3 className="text-[18px] lg:text-[20px] font-black mb-2 text-[#252733] group-hover:text-primary transition-colors leading-tight">{title}</h3>

        <p className="text-[#a0a3a8] text-[13px] lg:text-[14px] font-bold uppercase tracking-wider mb-3 lg:mb-4 flex items-center">
            {company} <span className="mx-2 w-1 h-1 rounded-full bg-gray-300"></span> {location}
        </p>

        <p className="text-[#7c8087] text-[14px] lg:text-[15px] leading-relaxed mb-6 lg:mb-8 line-clamp-2 flex-grow">
            {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
            {(Array.isArray(tags) ? tags : []).map((tag, i) => (
                <span key={i} className={`px-3 lg:px-4 py-1 lg:py-1.5 rounded-full text-[10px] lg:text-[11px] font-black uppercase tracking-wider ${getTagClass(tag)}`}>
                    {tag}
                </span>
            ))}
        </div>
    </Link>
);

const FeaturedJobs = () => {
    const { jobs, loading } = useJobs();
    const featuredJobs = jobs.slice(0, 8);
    const isInitialLoad = loading && jobs.length === 0;

    return (
        <section className="py-14 lg:py-24 bg-white overflow-hidden">
            <div className="container">
                <div className="flex justify-between items-end mb-10 lg:mb-16">
                    <h2 className="text-[32px] lg:text-[54px] font-black text-[#252733] tracking-tighter">
                        Featured <span className="text-primary">jobs</span>
                    </h2>
                    <Link to="/jobs" className="hidden sm:flex items-center gap-2.5 text-primary font-black transition-all hover:gap-3.5 group">
                        <span className="text-[17px] border-b-2 border-transparent group-hover:border-primary transition-all">Show all jobs</span>
                        <ArrowRight size={22} strokeWidth={2.5} />
                    </Link>
                </div>

                {/* Mobile: horizontal scroll | Desktop: grid */}
                {isInitialLoad ? (
                    <>
                        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:hidden -mx-4 px-4">
                            {Array.from({ length: 4 }).map((_, i) => <FeaturedJobCardSkeleton key={i} />)}
                        </div>
                        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {Array.from({ length: 8 }).map((_, i) => <FeaturedJobCardSkeleton key={i} />)}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:hidden -mx-4 px-4">
                            {featuredJobs.map((job) => (
                                <JobCard key={job.id} {...job} />
                            ))}
                        </div>
                        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {featuredJobs.map((job) => (
                                <JobCard key={job.id} {...job} />
                            ))}
                        </div>
                    </>
                )}

                {/* Mobile: Show all link below cards */}
                <Link to="/jobs" className="flex sm:hidden items-center gap-2.5 text-primary font-black mt-8 group">
                    <span className="text-[16px]">Show all jobs</span>
                    <ArrowRight size={20} strokeWidth={2.5} />
                </Link>
            </div>
        </section>
    );
};

export default FeaturedJobs;
