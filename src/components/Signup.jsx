import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 max-w-lg w-full transition-transform transform hover:scale-105 duration-300">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold text-white">Sign up to create an account</h2>
                <p className="mt-2 text-center text-sm text-white/70">
                    Already have an account?&nbsp;
                    <Link to="/login" className="text-blue-400 hover:underline">
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        className="bg-white/20 text-white placeholder-white/50 border-white/30"
                        {...register("name", { required: true })}
                    />
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        className="bg-white/20 text-white placeholder-white/50 border-white/30"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be valid",
                            },
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        className="bg-white/20 text-white placeholder-white/50 border-white/30"
                        {...register("password", { required: true })}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
