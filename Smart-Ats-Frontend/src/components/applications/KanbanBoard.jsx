import { useEffect, useState } from "react";
import { applications as staticApplications } from "@/data/applicationsData";
import ApplicationCard from "./ApplicationCard";
import api from "@/services/api";

export default function KanbanBoard() {

  const [applications, setApplications] = useState(staticApplications);

  // Keep in sync with backend candidate/application stages
  const stages = ["Applied", "Shortlisted", "Interview", "Selected", "Rejected"];

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/applications');
        // Normalize response: accept array or wrappers like { data: [...]} or { applications: [...] }
        const payload = res.data;
        if (Array.isArray(payload)) {
          setApplications(payload);
        } else if (Array.isArray(payload.data)) {
          setApplications(payload.data);
        } else if (Array.isArray(payload.applications)) {
          setApplications(payload.applications);
        } else {
          // fallback to whatever was returned or keep static
          console.warn('Unexpected /applications response shape, using fallback', payload);
        }
      } catch (err) {
        console.warn('Failed to fetch applications, falling back to static data', err);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="grid md:grid-cols-4 gap-6">

      {stages.map((stage) => (

        <div key={stage} className="bg-slate-100 rounded-3xl p-4">

          <h2 className="font-semibold text-lg mb-4">{stage}</h2>

          <div className="space-y-3">

            {applications
              .filter((item) => {
                const appStage = item.stage || item.status || item.stageName || item.stage?.name;
                return appStage === stage;
              })
              .map((application) => (
                <ApplicationCard key={application._id || application.id} application={application} />
              ))}

          </div>

        </div>

      ))}

    </div>
  );
}