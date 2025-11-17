"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { AdminAppointment } from "./appointments-table";
import { useRouter } from "next/navigation";

const columns: ColumnDef<AdminAppointment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "patient_first_name",
    header: "Patient",
    cell: ({ row }) => {
      const first = row.original.patient_first_name ?? "";
      const last = row.original.patient_last_name ?? "";
      const name = `${first} ${last}`.trim();
      return <span>{name}</span>;
    },
  },
  {
    accessorKey: "procedure_name",
    header: "Procedure",
  },
  {
    accessorKey: "scheduled_at",
    header: "Scheduled",
    cell: ({ row }) => {
      const value = row.original.scheduled_at;
      if (!value) return null;
      const date = new Date(value);
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "appointment_time",
    header: "Time",
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => (
      <span className="block max-w-xs truncate">
        {row.original.notes}
      </span>
    ),
  },
];

interface AppointmentsTableClientProps {
  appointments: AdminAppointment[];
}
export function AppointmentsTableClient({
  appointments,
}: AppointmentsTableClientProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  const router = useRouter();

  const table = useReactTable({
    data: appointments,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Filter appointments..."
          className="max-w-xs"
          value={globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.id === "id"
                        ? "w-20"
                        : header.column.id === "notes"
                          ? "w-60"
                          : undefined
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                const id = row.original.id;

                return (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer hover:bg-muted/60"
                    onClick={() => {
                      router.push(`/dashboard/appointments/${id}`);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No appointments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {appointments.length}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}