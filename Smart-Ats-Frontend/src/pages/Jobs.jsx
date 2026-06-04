import { useEffect, useState } from "react";
import JobTable from "@/components/jobs/JobTable";
import CreateJobDialog from "@/components/jobs/CreateJobDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/services/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");

  // FETCH JOBS FROM BACKEND
  const fetchJobs = async (q = "") => {
    try {
      const res = await api.get("/jobs", { params: { search: q } });
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err?.response?.data || err.message || err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => fetchJobs(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const role = (localStorage.getItem("role") || "").toLowerCase();
  const canCreateJob = ["recruiter", "admin"].includes(role);

  return (
  <div className="px-4 sm:px-6 lg:px-8 py-6">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Jobs
          </h1>

          <p className="text-slate-500 text-sm sm:text-base">
            Manage all job openings
          </p>
        </div>

        {canCreateJob ? (
          <CreateJobDialog refresh={fetchJobs} />
        ) : (
          <Button
            onClick={() =>
              toast.error("Only recruiters can create jobs")
            }
            variant="outline"
          >
            + Create Job
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jobs..."
          className="h-11"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6">

        <JobTable jobs={jobs} />

      </div>

    </div>
  </div>
);
}