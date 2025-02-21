import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-lg p-10 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold text-white">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-white/60">
          Don&apos;t have an account?&nbsp;
          <Link to="/signup" className="font-medium text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            className="bg-transparent text-white border-white/30 focus:bg-white/20"
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
            label="Password: "
            type="password"
            placeholder="Enter your password"
            className="bg-transparent text-white border-white/30 focus:bg-white/20"
            {...register("password", {
              required: true,
            })}
          />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
