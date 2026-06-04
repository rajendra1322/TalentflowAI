import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const menuRef = useRef(null);

  const name = localStorage.getItem("name") || "User";
  const initial = name.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/");
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenu(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold">TF</div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-sky-600">TalentFlow <span className="text-slate-600 font-normal">AI</span></span>
                <span className="text-xs text-slate-400 -mt-1">Recruit Smarter</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-4 text-sm text-slate-700">
              <Link to="/dashboard" className="hover:text-sky-600">Dashboard</Link>
              <Link to="/jobs" className="hover:text-sky-600">Jobs</Link>
              <Link to="/candidates" className="hover:text-sky-600">Candidates</Link>
              <Link to="/applications" className="hover:text-sky-600">Applications</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setUserMenu(!userMenu)}
                className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-slate-100"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center font-semibold">{initial}</div>
                <div className="hidden md:block text-sm text-slate-700">{name}</div>
              </button>

              {userMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-20 py-2">
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-slate-50">Logout</button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg bg-slate-100"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-inner">
          <div className="px-4 py-3 flex flex-col gap-2">
            <Link to="/dashboard" onClick={() => setOpen(false)} className="py-2 px-2 rounded hover:bg-slate-50">Dashboard</Link>
            <Link to="/jobs" onClick={() => setOpen(false)} className="py-2 px-2 rounded hover:bg-slate-50">Jobs</Link>
            <Link to="/candidates" onClick={() => setOpen(false)} className="py-2 px-2 rounded hover:bg-slate-50">Candidates</Link>
            <Link to="/applications" onClick={() => setOpen(false)} className="py-2 px-2 rounded hover:bg-slate-50">Applications</Link>
            <div className="pt-2 border-t mt-2">
              <div className="text-sm text-slate-600">👤 {name}</div>
              <button onClick={handleLogout} className="mt-2 w-full bg-red-500 text-white py-2 rounded">Logout</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}