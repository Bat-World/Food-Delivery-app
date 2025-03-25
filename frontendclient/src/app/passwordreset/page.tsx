"use client";

import { useState } from "react";
import { sendRequest } from "@/lib/send-request";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [message, ] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await sendRequest.post("/passwordreset", { email, resetPassword });
    
      if (response.status === 200) {
        toast("Password reset link sent! Check your email.");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (error) {
      console.error("Error sending password reset request:", error);
      toast("Error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-row  justify-between bg-white">
      <div className="w-[40vw] h-screen flex justify-center items-center">
        <div className=" max-w-md p-8 space-y-4 rounded-xl shadow-lg bg-white">
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
               <label htmlFor="email" className="block text-gray-600">
                New Password:
              </label>
              <input
                type="password"
                id="password"
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
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

      <img
        src="https://images.unsplash.com/photo-1607273685680-6bd976c5a5ce?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-[60vw] h-screen object-cover"
      />
    </div>
  );
};

export default PasswordReset;
