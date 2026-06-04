import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/services/api";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Candidate" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);

      toast.success("Registration successful");

      navigate("/login");

    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-sky-500 to-indigo-700 text-white p-12 flex-col justify-center">

        <h1 className="text-5xl font-bold mb-6">
          TalentFlow AI
        </h1>

        <h2 className="text-3xl font-semibold mb-4">
          Hire Smarter with AI
        </h2>

        <p className="text-lg opacity-90">
          Transform your recruitment process with
          AI-powered hiring, candidate matching,
          analytics and automation.
        </p>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center bg-slate-50">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md"
        >

          <h2 className="text-3xl font-bold mb-6">
            Create Account
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-xl mb-4"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl mb-4"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl mb-4"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <select
            className="w-full border p-3 rounded-xl mb-4"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="recruiter">Recruiter</option>
            <option value="candidate">Candidate</option>
            <option value="admin">Admin</option>
          </select>

          <button
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl"
          >
            Register
          </button>

          <p className="mt-4 text-center">
            Already have an account?
            <Link
              to="/login"
              className="text-sky-600 ml-2"
            >
              Login
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}