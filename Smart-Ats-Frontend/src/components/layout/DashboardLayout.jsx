import Navbar from "../Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <Navbar />

      <div className="flex">

        {/* Sidebar (your existing one) */}
        <div className="w-72">
          {/* Sidebar component here */}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {children}
        </div>

      </div>

    </div>
  );
}