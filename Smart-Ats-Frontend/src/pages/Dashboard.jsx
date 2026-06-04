import { useEffect, useState } from "react";
import api from "@/services/api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/candidates");
        setCandidates(res.data);
      } catch (error) {
        console.error(error);
      }
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
    {
      name: "0-40",
      value: candidates.filter((c) => c.matchScore < 40).length,
    },
    {
      name: "40-70",
      value: candidates.filter(
        (c) => c.matchScore >= 40 && c.matchScore < 70
      ).length,
    },
    {
      name: "70-100",
      value: candidates.filter((c) => c.matchScore >= 70).length,
    },
  ];

  const COLORS = ["#38bdf8", "#34d399", "#fbbf24"];

  return (
  <div className="px-4 sm:px-6 lg:px-8 py-6">
    
    {/* Center Content Like Navbar */}
    <div className="max-w-7xl mx-auto">

      <h1 className="text-xl sm:text-2xl font-bold mb-6">
        Recruitment Dashboard
      </h1>

      {/* Pipeline Status */}
      <div className="bg-white p-5 rounded-2xl shadow mb-6">
        <h2 className="font-semibold mb-4">
          Pipeline Status
        </h2>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#38bdf8"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Match Score Distribution */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h2 className="font-semibold mb-4">
          Match Score Distribution
        </h2>

        <div className="h-[320px] sm:h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={scoreData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                outerRadius="65%"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {scoreData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  </div>
);
    
  
}