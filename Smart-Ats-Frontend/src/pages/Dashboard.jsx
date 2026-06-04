import { useEffect, useState } from "react";
import api from "@/services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/candidates");
      setCandidates(res.data);
    };

    fetchData();
  }, []);

  const statusData = [
    "Applied",
    "Shortlisted",
    "Interview",
    "Selected",
    "Rejected",
  ].map((status) => ({
    name: status,
    value: candidates.filter((c) => c.status === status).length,
  }));

  const scoreData = [
    { name: "0-40", value: candidates.filter(c => c.matchScore < 40).length },
    { name: "40-70", value: candidates.filter(c => c.matchScore >= 40 && c.matchScore < 70).length },
    { name: "70-100", value: candidates.filter(c => c.matchScore >= 70).length },
  ];

  const COLORS = ["#38bdf8", "#34d399", "#fbbf24"];

  return (
    <div className="p-6 grid gap-6">

      <h1 className="text-2xl font-bold">
        Recruitment Dashboard
      </h1>

      {/* PIPELINE STATUS */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Pipeline Status</h2>

        <BarChart width={500} height={250} data={statusData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#38bdf8" />
        </BarChart>
      </div>

      {/* SCORE DISTRIBUTION */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Match Score Distribution</h2>

        <PieChart width={400} height={250}>
          <Pie
            data={scoreData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
          >
            {scoreData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

    </div>
  );
}