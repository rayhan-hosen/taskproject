import React from 'react';
import Hero from '../components/home/Hero/Hero';
import CompanyLogos from '../components/home/CompanyLogos/CompanyLogos';
import Category from '../components/home/Category/Category';
import JobBanner from '../components/home/JobBanner/JobBanner';
import FeaturedJobs from '../components/home/FeaturedJobs/FeaturedJobs';
import LatestJobs from '../components/home/LatestJobs/LatestJobs';

const Home = () => {
    return (
        <>
            <Hero />
            <CompanyLogos />
            <Category />
            <JobBanner />
            <FeaturedJobs />
            <LatestJobs />
        </>
    );
};

export default Home;
