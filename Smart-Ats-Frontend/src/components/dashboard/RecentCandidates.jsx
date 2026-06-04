const candidates = [
  "Rahul Sharma",
  "Priya Patel",
  "Arjun Kumar",
  "Karan Shetty",
];

export default function RecentCandidates() {
  return (
    <div>

      <h3 className="text-xl font-semibold mb-4">
        Recent Candidates
      </h3>

      <div className="space-y-3">

        {candidates.map((candidate) => (
          <div
            key={candidate}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
          >
            <span>{candidate}</span>

            <span className="text-green-600 text-sm">
              New
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}