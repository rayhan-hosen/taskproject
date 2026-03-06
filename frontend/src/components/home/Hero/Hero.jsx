import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroMan from '../../../assets/hero-man.png';

const POPULAR_TAGS = ['UI Designer', 'UX Researcher', 'Android', 'Admin'];

const Hero = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (keyword.trim()) params.set('search', keyword.trim());
        if (location.trim()) params.set('location', location.trim());
        navigate(`/jobs${params.toString() ? '?' + params.toString() : ''}`);
    };

    const handlePopularClick = (tag) => {
        setKeyword(tag);
        const params = new URLSearchParams();
        params.set('search', tag);
        if (location.trim()) params.set('location', location.trim());
        navigate(`/jobs?${params.toString()}`);
    };

    return (
        <section className="relative bg-[#f8f8fd] overflow-hidden lg:h-[850px] flex flex-col justify-end pt-16 lg:pt-0">
            {/* Background geometric pattern */}
            <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
                <svg width="100%" height="100%" viewBox="0 0 1440 850" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1000 -100L450 450L650 650L1200 100L1000 -100Z" stroke="#4640de" strokeWidth="0.8" strokeOpacity="0.1" />
                    <path d="M1150 50L700 500L900 700L1350 250L1150 50Z" stroke="#4640de" strokeWidth="0.8" strokeOpacity="0.1" />
                    <path d="M1440 0L800 640" stroke="#4640de" strokeWidth="0.5" strokeOpacity="0.08" />
                </svg>
            </div>

            {/* Hero container */}
            <div className="container relative z-10 w-full mb-0 lg:h-full lg:flex lg:items-center pt-10 lg:pt-20">
                <div className="flex flex-col lg:flex-row items-end justify-between w-full h-full relative">

                    {/* Left content area */}
                    <div className="lg:w-[54%] pb-10 lg:pb-12 text-left z-30 px-1 lg:px-0">
                        <h1 className="text-[42px] sm:text-[56px] lg:text-[84px] font-black text-[#252733] leading-[1.05] mb-6 lg:mb-8 tracking-tighter">
                            Discover <br />
                            more than <br />
                            <span className="text-[#3ba1ff] relative inline-block">
                                5000+ Jobs
                                <span className="absolute left-0 bottom-[-4px] lg:bottom-[-8px] w-full h-[10px] lg:h-[18px]">
                                    <svg width="100%" height="100%" viewBox="0 0 450 16" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                        <path d="M4 12C120 4.5 330 4.5 446 12" stroke="#3ba1ff" strokeWidth="11" strokeLinecap="round" />
                                        <path d="M12 7.5C110 3.5 310 3.5 440 7.5" stroke="#3ba1ff" strokeWidth="4" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </span>
                        </h1>

                        <p className="text-[#7c8087] text-[16px] lg:text-[24px] font-medium max-w-[580px] mb-10 lg:mb-14 leading-relaxed tracking-tight">
                            Great platform for the job seeker that searching for new career heights and passionate about startups.
                        </p>

                        {/* Search Bar */}
                        <div className="bg-white p-2.5 rounded shadow-[0_45px_100px_rgba(0,0,0,0.06)] flex flex-col lg:flex-row items-stretch w-full max-w-[800px] lg:mr-[-100px] gap-0 border border-gray-100 z-50 relative">
                            {/* Keyword Input */}
                            <div className="flex items-center gap-4 px-5 lg:px-6 flex-1 w-full lg:border-r border-b lg:border-b-0 border-gray-100 py-4 lg:py-2">
                                <Search size={22} className="text-[#252733] opacity-50 shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Job title or keyword"
                                    className="w-full text-[16px] lg:text-[19px] font-semibold text-[#252733] outline-none placeholder:text-gray-300 bg-transparent"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>

                            {/* Location Input — now a real editable input */}
                            <div className="flex items-center gap-4 px-5 lg:px-6 flex-1 w-full py-4 lg:py-2 border-b lg:border-b-0 border-gray-100">
                                <MapPin size={22} className="text-[#252733] opacity-50 shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Location (e.g. Dhaka)"
                                    className="w-full text-[16px] lg:text-[19px] font-semibold text-[#252733] outline-none placeholder:text-gray-300 bg-transparent"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>

                            {/* Search Button */}
                            <button
                                onClick={handleSearch}
                                className="bg-[#4640de] text-white px-8 lg:px-12 py-4 lg:py-5 rounded-sm font-black text-[16px] lg:text-[19px] hover:bg-[#3b35be] active:scale-[0.98] transition-all shadow-lg shadow-indigo-100/50 min-w-max w-full lg:w-auto"
                            >
                                Search my job
                            </button>
                        </div>

                        {/* Popular Tags — clickable */}
                        <p className="mt-8 lg:mt-10 text-[14px] lg:text-[17px] text-[#7c8087] font-medium">
                            Popular :{' '}
                            {POPULAR_TAGS.map((tag, i) => (
                                <span key={tag}>
                                    <button
                                        onClick={() => handlePopularClick(tag)}
                                        className="text-[#252733] font-bold hover:text-primary transition-colors"
                                    >
                                        {tag}
                                    </button>
                                    {i < POPULAR_TAGS.length - 1 && <span className="text-[#7c8087]">, </span>}
                                </span>
                            ))}
                        </p>
                    </div>

                    {/* Right Image area - HIDDEN on mobile */}
                    <div className="hidden lg:flex lg:w-[46%] relative items-end justify-end z-10">
                        <div
                            className="absolute right-[-15vw] bottom-0 w-[150%] h-[160%] bg-white z-0"
                            style={{ clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 0% 100%)' }}
                        ></div>
                        <img
                            src={heroMan}
                            alt="Smiling professional pointing"
                            className="relative z-10 w-[501px] h-[707px] object-cover object-bottom drop-shadow-[0_45px_120px_rgba(0,0,0,0.15)] block align-bottom mt-auto"
                            style={{ marginBottom: '-3px' }}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
