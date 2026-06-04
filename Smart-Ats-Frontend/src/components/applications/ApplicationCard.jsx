export default function ApplicationCard({ application }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-slate-900">{application.candidate || application.name || application.userName}</h3>

      <p className="text-sm text-slate-500 mt-1">{application.role || application.position || application.jobTitle}</p>

      {application.createdAt && (
        <p className="text-xs text-slate-400 mt-2">{new Date(application.createdAt).toLocaleString()}</p>
      )}

    </div>
  );
}