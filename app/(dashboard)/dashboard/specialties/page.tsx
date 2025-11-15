import { getSpecialties } from "@/dal/queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddSpecialtyDialog } from "./specialties-add-dialog";

const SpecialtiesPage = async () => {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Specialties</h1>
          <p className="text-muted-foreground">
            Manage the list of medical specialties available in the system.
          </p>
        </div>

        <AddSpecialtyDialog />
      </div>

      <div className="w-2/4">
        <SpecialtiesTable />
      </div>
    </div>
  );
};

export default SpecialtiesPage;

const SpecialtiesTable = async () => {
  const list = await getSpecialties();

  if (!list.length) {
    return (
      <p className="text-sm text-muted-foreground">No specialties found yet.</p>
    );
  }

  return (
    <div className="rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center text-xs text-muted-foreground">
              #
            </TableHead>
            <TableHead className="text-xs text-muted-foreground">
              Name
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-center text-xs text-muted-foreground">
                {index + 1}
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
