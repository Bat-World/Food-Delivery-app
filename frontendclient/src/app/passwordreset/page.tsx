"use client";

import { useState } from "react";
import { sendRequest } from "@/lib/send-request";
import { useRouter } from "next/navigation";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await sendRequest.post("/passwordreset", { email });

      if (response.status === 200) {
        setMessage("Password reset link sent! Check your email.");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (error) {
      console.error("Error sending password reset request:", error);
      setMessage("Error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 space-y-4 rounded-xl shadow-lg bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Reset Password
        </h2>
        <p className="text-center text-gray-500">
          Enter your email to receive a password reset link
        </p>

        {message && <div className="text-center">{message}</div>}

        <form onSubmit={handlePasswordReset} className="space-y-4">
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
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
