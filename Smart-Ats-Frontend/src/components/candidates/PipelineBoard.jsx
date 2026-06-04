import { useEffect, useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";

const columns = ["Applied", "Shortlisted", "Interview", "Selected", "Rejected"];

export default function PipelineBoard({ candidates = [], refresh = () => {}, jobs = [] }) {
  const role = (localStorage.getItem("role") || "").toLowerCase();
  const canEdit = ["recruiter", "hiringmanager", "admin"].includes(role);

  // no horizontal scrolling on mobile; columns stack vertically using CSS grid

  const moveCandidate = async (candidate, status) => {
    try {
      await api.put(`/candidates/${candidate._id}/status`, { status });

      if (status === "Interview") {
        // simple email payload
        const job = jobs.find((j) => String(j._id) === String(candidate.jobId));
        const subject = `Interview Invitation - ${job?.title || "Opportunity"}`;
        const sender = localStorage.getItem("name") || "Recruiting Team";
        const html = "<p>Hi " + (candidate.name || "") + ",</p>" +
          "<p>You have been invited to an interview." + (job ? (" Role: <strong>" + job.title + "</strong>") : "") + "</p>" +
          "<p>Best regards,<br/>" + sender + "</p>";
        const text = "Hi " + (candidate.name || "") + "\n\nYou have been invited to an interview.\n\nBest regards,\n" + sender;

        try {
          await api.post("/mail/send", { to: candidate.email, subject, text, html });
          toast.success("Interview email sent to candidate");
        } catch (mailErr) {
          console.warn("Mail send failed:", mailErr?.message || mailErr);
          toast.error("Failed to send interview email");
        }
      }

      refresh();
    } catch (err) {
      console.error("Status update error:", err?.response?.data || err.message || err);
      toast.error(err?.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 py-2">
  {columns.map((column) => (
    <div
      key={column}
      className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 min-h-[250px] shadow-sm"
    >
      <h3 className="font-bold text-sky-600 mb-4 text-center text-sm sm:text-base">
        {column}
      </h3>

      {candidates.filter((c) => c.status === column).length === 0 && (
        <p className="text-xs text-slate-400 text-center mt-8">
          No candidates
        </p>
      )}

      <div className="space-y-3">
        {candidates
          .filter((c) => c.status === column)
          .map((candidate) => (
            <div
              key={candidate._id}
              className="bg-slate-50 border border-slate-200 rounded-xl p-3 hover:shadow-md transition"
            >
              <h4 className="font-semibold text-slate-800 text-sm break-words">
                {candidate.name}
              </h4>

              <p className="text-xs text-slate-500 break-words">
                {candidate.jobId?.title
                  ? `${candidate.jobId.title} — ${candidate.jobId.company}`
                  : candidate.email || ""}
              </p>

              <div className="mt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    candidate.matchScore >= 80
                      ? "bg-green-100 text-green-700"
                      : candidate.matchScore >= 60
                      ? "bg-sky-100 text-sky-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {candidate.matchScore || 0}% Match
                </span>
              </div>

              <p className="text-xs mt-2 font-medium text-slate-600 break-words">
                {candidate.recommendation}
              </p>

              {candidate.reason && (
                <p className="text-[11px] mt-1 text-gray-500 italic break-words">
                  {candidate.reason}
                </p>
              )}

              <div className="mt-3">
                <select
                  className={`w-full border border-slate-200 rounded-lg p-2 text-sm ${
                    !canEdit ? "cursor-not-allowed opacity-70" : ""
                  }`}
                  value={candidate.status}
                  onChange={(e) => {
                    if (!canEdit) {
                      toast.error(
                        "Only recruiters and hiring managers can change candidate status"
                      );
                      return;
                    }
                    moveCandidate(candidate, e.target.value);
                  }}
                  disabled={!canEdit}
                >
                  {columns.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
      </div>
    </div>
  ))}
</div>
    </div>
  );
}