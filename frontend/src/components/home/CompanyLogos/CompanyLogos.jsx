import React from 'react';

// Correcting the relative path to the assets folder
import vodafoneLogo from '../../../assets/vectors/vodafone.svg';
import intelLogo from '../../../assets/vectors/intel.svg';
import teslaLogo from '../../../assets/vectors/TESLA.svg';
import amdLogo from '../../../assets/vectors/amd.svg';
import talkitLogo from '../../../assets/vectors/talkit.svg';

const CompanyLogos = () => {
    const companies = [
        { name: 'Vodafone', src: vodafoneLogo, hoverClass: 'hover:text-[#E60000]' },
        { name: 'Intel', src: intelLogo, hoverClass: 'hover:text-[#0071C5]' },
        { name: 'Tesla', src: teslaLogo, hoverClass: 'hover:text-[#E82127]' },
        { name: 'AMD', src: amdLogo, hoverClass: 'hover:text-black' },
        { name: 'Talkit', src: talkitLogo, hoverClass: 'hover:text-[#4F46E5]' }
    ];

    return (
        <section className="py-12 bg-white border-t border-gray-50 mt-[-1px]">
            <div className="container">
                <p className="text-[#a0a3a8] font-bold text-lg mb-12">Companies we've helped grow</p>

                <div className="flex flex-wrap items-center justify-between gap-12 opacity-[0.45] grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    {companies.map((company, idx) => (
                        <div
                            key={idx}
                            className={`cursor-pointer transition-all duration-300 transform hover:scale-110 ${company.hoverClass}`}
                        >
                            <img
                                src={company.src}
                                alt={`${company.name} logo`}
                                className="h-8 lg:h-10 w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CompanyLogos;
