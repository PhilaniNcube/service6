import { getPendingDoctorRequests } from "@/dal/queries/users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ReviewButtons } from "./review-buttons";

const DoctorRequestsList = async () => {
  const requests = await getPendingDoctorRequests();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Pending Requests</h2>
        <Badge variant="secondary">{requests.length} Pending</Badge>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  No pending doctor requests
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="font-medium">
                      {request.user_first_name} {request.user_last_name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ID: {request.clerk_id.slice(0, 8)}...
                    </div>
                  </TableCell>
                  <TableCell>{request.user_email}</TableCell>
                  <TableCell>
                    {new Date(request.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <ReviewButtons requestId={request.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DoctorRequestsList;
