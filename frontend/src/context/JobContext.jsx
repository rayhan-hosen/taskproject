import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialJobs } from '../data/jobs';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState(() => {
        // Load from localStorage if available, otherwise use initial data
        const savedJobs = localStorage.getItem('quickHire_jobs');
        return savedJobs ? JSON.parse(savedJobs) : initialJobs;
    });

    // Persist jobs to localStorage
    useEffect(() => {
        localStorage.setItem('quickHire_jobs', JSON.stringify(jobs));
    }, [jobs]);

    const addJob = (newJob) => {
        setJobs(prev => [...prev, { ...newJob, id: Date.now().toString() }]);
    };

    const deleteJob = (id) => {
        setJobs(prev => prev.filter(job => job.id !== id));
    };

    const updateJob = (id, updatedData) => {
        setJobs(prev => prev.map(job => job.id === id ? { ...job, ...updatedData } : job));
    };

    return (
        <JobContext.Provider value={{ jobs, addJob, deleteJob, updateJob }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => {
    const context = useContext(JobContext);
    if (!context) throw new Error('useJobs must be used within a JobProvider');
    return context;
};
