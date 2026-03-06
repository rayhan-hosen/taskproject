import React from 'react';
import { Link } from 'react-router-dom';
import dashboardPreview from '../../../assets/dashboard-preview.png';
import userAvatar from '../../../assets/user-avatar.png';

const JobBanner = () => {
    return (
        <section className="py-16 lg:py-32 flex justify-center">
            <div className="container relative overflow-visible">
                {/* Desktop: Slanted, Mobile: Simple rectangle */}
                <div
                    className="bg-[#4640de] rounded-none lg:rounded-[40px] px-6 py-16 lg:px-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between text-white relative lg:min-h-[500px]"
                    style={{ clipPath: window.innerWidth >= 1024 ? 'polygon(0 15%, 100% 0, 100% 100%, 0 85%)' : 'none' }}
                >
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-[0.03] z-0"></div>

                    <div className="lg:w-1/2 z-10 text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight mb-4 lg:mb-8">
                            Start posting <br className="hidden lg:block" /> jobs today
                        </h2>
                        <p className="text-base lg:text-xl text-white/80 mb-8 lg:mb-12 font-medium">
                            Start posting jobs for only $10.
                        </p>
                        <Link to="/signup" className="inline-block bg-white text-[#4640de] px-8 lg:px-10 py-4 lg:py-5 rounded-md font-bold text-base lg:text-xl hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] hover:scale-105 transition-all w-full sm:w-auto text-center border-2 border-white">
                            Sign Up For Free
                        </Link>
                    </div>

                    {/* Dashboard image - hidden on mobile */}
                    <div className="hidden lg:block lg:w-1/2 mt-16 lg:mt-0 relative z-10">
                        <div className="relative w-[550px] aspect-[4/3] rounded-xl overflow-hidden shadow-[0_50px_80px_rgba(0,0,0,0.3)] border-8 border-white/10 lg:ml-auto lg:-mr-12 rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                            <img src={dashboardPreview} alt="Dashboard" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* Profile Circle hidden on mobile */}
                <div className="hidden lg:block absolute left-1/2 lg:left-[42%] bottom-[-50px] -translate-x-1/2 z-30 group">
                    <div className="w-28 h-28 rounded-full border-[8px] border-white overflow-hidden shadow-2xl bg-white scale-100 group-hover:scale-110 transition-transform">
                        <img src={userAvatar} alt="User" className="w-full h-full object-cover transform scale-110" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JobBanner;
