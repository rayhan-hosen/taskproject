import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <header className={`${isHome ? 'absolute' : 'fixed bg-white shadow-sm border-b border-gray-100'} top-0 left-0 w-full py-6 lg:py-8 z-[110] transition-all`}>
            <div className="container flex items-center justify-between">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 cursor-pointer group shrink-0">
                    <div className="w-10 h-10 bg-[#4640de] rounded-full flex items-center justify-center p-2 shadow-[0_8px_20px_rgba(70,64,222,0.2)] group-hover:scale-110 transition-transform duration-300">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-[24px] lg:text-[28px] font-black text-[#252733] tracking-tighter leading-none whitespace-nowrap">QuickHire</span>
                </Link>

                {/* Navigation Menu */}
                <nav className="hidden md:flex items-center gap-10 lg:gap-14 mr-auto ml-16">
                    <Link to="/jobs" className={`font-bold ${location.pathname === '/jobs' ? 'text-primary' : 'text-[#252733]'} hover:text-[#4640de] transition-colors text-[17px] whitespace-nowrap`}>Find Jobs</Link>
                    <Link to="/admin" className={`font-bold ${location.pathname === '/admin' ? 'text-primary' : 'text-[#252733]'} hover:text-[#4640de] transition-colors text-[17px] whitespace-nowrap`}>Dashboard (Admin)</Link>
                </nav>

                {/* Auth Actions */}
                <div className="flex items-center">
                    <button className="hidden sm:block font-bold text-[#4640de] text-[17px] hover:opacity-70 transition-opacity px-6 lg:px-8 whitespace-nowrap">Login</button>

                    {/* Subtle Vertical Divider */}
                    <div className="hidden sm:block w-[1px] h-8 bg-gray-200 opacity-40"></div>

                    <div className="pl-4 lg:pl-8">
                        <button className="bg-[#4640de] text-white px-6 lg:px-10 py-3 lg:py-3.5 rounded-sm font-black text-[15px] lg:text-[17px] shadow-[0_15px_30px_rgba(70,64,222,0.25)] hover:bg-[#3b35be] transition-all whitespace-nowrap active:scale-95">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
