import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center">

      <h1 className="text-5xl font-bold mb-4">
        TalentFlow AI
      </h1>

      <p className="text-lg text-gray-300 mb-6 text-center max-w-xl">
        Hire smarter with AI-powered resume parsing, candidate scoring,
        and intelligent recruitment automation.
      </p>

      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-sky-500 px-6 py-3 rounded-xl"
        >
          Start Hiring Today
        </Link>

        <Link
          to="/login"
          className="border border-white px-6 py-3 rounded-xl"
        >
          Login
        </Link>
      </div>

    </div>
  );
}