"use client";

import React, { useState } from "react";
import { sendRequest } from "@/lib/send-request";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import clsx from "clsx";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);


  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    const emailValid = validatedEmail.every((r) => r.isValid);
    const passwordValid = validatedPassword.every((r) => r.isValid);

    if (!emailValid) {
      setError("Please enter a valid email");
      return;
    }

    if (!passwordValid) {
      setError("Password does not meet the requirements");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await sendRequest.post("/user/signup", {
        email,
        password,
      });

      if (response.status === 201) {
        toast("Signed up successfully, Please login", { type: "success" });
        router.push("/login");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      setError("Error occurred during sign up.");
    } finally {
      setLoading(false);
    }
  };

  const passwordRules = [
    {
      label: "At least 8 characters",
      test: (val: string) => val.length >= 8,
    },
    {
      label: "Includes a lowercase letter",
      test: (val: string) => /[a-z]/.test(val),
    },
    {
      label: "Includes an uppercase letter",
      test: (val: string) => /[A-Z]/.test(val),
    },
    {
      label: "Includes a number",
      test: (val: string) => /[0-9]/.test(val),
    },
  ];

  const emailRules = [
    {
      label: "Must include @ symbol",
      test: (val: string) => val.includes("@"),
    },
    {
      label: "Must include a valid domain",
      test: (val: string) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
    },
  ];

  const validatedPassword = useMemo(() => {
    return passwordRules.map((rule) => ({
      ...rule,
      isValid: rule.test(password),
    }));
  }, [password]);

  const validatedEmail = useMemo(() => {
    return emailRules.map((rule) => ({
      ...rule,
      isValid: rule.test(email),
    }));
  }, [email]);

  return (
    <div className="min-h-screen flex flex-row  justify-between bg-white">
      <div className="w-[40vw] h-screen flex justify-center items-center">
        <div className=" max-w-md p-8 space-y-4 rounded-xl shadow-lg bg-white">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Join Us!
          </h2>
          <p className="text-center text-gray-500">Create your account</p>

          {error && <div className="text-red-500 text-center">{error}</div>}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-600">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (!touchedEmail) {
                    setTouchedEmail(true);
                  }
                }}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            {touchedEmail && (
              <div className="space-y-2 mt-2">
                <ul className="space-y-1">
                  {validatedEmail.map((rule, idx) => (
                    <li
                      key={idx}
                      className={clsx(
                        "flex items-center gap-2 text-sm transition-all duration-300",
                        rule.isValid ? "text-green-600" : "text-red-500"
                      )}
                    >
                      {rule.isValid ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      <span
                        className={clsx(
                          "transition-all duration-300",
                          rule.isValid ? "line-through opacity-70" : ""
                        )}
                      >
                        {rule.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <label htmlFor="password" className="block text-gray-600">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!touched) {
                    setTouched(true);
                  }
                }}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            {touched && (
              <div className="space-y-2 mt-4">
                <ul className="space-y-1">
                  {validatedPassword.map((rule, idx) => (
                    <li
                      key={idx}
                      className={clsx(
                        "flex items-center gap-2 text-sm transition-all duration-300",
                        rule.isValid ? "text-green-600" : "text-red-500"
                      )}
                    >
                      {rule.isValid ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      <span
                        className={clsx(
                          "transition-all duration-300",
                          rule.isValid ? "line-through opacity-70" : ""
                        )}
                      >
                        {rule.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-600">
                Confirm Password:
              </label>
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
      <img
        src="https://images.unsplash.com/photo-1607273685680-6bd976c5a5ce?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-[60vw] h-screen object-cover"
      />
    </div>
  );
};

export default SignUp;
