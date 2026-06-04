import { candidates } from "@/data/candidatesData";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

export default function CandidateTable() {
  return (
    <Table>

      <TableHeader>
        <TableRow>
          <TableHead>Candidate</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>

        {candidates.map((candidate) => (
          <TableRow key={candidate.id}>

            <TableCell>

              <div className="flex items-center gap-3">

                <Avatar>
                  <AvatarFallback>
                    {candidate.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <span className="font-medium">
                  {candidate.name}
                </span>

              </div>

            </TableCell>

            <TableCell>
              {candidate.email}
            </TableCell>

            <TableCell>
              {candidate.role}
            </TableCell>

            <TableCell>

              <Badge>
                {candidate.status}
              </Badge>

            </TableCell>

          </TableRow>
        ))}

      </TableBody>

    </Table>
  );
}