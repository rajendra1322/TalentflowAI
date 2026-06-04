import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h2>

        <p className="text-slate-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-2xl">

          <Search size={18} />

          <input
            placeholder="Search..."
            className="bg-transparent outline-none"
          />

        </div>

        <button className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 transition">
          <Bell size={20} />
        </button>

      </div>

    </header>
  );
}