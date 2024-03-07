"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { Squad } from "@/models/Squad";

export const columns: ColumnDef<Squad>[] = [
  {
    accessorKey: "logo",
    header: "LOGO",
  },
  {
    accessorKey: "name",
    header: "NOME",
  },
  {
    accessorKey: "category",
    header: "CATEGORIA",
  },
  {
    accessorKey: "group",
    header: "GRUPPO",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
