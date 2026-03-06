import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Dribbble } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#202430] pt-28 pb-16 text-white overflow-hidden">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-16 mb-24">

                    {/* Brand Info & Description */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-3 mb-10 group cursor-pointer">
                            <div className="w-10 h-10 bg-[#4640de] rounded-full flex items-center justify-center p-2 shadow-[0_0_20px_rgba(70,64,222,0.6)] group-hover:scale-110 transition-transform duration-300">
                                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-[#4640de]"></div>
                                </div>
                            </div>
                            <span className="text-[28px] font-black tracking-tight leading-none text-white">QuickHire</span>
                        </div>
                        <p className="text-[#a0a3a8] text-[17px] leading-relaxed font-normal max-w-[340px]">
                            Great platform for the job seeker that passionate about startups. Find your dream job easier.
                        </p>
                    </div>

                    {/* About Links */}
                    <div className="lg:col-span-2">
                        <h4 className="text-[18px] font-bold mb-10 text-white">About</h4>
                        <ul className="space-y-5 text-[#a0a3a8] font-medium text-[16px]">
                            <li><a href="#" className="hover:text-white transition-colors">Companies</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Advice</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div className="lg:col-span-2">
                        <h4 className="text-[18px] font-bold mb-10 text-white">Resources</h4>
                        <ul className="space-y-5 text-[#a0a3a8] font-medium text-[16px]">
                            <li><a href="#" className="hover:text-white transition-colors">Help Docs</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Guide</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="lg:col-span-4">
                        <h4 className="text-[18px] font-bold mb-10 text-white">Get job notifications</h4>
                        <p className="text-[#a0a3a8] text-[16px] leading-relaxed mb-10 font-medium">
                            The latest job news, articles, sent to your inbox weekly.
                        </p>
                        <form className="flex w-full max-w-[400px]">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="flex-1 bg-white px-6 py-4 text-gray-900 border-none outline-none placeholder:text-gray-400 font-medium text-[16px] rounded-sm rounded-r-none h-[56px]"
                            />
                            <button className="bg-[#4640de] hover:bg-[#3b35be] px-8 text-white font-black text-[16px] transition-all whitespace-nowrap rounded-sm rounded-l-none h-[56px] flex-none">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Copyright & Socials */}
                <div className="pt-10 border-t border-[#7c8087]/20 flex flex-col md:flex-row justify-between items-center gap-10">
                    <p className="text-[#7c8087] font-medium text-[15px]">
                        2021 © QuickHire. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        {[Facebook, Instagram, Dribbble, Linkedin, Twitter].map((Icon, idx) => (
                            <a
                                key={idx}
                                href="#"
                                className="w-10 h-10 rounded-full bg-[#7c8087]/10 flex items-center justify-center hover:bg-[#4640de] transition-all group lg:opacity-80 hover:opacity-100"
                            >
                                <Icon size={18} className="text-white group-hover:text-white transition-colors" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
