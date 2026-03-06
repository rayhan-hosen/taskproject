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

const CategoryCard = ({ icon: Icon, title, jobs, isHighlighted }) => (
    <div className={`p-8 border min-h-[180px] transition-all duration-300 cursor-pointer group rounded-lg ${isHighlighted
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
            <ArrowRight
                size={18}
                className={`transition-all duration-300 group-hover:translate-x-2 ${isHighlighted ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}
            />
        </div>
    </div>
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
        <section className="py-12 bg-white">
            <div className="container">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-bold">
                            Explore by <span className="text-primary">category</span>
                        </h2>
                    </div>
                    <a href="#" className="flex items-center gap-2 text-primary font-bold transition-all hover:gap-3">
                        Show all jobs <ArrowRight size={20} />
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <CategoryCard key={index} {...cat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;
