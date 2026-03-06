import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
    return (
        <div className="min-h-screen bg-[#f8f8fd] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 lg:p-14 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 text-center"
            >
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                    <UserPlus size={40} />
                </div>
                <h1 className="text-3xl font-black text-[#252733] tracking-tighter mb-3">Sign Up</h1>
                <p className="text-[#a0a3a8] font-bold uppercase text-xs tracking-widest mb-8">Registration Not Available</p>

                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 mb-8">
                    <p className="text-amber-700 font-bold text-lg leading-relaxed">
                        Public registration is currently <span className="font-black">not active</span>.
                    </p>
                    <p className="text-amber-600 font-medium text-sm mt-3 leading-relaxed">
                        Demo Credential Both Username and Password is : admin
                    </p>
                </div>

                <Link
                    to="/login"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-2xl font-black text-[16px] transition-all shadow-xl active:scale-95 shadow-indigo-100/50"
                >
                    <ArrowLeft size={18} />
                    Back to Login
                </Link>

                <div className="mt-8">
                    <p className="text-[#a0a3a8] font-bold text-sm">
                        Already have access? <Link to="/login" className="text-primary font-black hover:underline">Sign In</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
