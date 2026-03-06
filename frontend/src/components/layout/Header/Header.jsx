import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';
    const isLoggedIn = !!localStorage.getItem('token');
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setMobileOpen(false);
        navigate('/');
        window.location.reload();
    };

    const closeMenu = () => setMobileOpen(false);

    return (
        <header className={`${isHome ? 'absolute bg-transparent' : 'absolute bg-white shadow-sm border-b border-gray-100'} top-0 left-0 w-full py-4 lg:py-6 z-[110] transition-all`}>
            <div className="container flex items-center justify-between px-6">
                {/* Logo */}
                <Link to="/" onClick={closeMenu} className="flex items-center gap-2 cursor-pointer group shrink-0">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#4640de] rounded-full flex items-center justify-center p-1.5 lg:p-2 shadow-[0_8px_20px_rgba(70,64,222,0.2)] group-hover:scale-110 transition-transform duration-300">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-[22px] lg:text-[28px] font-black text-[#252733] tracking-tighter leading-none whitespace-nowrap">QuickHire</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 lg:gap-14 mr-auto ml-12 lg:ml-16">
                    <Link to="/jobs" className={`font-bold ${location.pathname === '/jobs' ? 'text-primary' : 'text-[#252733]'} hover:text-[#4640de] transition-colors text-[16px] lg:text-[17px] whitespace-nowrap`}>Find Jobs</Link>
                    <Link to="/jobs" className="font-bold text-[#252733] hover:text-[#4640de] transition-colors text-[16px] lg:text-[17px] whitespace-nowrap">Browse Companies</Link>
                    {isLoggedIn && (
                        <Link to="/admin" className={`font-bold ${location.pathname === '/admin' ? 'text-primary' : 'text-[#252733]'} hover:text-[#4640de] transition-colors text-[16px] lg:text-[17px] whitespace-nowrap`}>Dashboard</Link>
                    )}
                </nav>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center">
                    {isLoggedIn ? (
                        <button onClick={handleLogout}
                            className="flex items-center gap-2 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white px-6 py-3 rounded-sm font-black text-[15px] transition-all whitespace-nowrap active:scale-95">
                            <LogOut size={18} /> Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="font-bold text-[#4640de] text-[17px] hover:opacity-70 transition-opacity px-6 lg:px-8 whitespace-nowrap">Login</Link>
                            <div className="w-[1px] h-8 bg-gray-200 opacity-40"></div>
                            <div className="pl-4 lg:pl-8">
                                <Link to="/signup" className="bg-[#4640de] text-white px-8 lg:px-10 py-3 lg:py-3.5 rounded-sm font-black text-[15px] lg:text-[17px] shadow-[0_15px_30px_rgba(70,64,222,0.25)] hover:bg-[#3b35be] transition-all whitespace-nowrap active:scale-95 inline-block">
                                    Sign Up
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger - Circular design as per mockup */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden w-11 h-11 flex items-center justify-center bg-white border border-gray-100 rounded-full shadow-sm text-[#252733] transition-all active:scale-90"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileOpen && (
                <div className={`md:hidden absolute top-full left-0 w-full ${isHome ? 'bg-[#f8f8fd]' : 'bg-white'} border-t border-gray-200/30 shadow-xl z-[120]`}>
                    <div className="container py-6 flex flex-col gap-3 px-6">
                        <Link to="/jobs" onClick={closeMenu} className="font-bold text-[#252733] text-[17px] py-3 border-b border-gray-100/50">Find Jobs</Link>
                        <Link to="/jobs" onClick={closeMenu} className="font-bold text-[#252733] text-[17px] py-3 border-b border-gray-100/50">Browse Companies</Link>
                        {isLoggedIn && (
                            <Link to="/admin" onClick={closeMenu} className="font-bold text-primary text-[17px] py-3 border-b border-gray-100/50">Dashboard</Link>
                        )}
                        <div className="flex flex-col gap-3 pt-3">
                            {isLoggedIn ? (
                                <button onClick={handleLogout}
                                    className="flex items-center justify-center gap-2 bg-rose-50 text-rose-500 py-4 rounded-lg font-black text-[16px] transition-all active:scale-95">
                                    <LogOut size={18} /> Logout
                                </button>
                            ) : (
                                <>
                                    <Link to="/login" onClick={closeMenu} className="text-center font-bold text-[#4640de] text-[17px] py-3">Login</Link>
                                    <Link to="/signup" onClick={closeMenu} className="bg-[#4640de] text-white py-4 rounded-lg font-black text-[17px] text-center shadow-lg active:scale-95 transition-all">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
