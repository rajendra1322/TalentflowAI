import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const jobs = [
  {
    role: "Frontend Developer",
    company: "Google",
    status: "Active",
  },
  {
    role: "Backend Developer",
    company: "Amazon",
    status: "Active",
  },
  {
    role: "Full Stack Developer",
    company: "Microsoft",
    status: "Closed",
  },
];

export default function RecentJobs() {
  return (
    <div>

      <h2 className="text-xl font-semibold mb-4">
        Recent Jobs
      </h2>

      <Table>

        <TableHeader>
          <TableRow>
            <TableHead>Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {jobs.map((job, index) => (
            <TableRow key={index}>
              <TableCell>{job.role}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.status}</TableCell>
            </TableRow>
          ))}

        </TableBody>

      </Table>

    </div>
  );
}