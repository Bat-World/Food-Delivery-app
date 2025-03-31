"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/lib/send-request";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await sendRequest.post("/login", {
        email: email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("auth_token", token);
        toast("Welcome back", { type: "success" });
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          setError("Network error. Please check your connection.");
        } else {
          setError("Invalid username or password.");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-row  justify-between bg-white">
      <div className="w-[40vw] h-screen flex justify-center items-center">
        <div className=" max-w-md p-8 space-y-4 rounded-xl shadow-lg bg-white">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-500">Login to continue</p>

          {error && <div className="text-red-500 text-center">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-600">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
            <button
              type="button"
              className="w-full py-2 bg-gray-100 text-blue-500 rounded-lg hover:bg-gray-200 transition duration-300"
              onClick={() => router.push(`/signup/`)}
            >
              Create Account
            </button>
            <button
              onClick={() => router.push(`/passwordreset/`)}
              className="w-full py-2  text-red-400 rounded-lg hover:text-red-500 transition duration-300 hover:scale-105 "
            >
              Forget Password
            </button>
          </form>
        </div>
      </div>

      <img
        src="https://images.unsplash.com/photo-1607273685680-6bd976c5a5ce?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-[60vw] h-screen object-cover "
      />
    </div>
  );
};

export default Login;
