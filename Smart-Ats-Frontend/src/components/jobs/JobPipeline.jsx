import { useEffect, useState } from "react";
import api from "@/services/api";
import PipelineBoard from "@/components/candidates/PipelineBoard";

export default function JobPipeline({ jobId }) {
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
    try {
      const res = await api.get("/candidates/search", { params: { jobId } });
      setCandidates(res.data);
    } catch (err) {
      console.error("Failed to fetch job candidates:", err);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [jobId]);

  return <PipelineBoard candidates={candidates} refresh={fetchCandidates} jobs={[]} />;
}
