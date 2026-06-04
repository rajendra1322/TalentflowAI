import { useState, useEffect } from "react";
import api from "@/services/api";
import { toast } from "sonner";

import PipelineBoard from "@/components/candidates/PipelineBoard";

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);

  const role = localStorage.getItem("role")?.toLowerCase();
    const userEmail = (localStorage.getItem("email") || "").trim().toLowerCase();

  const [file, setFile] = useState(null);

  // FORM STATE
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    jobId: "",
  });

  // FILTER STATE (NEW)
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    minScore: "",
    maxScore: "",
  });

  // FETCH CANDIDATES WITH FILTERS
  const fetchCandidates = async () => {
    try {
      const res = await api.get("/candidates/search", {
        params: filters,
      });

      setCandidates(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // FETCH JOBS
  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [filters]);

  // HANDLE SUBMIT
  const handleSubmit = async () => {
    const role = localStorage.getItem("role")?.toLowerCase();

    if (role === "recruiter") {
      toast.error("Recruiters are not allowed to add candidates");
      return;
    }

    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("skills", form.skills);
      data.append("experience", form.experience);
      data.append("jobId", form.jobId);

      if (file) {
        data.append("resume", file);
      }

      await api.post("/candidates", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // refresh list
      fetchCandidates();

      // reset form
      setForm({ name: "", email: "", phone: "", skills: "", experience: "", jobId: "" });

      setFile(null);

      toast.success("Candidate added successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add candidate");
    }
  };

 return (
  <div className="bg-slate-50 min-h-screen">
    
    {/* PAGE CONTAINER (DESKTOP FIX) */}
    <div className="max-w-[1300px] mx-auto px-3 sm:px-4 lg:px-6 py-4">

      <>
        {/* ================= FILTER BAR ================= */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl shadow mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 items-center">

          {/* SEARCH */}
          <input
            placeholder="Search name/company/skills"
            className="border p-2 sm:p-3 rounded-lg text-sm"
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value,
              })
            }
          />

          {/* STATUS */}
          <select
            className="border p-2 sm:p-3 rounded-lg text-sm"
            onChange={(e) =>
              setFilters({
                ...filters,
                status: e.target.value,
              })
            }
          >
            <option value="">All Status</option>
            <option>Applied</option>
            <option>Shortlisted</option>
            <option>Interview</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>

          {/* SCORE */}
          <select
            className="border p-2 sm:p-3 rounded-lg text-sm"
            onChange={(e) => {
              const val = e.target.value;

              setFilters({
                ...filters,
                minScore:
                  val === "0-40"
                    ? 0
                    : val === "40-70"
                    ? 40
                    : val === "70-100"
                    ? 70
                    : "",
                maxScore:
                  val === "0-40"
                    ? 40
                    : val === "40-70"
                    ? 70
                    : val === "70-100"
                    ? 100
                    : "",
              });
            }}
          >
            <option value="">All Scores</option>
            <option value="0-40">0 - 40%</option>
            <option value="40-70">40 - 70%</option>
            <option value="70-100">70 - 100%</option>
          </select>

          {/* CLEAR FILTERS */}
          <button
            onClick={() =>
              setFilters({
                search: "",
                status: "",
                minScore: "",
                maxScore: "",
              })
            }
            className="bg-slate-900 text-white rounded-lg py-2 px-4 text-sm"
          >
            Clear Filters
          </button>

        </div>

        {/* ================= ADD CANDIDATE FORM ================= */}
        {role === "candidate" && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border mb-8">

            <h2 className="text-2xl font-bold mb-5">
              Apply a new Job
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                placeholder="Candidate Name"
                className="border p-3 rounded-xl"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                placeholder="Email"
                className="border p-3 rounded-xl"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                placeholder="Phone"
                className="border p-3 rounded-xl"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <input
                placeholder="Experience"
                className="border p-3 rounded-xl"
                value={form.experience}
                onChange={(e) =>
                  setForm({
                    ...form,
                    experience: e.target.value,
                  })
                }
              />

            </div>

            <input
              className="border p-3 rounded-xl w-full mt-4"
              placeholder="Skills (react,nodejs,mongodb)"
              value={form.skills}
              onChange={(e) =>
                setForm({ ...form, skills: e.target.value })
              }
            />

            <select
              className="border p-3 rounded-xl w-full mt-4"
              value={form.jobId}
              onChange={(e) =>
                setForm({ ...form, jobId: e.target.value })
              }
            >
              <option value="">Select Job</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title} - {job.company}
                </option>
              ))}
            </select>

            <input
              type="file"
              className="mt-4"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button
              onClick={handleSubmit}
              className="mt-6 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl"
            >
              Add Candidate
            </button>

          </div>
        )}

        {/* ================= PIPELINE ================= */}
        {(["recruiter", "hiringmanager", "admin"].includes(role)) ? (
          <PipelineBoard candidates={candidates} jobs={jobs} refresh={fetchCandidates} />
        ) : (
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-3">
              Your Applications
            </h2>

            {candidates.filter(c =>
              (c.email || "").trim().toLowerCase() === userEmail
            ).length === 0 ? (
              <p className="text-sm text-slate-500">
                No applications found for your account.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {candidates
                  .filter(c =>
                    (c.email || "").trim().toLowerCase() === userEmail
                  )
                  .map(c => (
                    <div
                      key={c._id}
                      className="border rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-sm">
                            {c.name}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {c.jobId?.title || c.role}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-sky-600 ml-3">
                          {c.status}
                        </div>
                      </div>

                      {(!c.skills || c.skills.length === 0) && (
                        <div className="text-xs text-slate-400 mt-3">
                          No skills extracted
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

      </>
    </div>
  </div>
);
}