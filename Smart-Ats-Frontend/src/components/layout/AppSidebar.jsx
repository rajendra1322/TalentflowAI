import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Settings,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function AppSidebar() {
  return (
    <aside className="w-72 bg-white border-r border-slate-200 min-h-screen flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-200">

        <h1 className="text-3xl font-bold text-sky-600">
          TalentFlow AI
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Recruitment Platform
        </p>

      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-sky-50 text-sky-600 font-medium"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/jobs"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition"
        >
          <Briefcase size={20} />
          Jobs
        </Link>

        <Link
          to="/candidates"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition"
        >
          <Users size={20} />
          Candidates
        </Link>

        <Link
          to="/applications"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition"
        >
          <FileText size={20} />
          Applications
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition"
        >
          <Settings size={20} />
          Settings
        </Link>

      </nav>

      {/* User */}
      <div className="p-4 border-t border-slate-200">

        <div className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold">
            R
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              Recruiter
            </p>

            <p className="text-sm text-slate-500">
              Admin Access
            </p>
          </div>

        </div>

      </div>

    </aside>
  );
}