import { useState, useEffect } from "react";
import api from "@/services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      localStorage.setItem(
        "name",
        res.data.name
      );
      // store email for candidate self-filtering
      if (res.data.email) localStorage.setItem("email", res.data.email);

      navigate("/dashboard");

    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SECTION */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white p-16 flex-col justify-center">

        <h1 className="text-6xl font-bold mb-6">
          TalentFlow AI
        </h1>

        <h2 className="text-4xl font-semibold mb-6">
          Hire Smarter with AI
        </h2>

        <p className="text-xl opacity-90 mb-8">
          AI-Powered Hiring.
          Smarter Decisions.
          Better Teams.
        </p>

        <div className="space-y-4">

          <div>
            ✓ Resume Parsing
          </div>

          <div>
            ✓ AI Candidate Matching
          </div>

          <div>
            ✓ Smart Shortlisting
          </div>

          <div>
            ✓ Recruitment Analytics
          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">

        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-6">
            Sign in to continue
          </p>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-xl p-3 mb-4"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl p-3 mb-6"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={handleLogin}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-semibold"
          >
            Login
          </button>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              className="text-sky-600 ml-2 font-semibold"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}