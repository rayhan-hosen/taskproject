import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../../context/JobContext';
import { LatestJobRowSkeleton } from '../../common/Skeleton/Skeleton';
import { getCompanyColor } from '../../../utils/colorUtils';

const tagStyles = {
    'Full-Time': 'text-[#56CDAD] border-[#56CDAD]/30 bg-[#56CDAD]/5',
    'Full Time': 'text-[#56CDAD] border-[#56CDAD]/30 bg-[#56CDAD]/5',
    Marketing: 'text-[#FFB836] border-[#FFB836]/30 bg-[#FFB836]/5',
    Design: 'text-[#4640DE] border-[#4640DE]/30 bg-[#4640DE]/5',
};

const getTagStyle = (tag) => tagStyles[tag] || 'text-[#4640de] border-[#4640de]/20 bg-[#4640de]/5';

const LatestJobRow = ({ id, title, company, location, tags, brandColor }) => (
    <Link to={`/jobs/${id}`} className="bg-white p-5 lg:p-8 rounded-xl border border-gray-100 flex items-start gap-4 lg:gap-6 hover:shadow-xl hover:shadow-indigo-900/5 transition-all cursor-pointer group">
        {/* Logo */}
        <div
            style={{ backgroundColor: getCompanyColor(company, brandColor) }}
            className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm overflow-hidden text-white font-black text-xl lg:text-2xl"
        >
            {company?.charAt(0)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
            <h3 className="text-[17px] lg:text-xl font-bold text-[#252733] group-hover:text-[#4640de] transition-colors leading-tight mb-1 truncate">
                {title}
            </h3>
            <p className="text-[#7c8087] text-[14px] lg:text-[16px] font-medium mb-3 lg:mb-4 flex items-center">
                {company} <span className="mx-2 opacity-50">•</span> {location}
            </p>
            <div className="flex flex-wrap gap-2">
                {(Array.isArray(tags) ? tags : []).map((tag, i) => (
                    <span key={i} className={`px-3 lg:px-4 py-1 lg:py-1.5 rounded-full text-[11px] lg:text-[13px] font-bold border transition-all ${getTagStyle(tag)}`}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </Link>
);

const LatestJobs = () => {
    const { jobs, loading } = useJobs();
    const latestJobs = jobs.slice(0, 8);
    const isInitialLoad = loading && jobs.length === 0;

    return (
        <section className="py-14 lg:py-24 bg-[#f8f8fd]/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.2] z-0 hidden lg:block">
                <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1440 200L1000 640" stroke="#4640de" strokeWidth="1" />
                    <path d="M1440 400L1100 740" stroke="#4640de" strokeWidth="1" />
                </svg>
            </div>

            <div className="container relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 lg:mb-16">
                    <h2 className="text-[32px] lg:text-[54px] font-black text-[#252733] tracking-tighter">
                        Latest <span className="text-[#3ba1ff]">jobs open</span>
                    </h2>
                    <Link to="/jobs" className="hidden sm:flex items-center gap-2.5 text-[#4640de] font-black transition-all hover:gap-3.5 group">
                        <span className="text-[17px]">Show all jobs</span>
                        <ArrowRight size={22} strokeWidth={2.5} />
                    </Link>
                </div>

                {/* Mobile: single column | Desktop: 2-col grid */}
                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-6">
                    {isInitialLoad
                        ? Array.from({ length: 6 }).map((_, i) => <LatestJobRowSkeleton key={i} />)
                        : latestJobs.map((job) => <LatestJobRow key={job.id} {...job} />)
                    }
                </div>

                <Link to="/jobs" className="flex sm:hidden items-center gap-2.5 text-[#4640de] font-black mt-8 group">
                    <span className="text-[16px]">Show all jobs</span>
                    <ArrowRight size={20} strokeWidth={2.5} />
                </Link>
            </div>
        </section>
    );
};

export default LatestJobs;
