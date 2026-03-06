import React from 'react';
import { ArrowRight, Hexagon, Wind, Layers, Disc, Database, Cpu, Figma, Globe, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../../context/JobContext';

const LatestJobRow = ({ id, logo: LogoComponent, title, brandName, location, tags, brandColor }) => (
    <Link to={`/jobs/${id}`} className="bg-white p-6 lg:p-8 rounded-xl border border-gray-100 flex items-start gap-6 hover:shadow-xl hover:shadow-indigo-900/5 transition-all cursor-pointer group mb-2">
        {/* Logo Container */}
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${brandColor} shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm overflow-hidden`}>
            {typeof LogoComponent === 'string' ? (
                <span className="text-white font-black text-2xl">{brandName.charAt(0)}</span>
            ) : (
                <LogoComponent size={32} className="text-white" />
            )}
        </div>

        {/* Content Area */}
        <div className="flex-1">
            <h3 className="text-xl font-bold text-[#252733] group-hover:text-[#4640de] transition-colors leading-tight mb-1">
                {title}
            </h3>

            <p className="text-[#7c8087] text-[16px] font-medium mb-4 flex items-center">
                {brandName} <span className="mx-2 opacity-50">•</span> {location}
            </p>

            {/* Tags - Row below the subtitle as per screenshot */}
            <div className="flex flex-wrap gap-2.5">
                {tags.map((tag, i) => (
                    <span
                        key={i}
                        className={`px-4 py-1.5 rounded-full text-[13px] font-bold border transition-all ${tag === 'Full-Time' || tag === 'Full Time' ? 'text-[#56CDAD] border-[#56CDAD]/30 bg-[#56CDAD]/5' :
                            tag === 'Marketing' ? 'text-[#FFB836] border-[#FFB836]/30 bg-[#FFB836]/5' :
                                tag === 'Design' ? 'text-[#4640DE] border-[#4640DE]/30 bg-[#4640DE]/5' :
                                    'text-[#4640de] border-[#4640de]/20 bg-[#4640de]/5'
                            }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </Link>
);

const LatestJobs = () => {
    const { jobs } = useJobs();

    // Use first 8 jobs for latest
    const latestJobs = jobs.slice(0, 8);

    return (
        <section className="py-24 bg-[#f8f8fd]/30 relative overflow-hidden">
            {/* Background Accent Lines from Screenshot */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.2] z-0">
                <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1440 200L1000 640" stroke="#4640de" strokeWidth="1" />
                    <path d="M1440 400L1100 740" stroke="#4640de" strokeWidth="1" />
                </svg>
            </div>

            <div className="container relative z-10">
                <div className="flex justify-between items-center mb-16">
                    <h2 className="text-[48px] lg:text-[54px] font-black text-[#252733] tracking-tighter">
                        Latest <span className="text-[#3ba1ff]">jobs open</span>
                    </h2>
                    <Link to="/jobs" className="flex items-center gap-2.5 text-[#4640de] font-black transition-all hover:gap-3.5 group">
                        <span className="text-[17px]">Show all jobs</span>
                        <ArrowRight size={22} strokeWidth={2.5} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                    {latestJobs.map((job) => (
                        <LatestJobRow key={job.id} {...job} logo={Briefcase} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestJobs;
