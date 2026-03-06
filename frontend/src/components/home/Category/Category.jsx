import React from 'react';
import {
    ArrowRight,
    PenTool,
    BarChart3,
    Megaphone,
    Wallet,
    Monitor,
    Code2,
    Briefcase,
    Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ icon: Icon, title, jobs, isHighlighted }) => (
    <>
        {/* Desktop Card */}
        <div className={`hidden md:block p-8 border min-h-[180px] transition-all duration-300 cursor-pointer group rounded-lg ${isHighlighted
            ? 'bg-primary border-primary text-white shadow-lg'
            : 'bg-white border-gray-100 hover:bg-primary hover:border-primary hover:shadow-xl'
            }`}>
            <div className={`mb-6 p-3 w-fit rounded-lg transition-colors duration-300 ${isHighlighted ? 'bg-white/20' : 'bg-light-blue group-hover:bg-white/20'}`}>
                <Icon size={32} className={`transition-colors duration-300 ${isHighlighted ? 'text-white' : 'text-primary group-hover:text-white'}`} strokeWidth={1.5} />
            </div>
            <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isHighlighted ? 'text-white' : 'text-heading group-hover:text-white'}`}>
                {title}
            </h3>
            <div className="flex items-center justify-between">
                <p className={`text-sm transition-colors duration-300 ${isHighlighted ? 'text-white/80' : 'text-body font-medium group-hover:text-white/80'}`}>
                    {jobs} jobs available
                </p>
                <ArrowRight size={18} className={`transition-all duration-300 group-hover:translate-x-2 ${isHighlighted ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
            </div>
        </div>

        {/* Mobile Row Card - matching screenshot exactly */}
        <div className="md:hidden flex items-center gap-5 p-5 border border-gray-100 rounded-lg cursor-pointer group hover:border-primary/20 transition-all bg-white">
            <div className="w-14 h-14 rounded-lg bg-[#f0f0ff] flex items-center justify-center shrink-0">
                <Icon size={26} className="text-primary" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
                <h3 className="text-[17px] font-black text-[#252733]">{title}</h3>
                <p className="text-[14px] text-[#7c8087] font-medium">{jobs} Jobs available</p>
            </div>
            <ArrowRight size={20} className="text-gray-300 group-hover:text-primary transition-colors shrink-0" />
        </div>
    </>
);

const Category = () => {
    const categories = [
        { icon: PenTool, title: 'Design', jobs: 235 },
        { icon: BarChart3, title: 'Sales', jobs: 756 },
        { icon: Megaphone, title: 'Marketing', jobs: 140 },
        { icon: Wallet, title: 'Finance', jobs: 325 },
        { icon: Monitor, title: 'Technology', jobs: 436 },
        { icon: Code2, title: 'Engineering', jobs: 542 },
        { icon: Briefcase, title: 'Business', jobs: 211 },
        { icon: Users, title: 'Human Resource', jobs: 346 },
    ];

    return (
        <section className="py-12 lg:py-16 bg-white">
            <div className="container">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 lg:mb-12">
                    <h2 className="text-3xl lg:text-5xl font-bold">
                        Explore by <span className="text-primary">category</span>
                    </h2>
                    <Link to="/jobs" className="flex items-center gap-2 text-primary font-bold transition-all hover:gap-3">
                        Show all jobs <ArrowRight size={20} />
                    </Link>
                </div>

                {/* Desktop: 4-col grid, Mobile: 1-col stacked list */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <CategoryCard key={index} {...cat} />
                    ))}
                </div>
                <div className="md:hidden flex flex-col gap-3">
                    {categories.map((cat, index) => (
                        <CategoryCard key={index} {...cat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;
