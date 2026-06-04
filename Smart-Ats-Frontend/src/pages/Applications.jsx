import KanbanBoard from "@/components/applications/KanbanBoard";

export default function Applications() {
  return (
    <>
      <div className="mb-6">

        <h1 className="text-3xl font-bold text-slate-900">Applications</h1>

        <p className="text-slate-500">Track candidate hiring stages.</p>

      </div>

      <KanbanBoard />
    </>
  );
}