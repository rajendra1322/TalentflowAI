import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  change,
}) {
  return (
    <Card className="rounded-3xl shadow-sm border-slate-200 hover:shadow-md transition">
      <CardContent className="p-6">

        <p className="text-slate-500 text-sm">
          {title}
        </p>

        <h2 className="text-4xl font-bold text-sky-600 mt-2">
          {value}
        </h2>

        <p className="text-green-600 text-sm mt-2">
          {change}
        </p>

      </CardContent>
    </Card>
  );
}