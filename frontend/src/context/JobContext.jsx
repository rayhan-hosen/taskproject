import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [filters, setFilters] = useState({ search: '', location: '', category: '', type: '', salary: '' });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const isFetching = useRef(false);
    const filtersRef = useRef(filters);
    const pageRef = useRef(page);
    const searchTimeoutRef = useRef(null);

    // Keep refs in sync with state
    useEffect(() => { filtersRef.current = filters; }, [filters]);
    useEffect(() => { pageRef.current = page; }, [page]);

    const fetchJobs = useCallback(async (isNewSearch = false) => {
        if (isFetching.current) return;

        const currentFilters = filtersRef.current;
        const currentPage = isNewSearch ? 1 : pageRef.current;

        isFetching.current = true;
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/jobs`, {
                params: {
                    page: currentPage,
                    limit: 8,
                    search: currentFilters.search,
                    location: currentFilters.location,
                    category: currentFilters.category,
                    type: currentFilters.type,
                    salary: currentFilters.salary
                }
            });

            const { jobs: rawJobs, totalPages: total } = response.data;

            const newJobs = rawJobs.map(job => ({
                ...job,
                tags: typeof job.tags === 'string' ? JSON.parse(job.tags) : (job.tags || [])
            }));

            setJobs(prev => isNewSearch ? newJobs : [...prev, ...newJobs]);
            setHasMore(currentPage < total);
            setPage(currentPage + 1);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    }, [API_URL]);

    // updateFilters: resets pagination and triggers a debounced new search
    const updateFilters = useCallback((newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setJobs([]);
        setPage(1);
        setHasMore(true);

        // Debounce — wait 400ms before firing API call
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = setTimeout(() => {
            fetchJobs(true);
        }, 400);
    }, [fetchJobs]);

    const addJob = useCallback(async (jobData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/jobs`, jobData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                const job = response.data.job;
                job.tags = typeof job.tags === 'string' ? JSON.parse(job.tags) : (job.tags || []);
                setJobs(prev => [job, ...prev]);
                return true;
            }
        } catch (error) {
            console.error('Error adding job:', error);
            return false;
        }
    }, [API_URL]);

    const updateJob = useCallback(async (id, jobData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/jobs/${id}`, jobData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                const updatedJob = response.data.job;
                updatedJob.tags = typeof updatedJob.tags === 'string' ? JSON.parse(updatedJob.tags) : (updatedJob.tags || []);
                setJobs(prev => prev.map(job => job.id === id ? updatedJob : job));
                return true;
            }
        } catch (error) {
            console.error('Error updating job:', error);
            return false;
        }
    }, [API_URL]);

    const deleteJob = useCallback(async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/jobs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setJobs(prev => prev.filter(job => job.id !== id));
            return true;
        } catch (error) {
            console.error('Error deleting job:', error);
            return false;
        }
    }, [API_URL]);

    const applyForJob = useCallback(async (applicationData) => {
        try {
            await axios.post(`${API_URL}/applications`, applicationData);
            return true;
        } catch (error) {
            console.error('Error applying:', error);
            return false;
        }
    }, [API_URL]);

    const getJobById = useCallback(async (id) => {
        try {
            const response = await axios.get(`${API_URL}/jobs/${id}`);
            const job = response.data.job;
            if (job) {
                job.tags = typeof job.tags === 'string' ? JSON.parse(job.tags) : (job.tags || []);
            }
            return job;
        } catch (error) {
            console.error('Error fetching job:', error);
            return null;
        }
    }, [API_URL]);

    return (
        <JobContext.Provider value={{
            jobs, loading, hasMore, fetchJobs, addJob, updateJob, deleteJob, applyForJob, updateFilters, filters, getJobById
        }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => {
    const context = useContext(JobContext);
    if (!context) throw new Error('useJobs must be used within a JobProvider');
    return context;
};
