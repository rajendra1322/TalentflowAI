import KanbanBoard from "@/components/applications/KanbanBoard";

export default function Applications() {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* PAGE WRAPPER (DESKTOP FIX) */}
      <div className="max-w-[1300px] mx-auto px-3 sm:px-4 lg:px-6 py-4">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Applications
          </h1>

          <p className="text-slate-500 text-sm sm:text-base">
            Track candidate hiring stages.
          </p>
        </div>

        {/* BOARD */}
        <KanbanBoard />

      </div>
    </div>
  );
}