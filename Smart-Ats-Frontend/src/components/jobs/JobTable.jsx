import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function JobTable({ jobs = [] }) {
  const role = (localStorage.getItem("role") || "").toLowerCase();
  const canViewPipeline = ["recruiter", "hiringmanager", "admin"].includes(role);
  return (
    <Table>

      <TableHeader>
        <TableRow>
          <TableHead>Job Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          {/* Pipeline column removed per request */}
        </TableRow>
      </TableHeader>

      <TableBody>

        {jobs.map((job) => (
          <TableRow key={job._id || job.id}>

            <TableCell className="font-medium">
              {job.title}
            </TableCell>

            <TableCell>
              {job.company}
            </TableCell>

            <TableCell>
              {job.location}
            </TableCell>

            <TableCell>
              <Badge>
                {job.status}
              </Badge>
            </TableCell>
            {/* Pipeline actions removed */}

          </TableRow>
        ))}

      </TableBody>

    </Table>
  );
}