"use client";

import React, { useState } from "react";
import { sendRequest } from "@/lib/send-request";
import { useRouter } from "next/navigation";



const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await sendRequest.post("/user/signup", {
        email,
        password,
      });

      if (response.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      setError("Error occurred during sign up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 space-y-4 rounded-xl shadow-lg bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800">Join Us!</h2>
        <p className="text-center text-gray-500">Create your account</p>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-600">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-600">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <button
            type="button"
            className="w-full py-2 bg-gray-100 text-blue rounded-lg hover:bg-gray-200 transition duration-300"
            onClick={() => router.push(`/login/`)}
          >
            Already have an account? Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;