import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await axios.post(`${apiUrl}/auth/login`, loginData);
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                toast.success('Logged in successfully!');
                navigate('/admin');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f8fd] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 lg:p-14 rounded-3xl shadow-xl w-full max-w-md border border-gray-100"
            >
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                        <Lock size={40} />
                    </div>
                    <h1 className="text-3xl font-black text-[#252733] tracking-tighter">Welcome Back</h1>
                    <p className="text-[#a0a3a8] font-bold mt-2 uppercase text-xs tracking-widest">Admin Access Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[#252733] font-black text-sm uppercase tracking-tight">Username</label>
                        <div className="relative group">
                            <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                required
                                type="text"
                                placeholder="Enter username : admin"
                                className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-14 py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300"
                                value={loginData.username}
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[#252733] font-black text-sm uppercase tracking-tight">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                required
                                type="password"
                                placeholder="Enter password : admin"
                                className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white px-14 py-4 rounded-xl outline-none font-bold text-[#252733] transition-all placeholder:text-gray-300"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary-hover text-white py-5 rounded-2xl font-black text-[18px] transition-all shadow-xl active:scale-95 shadow-indigo-100/50 flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                        {!isLoading && <ArrowRight size={20} />}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-[#a0a3a8] font-bold text-sm">
                        Don't have an account? <Link to="/signup" className="text-primary font-black hover:underline">Sign Up</Link>
                    </p>
                </div>

                <div className="mt-6 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <p className="text-xs font-bold text-primary text-center uppercase tracking-wider">Demo Credential Both Username and Password</p>
                    <p className="text-center text-[#252733] font-black mt-1">admin</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
