import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Dribbble, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#202430] pt-16 lg:pt-28 pb-10 lg:pb-16 text-white overflow-hidden">
            <div className="container">
                <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 lg:gap-x-16 gap-y-12 lg:gap-y-16 mb-12 lg:mb-24">

                    {/* Brand Info — full width on mobile */}
                    <div className="col-span-2 lg:col-span-4">
                        <div className="flex items-center gap-3 mb-6 lg:mb-10 group cursor-pointer">
                            <div className="w-10 h-10 bg-[#4640de] rounded-full flex items-center justify-center p-2 shadow-[0_0_20px_rgba(70,64,222,0.6)] group-hover:scale-110 transition-transform duration-300">
                                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-[#4640de]"></div>
                                </div>
                            </div>
                            <span className="text-[24px] lg:text-[28px] font-black tracking-tight leading-none text-white">QuickHire</span>
                        </div>
                        <p className="text-[#a0a3a8] text-[15px] lg:text-[17px] leading-relaxed font-normal max-w-[340px]">
                            Great platform for the job seeker that passionate about startups. Find your dream job easier.
                        </p>
                    </div>

                    {/* About Links */}
                    <div className="col-span-1 lg:col-span-2">
                        <h4 className="text-[16px] lg:text-[18px] font-bold mb-6 lg:mb-10 text-white">About</h4>
                        <ul className="space-y-4 lg:space-y-5 text-[#a0a3a8] font-medium text-[15px] lg:text-[16px]">
                            <li><a href="#" className="hover:text-white transition-colors">Companies</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Advice</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div className="col-span-1 lg:col-span-2">
                        <h4 className="text-[16px] lg:text-[18px] font-bold mb-6 lg:mb-10 text-white">Resources</h4>
                        <ul className="space-y-4 lg:space-y-5 text-[#a0a3a8] font-medium text-[15px] lg:text-[16px]">
                            <li><a href="#" className="hover:text-white transition-colors">Help Docs</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Guide</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Newsletter — full width on mobile */}
                    <div className="col-span-2 lg:col-span-4">
                        <h4 className="text-[16px] lg:text-[18px] font-bold mb-4 lg:mb-10 text-white">Get job notifications</h4>
                        <p className="text-[#a0a3a8] text-[15px] lg:text-[16px] leading-relaxed mb-6 lg:mb-10 font-medium">
                            The latest job news, articles, sent to your inbox weekly.
                        </p>
                        {/* Mobile: stacked layout. Desktop: inline */}
                        <form className="flex flex-col sm:flex-row w-full max-w-[400px] gap-3 sm:gap-0">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="flex-1 bg-white px-5 lg:px-6 py-4 text-gray-900 border-none outline-none placeholder:text-gray-400 font-medium text-[15px] lg:text-[16px] rounded-lg sm:rounded-r-none sm:rounded-l-sm h-[52px] lg:h-[56px]"
                            />
                            <button className="bg-[#4640de] hover:bg-[#3b35be] px-8 text-white font-black text-[15px] lg:text-[16px] transition-all whitespace-nowrap rounded-lg sm:rounded-l-none sm:rounded-r-sm h-[52px] lg:h-[56px] flex-none">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="pt-8 lg:pt-10 border-t border-[#7c8087]/20 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
                    <p className="text-[#a0a3a8] font-medium text-[14px] lg:text-[16px]">
                        2021 @ QuickHire. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {[
                            { Icon: Facebook, link: '#' },
                            { Icon: Instagram, link: '#' },
                            { Icon: Dribbble, link: '#' },
                            { Icon: Linkedin, link: '#' },
                            { Icon: Twitter, link: '#' }
                        ].map(({ Icon, link }, index) => (
                            <a
                                key={index}
                                href={link}
                                className="w-10 h-10 bg-[#ffffff]/5 hover:bg-[#4640de] rounded-full flex items-center justify-center transition-all duration-300 group"
                            >
                                <Icon size={18} className="text-[#a0a3a8] group-hover:text-white transition-colors" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
