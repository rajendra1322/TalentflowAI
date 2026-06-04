import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", applications: 40 },
  { month: "Feb", applications: 65 },
  { month: "Mar", applications: 90 },
  { month: "Apr", applications: 120 },
  { month: "May", applications: 160 },
  { month: "Jun", applications: 220 },
];

export default function AnalyticsChart() {
  return (
    <div className="h-[350px]">

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="applications"
            stroke="#0ea5e9"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}